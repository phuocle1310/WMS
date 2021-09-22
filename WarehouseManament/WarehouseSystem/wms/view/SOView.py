from drf_yasg.openapi import IN_QUERY, Parameter
from drf_yasg.utils import swagger_auto_schema
from rest_framework import permissions, generics, viewsets, status
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response

from ..models import SO
from ..serializers import SOSerializer, SOCreateSerializer


class SOView(viewsets.ViewSet, generics.ListAPIView, generics.CreateAPIView):
    queryset = SO.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    action_required_auth = ['list', 'retrieve', 'create',
                            'update']

    def get_permissions(self, list_action=action_required_auth):
        if self.action in list_action:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def get_serializer_class(self):
        if self.action in ['create']:
            return SOCreateSerializer
        if self.action in ["list", "get_po"]:
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
        instance = serializer.save(**{"supplier": self.request.user.supplier, "items": self.request.data.get('items')})
        return Response(SOSerializer(instance).data, status=status.HTTP_201_CREATED)