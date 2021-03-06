import requests
from django.contrib.auth import logout
from django.db.models import Q
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import permissions, viewsets, generics, status
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework import viewsets, generics, status, permissions
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import Http404
from django.conf import settings
from django.db.models import F

from ..models import User
from ..permission import *
from ..serializers import UserSerializer


class UserViewSet(viewsets.ViewSet, generics.CreateAPIView, generics.RetrieveAPIView,
                  generics.ListAPIView, generics.UpdateAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated, ]
    parser_classes = [MultiPartParser, ]

    # phan quyen
    def get_permissions(self):
        if self.action in ['create', 'list', 'retrieve', 'update', 'get_current_user']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def retrieve(self, request, *args, **kwargs):
        if request.user.id == int(kwargs.get('pk')):
            serializer = UserSerializer(request.user)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        if request.user.role == 2:
            serializer = UserSerializer(request.user)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        if request.user.role == 1:
            try:
                user = User.objects.get(Q(id=kwargs.get('pk'), role=2))
                serializer = UserSerializer(user)
            except User.DoesNotExist:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        return super().retrieve(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        if request.user.role == 2:
            raise PermissionDenied()
        if request.user.role == 1:
            role = int(request.data.get('role'))
            if role in [0, 1]:
                raise PermissionDenied("You can't update to Admin/User Account")
        return super().create(request, *args, **kwargs) and Response(status=status.HTTP_200_OK)

    def partial_update(self, request, *args, **kwargs):
        if request.user.role == 2:
            raise PermissionDenied()
        if request.user.role == 1:
            role = int(request.data.get('role'))
            if role == 0 or role == 1:
                raise PermissionDenied("You can't update to Admin/User Account")
        return super().create(request, *args, **kwargs) and Response(status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        if request.user.role == 2:
            raise PermissionDenied()
        if request.user.role == 1:
            role = int(request.data.get('role'))
            if role == 0 or role == 1:
                raise PermissionDenied("You can't create Admin/User Account")
        return super().create(request, *args, **kwargs) and Response(status=status.HTTP_201_CREATED)

    # ley user da dang nhap
    @action(methods=['get'], detail=False, url_path="current-user")
    def get_current_user(self, request):
        return Response(self.serializer_class(request.user).data,
                        status=status.HTTP_200_OK)

    @action(methods=['get'], detail=False, url_path="get-token-by refresh-token")
    def get_token_by_refresh_token(self, request):
        client_id = settings.OAUTH2_INFO.get('client_id')
        client_secret = settings.OAUTH2_INFO.get('client_secret')
        headers = {
            # 'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Type': 'application/json',
        }
        body = {
            'grant_type': 'refresh_token',
            'refresh_token': 'cALgBRMXAUX8vZ6xEMa8cntBfvRTpi'
        }
        r = requests.post("http://127.0.0.1:8000/o/token/", body, headers, auth=(client_id, client_secret))
        return Response(r.json(), status=status.HTTP_200_OK)