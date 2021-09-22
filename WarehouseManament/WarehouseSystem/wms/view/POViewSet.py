from django.http import Http404
from drf_yasg.openapi import Parameter, IN_QUERY
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets, generics, permissions, status
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response

from ..models import PO, Item
from ..serializers import *


class POViewSet(viewsets.ViewSet, generics.CreateAPIView, generics.ListAPIView):
    queryset = PO.objects.all()
    action_required_auth = ['list', 'retrieve', 'create',
                            'update']

    def get_permissions(self, list_action=action_required_auth):
        if self.action in list_action:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def get_serializer_class(self):
        if self.action in ['create']:
            return POCreateSerializer
        if self.action in ["list","get_po"]:
            return POSerializer

    @action(methods=['get'], detail=True)
    def get_po(self, request, pk):
        po = self.get_object()
        if po is not None:
            return Response(data=POSerializer(po).data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def create(self, request, *args, **kwargs):
        serializer = POCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save(**{"supplier": self.request.user.supplier, "items": self.request.data.get('items')})
        return Response(POSerializer(instance).data, status=status.HTTP_201_CREATED)
