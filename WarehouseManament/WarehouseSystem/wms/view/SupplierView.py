from django.http import Http404
from drf_yasg.openapi import Parameter, IN_QUERY
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets, generics, permissions, status
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response

from ..models import Supplier
from ..serializers import SupplierSerializer


class SupplierView(viewsets.ViewSet, generics.ListAPIView):
    queryset = Supplier.objects.filter(status=True)
    serializer_class = SupplierSerializer
    action_required_auth = ['list', 'retrieve', 'create',
                            'update', 'get_supplier_by_user']

    def get_permissions(self, list_action=action_required_auth):
        if self.action in list_action:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    @action(methods=['get'], detail=False, url_path='get-supplier-by-user')
    def get_supplier_by_user(self, request):
        try:
            supplier = Supplier.objects.get(user=request.user)
        except Supplier.DoesNotExist:
            raise PermissionDenied()
        return Response(SupplierSerializer(supplier).data, status=status.HTTP_200_OK)
