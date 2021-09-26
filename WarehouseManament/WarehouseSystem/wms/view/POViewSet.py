from django.http import Http404
from drf_yasg.openapi import Parameter, IN_QUERY
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets, generics, permissions, status
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response

from ..models import PO, Item
from ..serializers import *


class POViewSet(viewsets.ViewSet, generics.CreateAPIView, generics.ListAPIView, generics.DestroyAPIView):
    queryset = PO.objects.all()
    action_required_auth = ['list', 'create',
                            'update_po', 'destroy', 'get_po']

    def get_permissions(self, list_action=action_required_auth):
        if self.action in list_action:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def get_serializer_class(self):
        if self.action in ['create']:
            return POCreateSerializer
        if self.action in ["list", 'update_po', "get_po", 'delete', 'un_active_po']:
            return POSerializer
        if self.action in ['get_item_receipt_by_po']:
            return ItemForReceiptSerializer

    @action(methods=['get'], detail=True)
    def get_po(self, request, pk):
        po = self.get_object()
        if po is not None:
            return Response(data=POSerializer(po).data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def create(self, request, *args, **kwargs):
        serializer = POCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        items = request.data.get("items")
        if not bool(items):
            return Response({"items": "Can't be none"}, status=status.HTTP_403_FORBIDDEN)
        for item in items:
            if item.expire_date <= request.data.get('effective_date'):
                return Response({"item": "Item's expire date is over"}, status=status.HTTP_400_BAD_REQUEST)
        if self.request.user.role == 1:
            return Response({"Failed": "You don't have permission"}, status=status.HTTP_403_FORBIDDEN)
        instance = serializer.save(**{"supplier": self.request.user.supplier, "items": items})
        return Response(POSerializer(instance).data, status=status.HTTP_201_CREATED)

    @action(methods=['put'], detail=True, url_path='update')
    def update_po(self, request, pk):
        if request.user.is_anonymous:
            return Response({"Failed": "You can't do that"}, status=status.HTTP_403_FORBIDDEN)

        if request.user.role == 2:
            return Response({"Failed": "You don't have permission"}, status=status.HTTP_403_FORBIDDEN)

        try:
            instance = PO.objects.get(pk=pk)
            stt = request.data.pop('status')
        except PO.DoesNotExist:
            return Response({"Falied": "PO doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)

        if instance.add_who is None:
            instance.add_who = request.user
            instance.edit_who = request.user
        else:
            instance.edit_who = request.user
        if stt == 2:
            return Response({"Falied": "PO is pending already"}, status=status.HTTP_400_BAD_REQUEST)
        instance.status = stt
        instance.save()
        serializer = POSerializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()

        except PO.DoesNotExist:
            return Response({"Falied": "PO doesn't exist"}, status=status.HTTP_404_NOT_FOUND)

        if instance.status != 2:
            return Response({"Falied": "You can't delete PO accepted or deleted"}, status=status.HTTP_403_FORBIDDEN)
        else:
            if request.user.supplier == self.get_object().supplier:
                return super().destroy(request, *args, **kwargs)
            return Response({"Falied": "You dont have permission to delete this PO"}, status=status.HTTP_403_FORBIDDEN)

    def create_receipt(self, request):
        pass

    @action(methods=['get'], detail=True, url_path='get-item-for-receipt')
    def get_item_receipt_by_po(self, request, pk):
        if request.user.role == 2:
            return Response({"Failed": "You don't have permission"}, status=status.HTTP_403_FORBIDDEN)
        items = self.get_item_receipted()
        serializer = ItemForReceiptSerializer(items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=['post'], detail=True, url_path='create-receipt')
    def create_receipt(self, request, pk):
        if self.request.user.role == 2:
            return Response({"Failed": "You don't have permission"}, status=status.HTTP_403_FORBIDDEN)
        serializer = ReceiptCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        po = self.get_object()

        items = request.data.get("items")
        if not bool(items):
            return Response({"items": "Can't be none"}, status=status.HTTP_403_FORBIDDEN)
        list_item = self.get_item_receipted()
        list_id = []
        for id in list_item:
            list_id.append(id.get('id'))
        for item in items:
            if item.get('pk') not in list_id:
                return Response({"Failed": "Item doesn't in po"}, status=status.HTTP_404_NOT_FOUND)

        for item in items:
            for list in list_item:
                print(list)
                print(item)
                if item.get('pk') == list.get('id'):
                    print(item.get('Qty_receipt') + list.get('Qty_receipt'))
                    print(list.get('Qty_order'))
                    if item.get('Qty_receipt') + list.get('Qty_receipt') > list.get('Qty_order'):
                        return Response(status=status.HTTP_400_BAD_REQUEST)
                    else:
                        return Response({"kakak": "jjjj"}, status=status.HTTP_200_OK)
                    # item["Qty_receipt"] =




        instance = serializer.save(**{"add_who": self.request.user, "edit_who": self.request.user, "PO": po, "items": items})
        return Response(status=status.HTTP_200_OK)

    def get_item_receipted(self):
        po = self.get_object()
        po_details = PODetail.objects.filter(PO=po)
        items=[]
        for po_detail in po_details:
            item = {}
            item["id"] = po_detail.item.pk
            item['name'] = po_detail.item.name
            item["unit"] = po_detail.item.unit
            item["mu_case"] = po_detail.item.mu_case
            item["expire_date"] = po_detail.item.expire_date
            item["production_date"] = po_detail.item.production_date
            item["Qty_order"] = po_detail.Qty_order
            item["Qty_receipt"] = 0
            items.append(item)

        '''
            + Lấy số lượng đã được lưu vào kho, hiển thị số lượng đã nhập
        '''

        list_items_id = []
        for item in items: list_items_id.append(item.get('id'))

        receipts = Receipt.objects.filter(PO=po, status=True)

        if receipts is not None:
            for receipt in receipts:
                rc_details = ReceiptDetail.objects.filter(receipt=receipt, status=True)
                for rc_detail in rc_details:
                    if rc_detail.item.id not in list_items_id:
                        return Response(status=status.HTTP_400_BAD_REQUEST)
                    else:
                        for item in items:
                            if item.get('id') == rc_detail.item.id:
                                item["Qty_receipt"] = rc_detail.Qty_receipt + item.get('Qty_receipt')
                                break
        return items