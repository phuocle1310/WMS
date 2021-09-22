from datetime import date

from drf_yasg.openapi import Parameter, IN_QUERY
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets, generics, permissions, status, filters
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response

from ..models import *
from ..serializers import ItemSerializer, ItemCreateSerializer, ItemViewSOSerializer


class ItemViewSet(viewsets.ViewSet, generics.ListAPIView, generics.CreateAPIView):
    queryset = Item.objects.filter(status=True)
    serializer_class = ItemSerializer
    action_required_auth = ['list', 'retrieve', 'create',
                            'update']

    def get_permissions(self, list_action=action_required_auth):
        if self.action in list_action:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def get_serializer_class(self):
        if self.action in ['create']:
            return ItemCreateSerializer
        else:
            return ItemSerializer

    @action(methods=['get'], detail=False, url_path='get-item-by-supplier')
    def get_item_by_supplier(self, request):
        try:
            if request.user.role == 0:
                items = Item.objects.filter(supplier=request.user.supplier)
            else:
                items = Item.objects.all()
            serializer = ItemSerializer(items, many=True)
        except Item.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    @action(methods=['get'], detail=False, url_path='get-item-by-supplier-for-so')
    def get_item_by_supplier_for_so(self, request):
        try:
            if request.user.role == 0:
                items = Item.objects.filter(supplier=request.user.supplier, Qty_total__gt=0, status=True).values("name").distinct()
            else:
                items = Item.objects.all().values("name").distinct()

            for name in items:
                it = Item.objects.filter(name=name.get('name'), Qty_total__gt=0, status=True)
                qty = 0
                for count in it:
                    qty = qty + count.Qty_total
                name["Qty_total"] = qty

            serializer = ItemViewSOSerializer(items, many=True)
        except Item.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        serializer = ItemCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save(**{"supplier": self.request.user.supplier})
        return Response(ItemSerializer(instance).data, status=status.HTTP_201_CREATED)
