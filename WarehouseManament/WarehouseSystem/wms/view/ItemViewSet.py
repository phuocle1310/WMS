from drf_yasg.openapi import Parameter, IN_QUERY
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets, generics, permissions, status, filters
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response

from ..models import *
from ..serializers import ItemSerializer


class ItemViewSet(viewsets.ViewSet, generics.ListAPIView, generics.CreateAPIView,
                  generics.UpdateAPIView, generics.RetrieveAPIView):
    queryset = Item.objects.filter(status=True)
    serializer_class = ItemSerializer
    action_required_auth = ['list', 'retrieve', 'create',
                            'update']

    def get_permissions(self, list_action=action_required_auth):
        if self.action in list_action:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    @action(methods=['get'], detail=False, url_path='get-item-by-supplier')
    def get_item_by_supplier(self, request):
        try:
            if request.user.role == 2:
                items = Item.objects.filter(supplier=request.user.supplier)
            else:
                items = Item.objects.all()
            serializer = ItemSerializer(items, many=True)
        except Item.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        pass