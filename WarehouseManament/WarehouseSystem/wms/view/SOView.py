from drf_yasg.openapi import IN_QUERY, Parameter
from drf_yasg.utils import swagger_auto_schema
from rest_framework import permissions, generics, viewsets, status
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response

from ..models import SO
from ..serializers import SOSerializer


class SOView(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveAPIView,
             generics.UpdateAPIView, generics.CreateAPIView):
    queryset = SO.objects.filter(active=True)
    serializer_class = SOSerializer
    permission_classes = [permissions.IsAuthenticated]
    action_required_auth = ['list', 'retrieve', 'create',
                            'update', 'get_so_by_supplier', 'get_so_by_range_effective_date']

    def get_permissions(self, list_action=action_required_auth):
        if self.action in list_action:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    @swagger_auto_schema(manual_parameters=[
        Parameter('from_date', IN_QUERY, type='str'),
        Parameter('to_date', IN_QUERY, type='str')
    ])
    @action(methods=['get'], detail=False,
            url_path='get-so-by-range-effective-date',
            url_name='so-by-range-effective-date')
    def get_so_by_range_effective_date(self, request):
        try:
            from_date = self.request.query_params.get('from_date')
            to_date = self.request.query_params.get('to_date')

            so = SO.objects.filter(effective_date__date__range=[from_date, to_date], active=True)
            serializer = SOSerializer(so, many=True)
        except SO.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(manual_parameters=[
        Parameter('supplier', IN_QUERY, type='integer', required=True)
    ])
    @action(methods=['get'], detail=False,
            url_path='get-sos-by-supplier',
            url_name='sos-by-supplier')
    def get_so_by_supplier(self, request):
        try:
            supplier = self.request.query_params.get('supplier')
            so = SO.objects.filter(supplier=supplier, active=True)
            serializer = SOSerializer(so, many=True)
        except SO.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def list(self, request, *args, **kwargs):
        if request.user.role == 2:
            raise PermissionDenied()
        return super().list(request, *args, **kwargs)