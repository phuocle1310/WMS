from drf_yasg.openapi import IN_QUERY, Parameter
from drf_yasg.utils import swagger_auto_schema
from rest_framework import permissions, generics, viewsets, status
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response

from ..models import Order
from ..serializers import OrderCreateSerializer, OrderSerializer


class OrderView(viewsets.ViewSet, generics.CreateAPIView, generics.ListAPIView):
    queryset = Order.objects.all()
    action_required_auth = ['list', 'retrieve', 'create',
                            'update']

    def get_permissions(self, list_action=action_required_auth):
        if self.action in list_action:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def get_serializer_class(self):
        if self.action in ['create']:
            return OrderCreateSerializer
        return OrderSerializer