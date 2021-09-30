from django.http import Http404
from drf_yasg.openapi import Parameter, IN_QUERY
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets, generics, permissions, status
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response

from .BaseView import BaseAPIView
from ..models import PO, Item
from ..serializers import *


class POViewSet(viewsets.ViewSet, generics.CreateAPIView, generics.ListAPIView, generics.DestroyAPIView, BaseAPIView):
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
            return ItemForReceiptOrderSerializer
        if self.action in ['receipts']:
            return ReceiptSerializer

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
            it = Item.objects.get(pk=item.get('pk'))
            expire_date = request.data.get('effective_date')
            if it.expire_date <= datetime.datetime.strptime(expire_date, '%Y-%m-%d').date():
                return Response({"item": "Item's expire date is over"}, status=status.HTTP_400_BAD_REQUEST)
        if self.request.user.role == 1:
            return Response({"Failed": "You don't have permission"}, status=status.HTTP_403_FORBIDDEN)
        instance = serializer.save(**{"supplier": self.request.user.supplier, "items": items})
        return Response(POSerializer(instance).data, status=status.HTTP_201_CREATED)

    @action(methods=['put'], detail=True, url_path='update')
    def update_po(self, request, pk):
        if request.user.is_anonymous or request.user.role == 2:
            return Response({"Failed": "You don't have permission"}, status=status.HTTP_403_FORBIDDEN)

        try:
            instance = PO.objects.get(pk=pk)
            stt = request.data.pop('status')
        except PO.DoesNotExist:
            return Response({"Failed": "PO doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)

        if instance.add_who is None:
            instance.add_who = request.user
            instance.edit_who = request.user
        else:
            instance.edit_who = request.user
        if stt in [2, 0]:
            return Response({"Falied": "This PO can't update this status"}, status=status.HTTP_400_BAD_REQUEST)
        if instance.status == 0:
            return Response({"Falied": "PO have done already, can't edit!!"}, status=status.HTTP_400_BAD_REQUEST)
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
                return super().destroy(request, *args, **kwargs) and Response({"Success": "Delete PO success"}, status=status.HTTP_200_OK)
            return Response({"Falied": "You dont have permission to delete this PO"}, status=status.HTTP_403_FORBIDDEN)

    @action(methods=['get'], detail=True, url_path='get-item-for-receipt')
    def get_item_receipt_by_po(self, request, pk):
        if self.request.user.is_anonymous or self.request.user.role == 2:
            return Response({"Failed": "You don't have permission"}, status=status.HTTP_403_FORBIDDEN)
        items = self.get_item_receipted()
        serializer = ItemForReceiptOrderSerializer(items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=['post'], detail=True, url_path='create-receipt')
    def create_receipt(self, request, pk):
        if self.request.user.is_anonymous or self.request.user.role == 2:
            return Response({"Failed": "You don't have permission"}, status=status.HTTP_403_FORBIDDEN)

        serializer = ReceiptCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        po = self.get_object()
        items = request.data.get("items")

        '''
            + Kiểm tra điều kiên: 
                1 - Đầu vào items rỗng
                2 - Số lượng là số ?
                3 - Số lượng phải lớn hơn 0
                4 - Item phải là những Item có trong PO
        '''

        if not bool(items):
            return Response({"items": "Can't be none"}, status=status.HTTP_403_FORBIDDEN)
        if po.status in [0, 2, 3]:
            return Response({"Failed": "This PO can't create receipt"}, status=status.HTTP_403_FORBIDDEN)
        list_item_receipted = self.get_item_receipted()
        list_id = []
        for item in list_item_receipted:
            list_id.append(item.get('id'))

        pk_item = []
        qty_items = []
        for item in items:
            Qty_receipt = item.get('Qty_receipt')
            pk = item.get('pk')
            try:
                Qty_receipt = int(Qty_receipt)
                pk = int(pk)
            except:
                return Response({"Failed": "Quantity receipt and pk must be numeric characters"},
                                status=status.HTTP_400_BAD_REQUEST)
            if Qty_receipt <= 0:
                return Response({"Failed": "Quantity must be greater than 0"},
                                status=status.HTTP_400_BAD_REQUEST)
            if item.get('pk') not in list_id:
                return Response({"Failed": "Item doesn't in po"}, status=status.HTTP_404_NOT_FOUND)

            '''
                + Gộp số lượng receipt của item lại, tránh tình trạng trùng item
                    1 - Tạo ra 1 dict mới để chứa thông tin
            '''

            if item.get('pk') not in pk_item:
                pk_item.append(item.get('pk'))
                qty = {}
                qty['pk'] = item.get('pk')
                qty['Qty_receipt'] = item.get('Qty_receipt')
                qty_items.append(qty)
            else:
                for i in qty_items:
                    if i.get('pk') == item.get('pk'):
                        i['Qty_receipt'] = i.get('Qty_receipt') + item.get('Qty_receipt')

        '''
            + Kiểm tra nếu tổng số lượng receipt nhập vào + với số lượng đã nhập mà lớn hơn số lượng trong PO thì 
            return failed, ngược lại thì cho lưu
        '''

        for item in qty_items:
            for list in list_item_receipted:
                if item.get('pk') == list.get('id'):
                    if item.get('Qty_receipt') + list.get('Qty_receipt') > list.get('Qty_order'):
                        return Response({"Failed": "Over quantity permitted"}, status=status.HTTP_400_BAD_REQUEST)

        instance = serializer.save(
            **{"add_who": self.request.user, "edit_who": self.request.user, "PO": po, "items": qty_items})

        if self.update_status_done(po, 0):
            po.status = 0
            po.edit_who = request.user
            po.save()
        return Response(ReceiptSerializer(instance).data, status=status.HTTP_201_CREATED)

    @action(methods=['get'], detail=True, url_path='receipts')
    def get_receipt(self, request, pk):
        if request.user.is_anonymous or request.user.role == 2:
            return Response({"Failed": "You don't have permission"}, status=status.HTTP_403_FORBIDDEN)
        receipts = Receipt.objects.filter(PO__id=pk)
        serializer = ReceiptSerializer(receipts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    '''
        + Hàm lấy item cùng với số lượng item đã receipt
    '''

    # def get_item_receipted(self, instance=None):
    #     po = instance or self.get_object()
    #     po_details = PODetail.objects.filter(PO=po)
    #
    #     '''
    #         + Tạo 1 mảng các item trong PO Detail
    #         + Mặc định số lượng đã nhập bằng 0
    #     '''
    #
    #     items = []
    #     for po_detail in po_details:
    #         item = {}
    #         item["id"] = po_detail.item.pk
    #         item['name'] = po_detail.item.name
    #         item["unit"] = po_detail.item.unit
    #         item["mu_case"] = po_detail.item.mu_case
    #         item["expire_date"] = po_detail.item.expire_date
    #         item["production_date"] = po_detail.item.production_date
    #         item["Qty_order"] = po_detail.Qty_order
    #         item["Qty_receipt"] = 0
    #         items.append(item)
    #
    #     '''
    #         + Tính tổng số lượng đã nhập của từng items
    #     '''
    #
    #     list_items_id = []
    #     for item in items: list_items_id.append(item.get('id'))
    #
    #     receipts = Receipt.objects.filter(PO=po, status=True)
    #
    #     if receipts is not None:
    #         for receipt in receipts:
    #             rc_details = ReceiptDetail.objects.filter(receipt=receipt, status=True)
    #             for rc_detail in rc_details:
    #                 for item in items:
    #                     if item.get('id') == rc_detail.item.id:
    #                         item["Qty_receipt"] = rc_detail.Qty_receipt + item.get('Qty_receipt')
    #                         break
    #     return items
