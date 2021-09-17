from drf_yasg.openapi import Parameter, IN_QUERY
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets, generics, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response

from ..models import PO
from ..serializers import POSerializer


class POViewSet(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveAPIView, generics.UpdateAPIView
    , generics.CreateAPIView, generics.GenericAPIView):
    queryset = PO.objects.filter(active=True)
    serializer_class = POSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    @swagger_auto_schema(manual_parameters=[
        Parameter('from_date', IN_QUERY, type='str'),
        Parameter('to_date', IN_QUERY, type='str')
    ])
    @action(methods=['get'], detail=False,
            url_path='get-po-by-range-effective-date'
        , url_name='po-by-range-effective-date')
    def get_po_by_range_effective_date(self, request):
        try:
            from_date = self.request.query_params.get('from_date')
            to_date = self.request.query_params.get('to_date')

            po = PO.objects.filter(effective_date__date__range=[from_date, to_date], active=True)
            serializer = POSerializer(po, many=True)
        except PO.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(manual_parameters=[
        Parameter('supplier', IN_QUERY, type='integer', required=True)
    ])
    @action(methods=['get'], detail=False,
            url_path='get-po-by-supplier',
            url_name='po-by-supplier')
    def get_po_by_supplier(self, request):
        try:
            supplier = self.request.query_params.get('supplier')
            po = PO.objects.filter(supplier=supplier, active=True)
            serializer = POSerializer(po, many=True)
        except PO.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
