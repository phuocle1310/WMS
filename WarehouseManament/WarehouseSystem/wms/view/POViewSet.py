from django.db.models import Q, F
from django.http import Http404
from django_filters.rest_framework import DjangoFilterBackend
from drf_yasg.openapi import Parameter, IN_QUERY
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets, generics, permissions, status
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.filters import SearchFilter
from rest_framework.response import Response

from .BaseView import BaseAPIView
from ..filters.PO import POFilter
from ..models import PO, Item
from ..serializers import *


class POViewSet(viewsets.ViewSet, generics.CreateAPIView, generics.ListAPIView, generics.DestroyAPIView, BaseAPIView):
    queryset = PO.objects.all()
    action_required_auth = ['list', 'create',
                            'update_po', 'destroy', 'get_po']
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['effective_date', 'status',]
    search_fields = ['effective_date', 'supplier__company_name', 'status']

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

    @action(methods=['get'], detail=False)
    def get_po_done(self, request):
        if request.user.is_anonymous:
            return Response({"Failed": "You don't have permission"}, status=status.HTTP_403_FORBIDDEN)
        po = PO.objects.filter(status=PO.DONE, add_date__gte=datetime.datetime.now() - datetime.timedelta(days=7),
                               import_view__isnull=True)
        return Response(POSerializer(po, many=True).data, status=status.HTTP_200_OK)

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
        if request.user.role == 1:
            return Response({"Falied": "You don't have permission"}, status=status.HTTP_403_FORBIDDEN)

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
            po_details = PODetail.objects.filter(PO=po, status=True)
            for po_detail in po_details:
                item = Item.objects.get(pk=po_detail.item.pk)
                item.Qty_total = F('Qty_total') + po_detail.Qty_order
                item.save()
        return Response(ReceiptSerializer(instance).data, status=status.HTTP_201_CREATED)

    @action(methods=['get'], detail=True, url_path='receipts')
    def get_receipt(self, request, pk):
        if request.user.is_anonymous or request.user.role == 2:
            return Response({"Failed": "You don't have permission"}, status=status.HTTP_403_FORBIDDEN)
        receipts = Receipt.objects.filter(PO__id=pk, status=True)
        serializer = ReceiptSerializer(receipts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=['get'], detail=True, url_path='import-good')
    def import_good(self, request, pk):
        s = self.delete_import_view()
        if request.user.role == 2 or request.user.is_anonymous:
            return Response({"Failed": "You don't have permission"}, status=status.HTTP_403_FORBIDDEN)
        if self.get_object().status != 0:
            return Response({"Failed": "PO can't import to stock"}, status=status.HTTP_400_BAD_REQUEST)

        is_imported = ImportView.objects.filter(PO=self.get_object())
        empty_location = self.is_empty_storage_locations(self.get_object())
        if is_imported.count() > 0:
            return Response(ImportViewSerializer(is_imported, many=True).data, status=status.HTTP_200_OK)
        if not empty_location:
            return Response(empty_location, status=status.HTTP_400_BAD_REQUEST)
        import_view = self.import_good_to_loc(self.get_object())
        data_import = ImportView.objects.filter(PO=self.get_object(), status=True)
        serializer = ImportViewSerializer(data_import, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



