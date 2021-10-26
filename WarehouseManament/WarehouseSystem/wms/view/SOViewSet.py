from django.db.models import F
from drf_yasg.openapi import IN_QUERY, Parameter
from drf_yasg.utils import swagger_auto_schema
from rest_framework import permissions, generics, viewsets, status
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response

from .BaseView import BaseAPIView
from ..models import SO, Item, Order, SODetail, ExportView
from ..serializers import SOSerializer, SOCreateSerializer, OrderCreateSerializer, OrderSerializer, \
    ItemForReceiptOrderSerializer, ExportViewSerializer


class SOView(viewsets.ViewSet, generics.ListAPIView, generics.CreateAPIView, generics.DestroyAPIView, BaseAPIView):
    queryset = SO.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    action_required_auth = ['list', 'create',
                            'update_so', 'destroy', 'get_so']

    def get_permissions(self, list_action=action_required_auth):
        if self.action in list_action:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def get_serializer_class(self):
        if self.action in ['create']:
            return SOCreateSerializer
        if self.action in ["list", "get_so"]:
            return SOSerializer

    @action(methods=['get'], detail=True)
    def get_so(self, request, pk):
        so = self.get_object()
        if so is not None:
            return Response(data=SOSerializer(so).data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def create(self, request, *args, **kwargs):
        serializer = SOCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        items = request.data.get("items")
        if not bool(items):
            return Response({"items": "Can't be none"}, status=status.HTTP_403_FORBIDDEN)
        list_item_exist = []
        items_in_stock = Item.objects.filter(status=True)
        for item in items_in_stock:
            list_item_exist.append(item.name)
        for item in items:
            if item.get('name') not in list_item_exist or item.get('Qty_order') <= 0:
                return Response({"Failed": "Quantity must be greater than 0 and item must be exist"})
        instance = serializer.save(**{"supplier": self.request.user.supplier, "items": items})
        return Response(SOSerializer(instance).data, status=status.HTTP_201_CREATED)

    @action(methods=['put'], detail=True, url_path='update')
    def update_so(self, request, pk):
        if request.user.is_anonymous or request.user.role == 2:
            return Response({"Failed": "You don't have permission"}, status=status.HTTP_403_FORBIDDEN)

        try:
            instance = self.get_object()
            stt = request.data.pop('status')
        except SO.DoesNotExist:
            return Response({"Falied": "SO doesn't exist"}, status=status.HTTP_404_NOT_FOUND)
        if instance.status == 0:
            return Response({"Falied": "SO have done already, can't edit!!"}, status=status.HTTP_400_BAD_REQUEST)
        if stt in [2, 0]:
            return Response({"Falied": "This SO can't update this status"}, status=status.HTTP_400_BAD_REQUEST)
        if stt in [3, 1]:
            instance.add_who = request.user
            instance.edit_who = request.user

        instance.status = stt
        instance.save()
        serializer = SOSerializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        if request.user.role == 1:
            return Response({"Falied": "You don't have permission"}, status=status.HTTP_403_FORBIDDEN)
        try:
            instance = self.get_object()
        except SO.DoesNotExist:
            return Response({"Falied": "SO doesn't exist"}, status=status.HTTP_404_NOT_FOUND)

        if instance.status != 2:
            return Response({"Falied": "You can't delete SO accepted or deleted"}, status=status.HTTP_403_FORBIDDEN)
        else:
            if request.user.supplier == self.get_object().supplier:
                return super().destroy(request, *args, **kwargs) and Response({"Success": "Delete SO success"}, status=status.HTTP_200_OK)
            return Response({"Falied": "You dont have permission to delete this SO"}, status=status.HTTP_403_FORBIDDEN)

    @action(methods=['get'], detail=True, url_path='get-item-for-order')
    def get_item_order_by_so(self, request, pk):
        if self.request.user.is_anonymous or self.request.user.role == 2:
            return Response({"Failed": "You don't have permission"}, status=status.HTTP_403_FORBIDDEN)
        items = self.get_item_receipted(self.get_object(), 1)
        serializer = ItemForReceiptOrderSerializer(items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


    @action(methods=['post'], detail=True, url_path='create-order')
    def create_order(self, request, pk):
        if self.request.user.is_anonymous or self.request.user.role == 2:
            return Response({"Failed": "You don't have permission"}, status=status.HTTP_403_FORBIDDEN)

        serializer = OrderCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        so = self.get_object()
        items = request.data.get("items")

        '''
            + Kiểm tra điều kiên: 
                1 - Đầu vào items rỗng
                2 - Số lượng là số ?
                3 - Số lượng phải lớn hơn 0
                4 - Item phải là những Item có trong SO
        '''

        if not bool(items):
            return Response({"items": "Can't be none"}, status=status.HTTP_403_FORBIDDEN)
        if so.status in [2, 3, 1, 0]:
            return Response({"Failed": "This SO can't create order"}, status=status.HTTP_403_FORBIDDEN)
        list_item_receipted = self.get_item_receipted(self.get_object(), 1)
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
                return Response({"Failed": "Item doesn't in so"}, status=status.HTTP_404_NOT_FOUND)

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
            + Kiểm tra nếu tổng số lượng receipt xuất ra + với số lượng đã xuất mà lớn hơn số lượng trong SO thì 
            return failed, ngược lại thì cho lưu
        '''

        for item in qty_items:
            for list in list_item_receipted:
                if item.get('pk') == list.get('id'):
                    if item.get('Qty_receipt') + list.get('Qty_receipt') > list.get('Qty_order'):
                        return Response({"Failed": "Over quantity permitted"}, status=status.HTTP_400_BAD_REQUEST)

        instance = serializer.save(
            **{"add_who": self.request.user, "edit_who": self.request.user, "SO": so, "items": qty_items})

        if self.update_status_done(so, 1):
            so.status = 0
            so.edit_who = request.user
            so.save()
            so_details = SODetail.objects.filter(SO=so, status=True)
            for so_detail in so_details:
                item = Item.objects.get(pk=so_detail.item.pk)
                item.Qty_total = F('Qty_total') - so_detail.Qty_order
                item.save()
        return Response(OrderSerializer(instance).data, status=status.HTTP_201_CREATED)

    @action(methods=['get'], detail=True, url_path='orders')
    def get_order(self, request, pk):
        if request.user.is_anonymous or request.user.role == 2:
            return Response({"Failed": "You don't have permission"}, status=status.HTTP_403_FORBIDDEN)
        receipts = Order.objects.filter(SO__id=pk, status=True)
        serializer = OrderSerializer(receipts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=['get'], detail=False, url_path='get_so_accept')
    def get_so_accept(self, request):
        if request.user.is_anonymous or request.user.role == 2:
            return Response({"Failed": "You don't have permission"}, status=status.HTTP_403_FORBIDDEN)
        receipts = SO.objects.filter(status=1)
        serializer = SOSerializer(receipts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=['get'], detail=True, url_path='export-good')
    def export_good(self, request, pk):
        s = self.delete_export_view()
        if request.user.role == 2 or request.user.is_anonymous:
            return Response({"Failed": "You don't have permission"}, status=status.HTTP_403_FORBIDDEN)
        if self.get_object().status != 1:
            return Response({"Failed": "SO can't import to stock"}, status=status.HTTP_400_BAD_REQUEST)

        is_exported = ExportView.objects.filter(SO=self.get_object())
        empty_location = self.is_empty_pickface_locations(self.get_object())
        if is_exported.count() > 0:
            return Response(ExportViewSerializer(is_exported, many=True).data, status=status.HTTP_200_OK)
        so_exported = self.get_object()
        if so_exported.status == 4:
            return Response({"Failed": "SO exported"}, status=status.HTTP_400_BAD_REQUEST)
        if not empty_location:
            return Response({"Failed": "Not enough location pickface"}, status=status.HTTP_400_BAD_REQUEST)
        export_view = self.allocated_good(self.get_object())
        if not export_view:
            return Response({"Failed": "SO export wrong!! Please check SO's detail"}, status=status.HTTP_400_BAD_REQUEST)
        data_export = ExportView.objects.filter(SO=self.get_object(), status=True)
        serializer = ExportViewSerializer(data_export, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



