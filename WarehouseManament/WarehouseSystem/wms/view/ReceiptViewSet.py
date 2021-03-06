import datetime

from django.core.exceptions import ValidationError
from django.db.models import F
from drf_yasg.openapi import IN_QUERY, Parameter
from drf_yasg.utils import swagger_auto_schema
from rest_framework import permissions, generics, viewsets, status
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response

from .BaseView import BaseAPIView
from ..models import Receipt, PODetail, ReceiptDetail, User, Item, PO
from ..serializers import ReceiptSerializer, ReceiptCreateSerializer, ReceiptDetailSerializer, POSerializer


class ReceiptView(viewsets.ViewSet, generics.RetrieveAPIView, generics.ListAPIView, BaseAPIView):
    queryset = Receipt.objects.filter(status=True)
    action_required_auth = ['list', 'retrieve', 'create',
                            'update', 'delete_receipt']

    def get_permissions(self, list_action=action_required_auth):
        if self.action in list_action:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def get_serializer_class(self):
        return ReceiptSerializer

    @action(methods=['put'], detail=True, url_path='update-receipt')
    def update_receipt_detail(self, request, pk):
        if self.request.user.is_anonymous or self.request.user.role == 2:
            return Response({"Failed": "You don't have permission"}, status=status.HTTP_403_FORBIDDEN)

        items = request.data.get("items")
        receipt = self.get_object()
        items_receipted = self.get_item_receipted(receipt.PO)
        if not bool(items):
            return Response({"items": "Can't be none"}, status=status.HTTP_403_FORBIDDEN)
        if receipt.PO.status in [0, 3, 2]:
            return Response({"Failed": "This PO can't update receipt"}, status=status.HTTP_403_FORBIDDEN)

        list_id = []
        for item in items_receipted:
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
            if Qty_receipt <= 0 or pk <= 0:
                return Response({"Failed": "Quantity and pk must be greater than 0"},
                                status=status.HTTP_400_BAD_REQUEST)
            if item.get('pk') not in list_id:
                return Response({"Failed": "Item doesn't in po"}, status=status.HTTP_404_NOT_FOUND)

            '''
                + G???p s??? l?????ng receipt c???a item l???i, tr??nh t??nh tr???ng tr??ng item
                    1 - T???o ra 1 dict m???i ????? ch???a th??ng tin
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
            + Ki???m tra n???u t???ng s??? l?????ng receipt nh???p v??o + v???i s??? l?????ng ???? nh???p m?? l???n h??n s??? l?????ng trong PO th?? 
            return failed, ng?????c l???i th?? cho l??u
        '''

        for item in qty_items:
            for list in items_receipted:
                if item.get('pk') == list.get('id'):
                    try:
                        it = Item.objects.get(pk=item.get('pk'))
                        Qty_change = item.get('Qty_receipt')
                        detail = ReceiptDetail.objects.get(receipt=receipt, item=it)
                    except ReceiptDetail.DoesNotExist:
                        return Response({"Failed": "Receipt Detail isn't exist"}, status=status.HTTP_404_NOT_FOUND)

                    if Qty_change + list.get('Qty_receipt') - detail.Qty_receipt > list.get('Qty_order'):
                        return Response({"Failed": "Over quantity permitted"}, status=status.HTTP_400_BAD_REQUEST)

                    detail.Qty_receipt = Qty_change
                    detail.save()
        if self.update_status_done(receipt.PO, 0):
            po = PO.objects.get(pk=receipt.PO.pk)
            po.status = 0
            po.edit_who = request.user
            po.save()
            po_details = PODetail.objects.filter(PO=po, status=True)
            for po_detail in po_details:
                item = Item.objects.get(pk=po_detail.item.pk)
                item.Qty_total = F('Qty_total') + po_detail.Qty_order
                item.save()
        receipt.edit_date = datetime.datetime.now()
        receipt.edit_who = self.request.user
        receipt.save()
        serializer = ReceiptSerializer(receipt)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=['patch'], detail=True, url_path="delete-receipt")
    def delete_receipt(self, request, *args, **kwargs):
        if request.user.is_anonymous or request.user.role == 2:
            return Response({"Failed": "You don't have permission"}, status=status.HTTP_403_FORBIDDEN)
        receipt = self.get_object()
        try:
            po = PO.objects.get(pk=receipt.PO.pk)
            if po.status == 0:
                return Response({"Failed": "Can't delete receipt"}, status=status.HTTP_403_FORBIDDEN)
            else:
                receipt.status = False
                receipt.save()
        except PO.DoesNotExist:
            return Response({"Failed": "PO doesn't exist"}, status=status.HTTP_404_NOT_FOUND)
        return Response({"Success": "Delete Receipt success"}, status=status.HTTP_200_OK)
