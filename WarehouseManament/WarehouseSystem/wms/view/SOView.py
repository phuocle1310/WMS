from drf_yasg.openapi import IN_QUERY, Parameter
from drf_yasg.utils import swagger_auto_schema
from rest_framework import permissions, generics, viewsets, status
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response

from ..models import SO
from ..serializers import SOSerializer, SOCreateSerializer


class SOView(viewsets.ViewSet, generics.ListAPIView, generics.CreateAPIView, generics.DestroyAPIView):
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
        instance = serializer.save(**{"supplier": self.request.user.supplier, "items": self.request.data.get('items')})
        return Response(SOSerializer(instance).data, status=status.HTTP_201_CREATED)

    @action(methods=['put'], detail=True, url_path='update')
    def update_so(self, request, pk):
        if request.user.role == 2:
            return Response({"Failed": "You don't have permission"}, status=status.HTTP_403_FORBIDDEN)

        try:
            instance = self.get_object()
            stt = request.data.pop('status')
        except SO.DoesNotExist:
            return Response({"Falied": "SO doesn't exist"}, status=status.HTTP_404_NOT_FOUND)

        if stt in [3, 1]:
            instance.add_who = request.user
            instance.edit_who = request.user
        if stt == 0:
            instance.edit_who = request.user
        if stt == 2:
            return Response({"Falied": "SO is pending already"}, status=status.HTTP_400_BAD_REQUEST)
        instance.status = stt
        instance.save()
        serializer = SOSerializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
        except SO.DoesNotExist:
            return Response({"Falied": "SO doesn't exist"}, status=status.HTTP_404_NOT_FOUND)

        if instance.status != 2:
            return Response({"Falied": "You can't delete SO accepted or deleted"}, status=status.HTTP_403_FORBIDDEN)
        else:
            if request.user.supplier == self.get_object().supplier:
                return super().destroy(request, *args, **kwargs)
            return Response({"Falied": "You dont have permission to delete this SO"}, status=status.HTTP_403_FORBIDDEN)




