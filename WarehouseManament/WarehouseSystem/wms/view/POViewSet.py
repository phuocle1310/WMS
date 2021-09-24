from django.http import Http404
from drf_yasg.openapi import Parameter, IN_QUERY
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets, generics, permissions, status
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response

from ..models import PO, Item
from ..serializers import *


class POViewSet(viewsets.ViewSet, generics.CreateAPIView, generics.ListAPIView, generics.DestroyAPIView):
    queryset = PO.objects.all()
    serializer_class = POSerializer
    action_required_auth = ['list', 'retrieve', 'create',
                            'update']

    def get_permissions(self, list_action=action_required_auth):
        if self.action in list_action:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def get_serializer_class(self):
        if self.action in ['create']:
            return POCreateSerializer
        if self.action in ["list", 'update_po', "get_po", 'delete', 'un_active_po']:
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
        if self.request.user.role == 1:
            return Response({"Failed": "You don't have permission"}, status=status.HTTP_403_FORBIDDEN)
        instance = serializer.save(**{"supplier": self.request.user.supplier, "items": self.request.data.get('items')})
        return Response(POSerializer(instance).data, status=status.HTTP_201_CREATED)

    @action(methods=['put'], detail=True, url_path='update')
    def update_po(self, request, pk):
        if request.user.is_anonymous:
            return Response({"Failed": "You can't do that"}, status=status.HTTP_403_FORBIDDEN)

        if request.user.role == 2:
            return Response({"Failed": "You don't have permission"}, status=status.HTTP_403_FORBIDDEN)

        try:
            instance = PO.objects.get(pk=pk)
            stt = request.data.pop('status')
        except PO.DoesNotExist:
            return Response({"Falied": "PO doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)

        if instance.add_who is None:
            instance.add_who = request.user
            instance.edit_who = request.user
        else:
            instance.edit_who = request.user
        if stt == 2:
            return Response({"Falied": "PO is pending already"}, status=status.HTTP_400_BAD_REQUEST)
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
                return super().destroy(request, *args, **kwargs)
            return Response({"Falied": "You dont have permission to delete this PO"}, status=status.HTTP_403_FORBIDDEN)

