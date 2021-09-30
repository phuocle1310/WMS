from django.core.exceptions import ValidationError
from drf_yasg.openapi import IN_QUERY, Parameter
from drf_yasg.utils import swagger_auto_schema
from rest_framework import permissions, generics, viewsets, status
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response

from .BaseView import BaseAPIView
from ..models import Receipt, PODetail, ReceiptDetail, User, Item
from ..serializers import ReceiptSerializer, ReceiptCreateSerializer, ReceiptDetailSerializer, POSerializer


class ReceiptView(viewsets.ViewSet, generics.RetrieveAPIView, generics.ListAPIView, BaseAPIView):
    queryset = Receipt.objects.all()
    action_required_auth = ['list', 'retrieve', 'create',
                            'update']

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
            for list in items_receipted:
                if item.get('pk') == list.get('id'):
                    try:
                        it = Item.objects.get(pk=item.get('pk'))
                        Qty_change = item.get('Qty_receipt')
                        detail = ReceiptDetail.objects.get(receipt=receipt, item=it)
                    except ReceiptDetail.DoesNotExist:
                        return Response({"Failed": "Receipt Detail isn't exist"}, status=status.HTTP_404_NOT_FOUND)

                    if Qty_change + list.get('Qty_receipt') - detail.Qty_receipt> list.get('Qty_order'):
                        return Response({"Failed": "Over quantity permitted"}, status=status.HTTP_400_BAD_REQUEST)

                    detail.Qty_receipt = Qty_change
                    detail.save()
        serializer = ReceiptSerializer(receipt)

        return Response(serializer.data, status=status.HTTP_200_OK)



