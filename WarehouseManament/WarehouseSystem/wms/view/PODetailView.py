from drf_yasg.openapi import IN_QUERY, Parameter
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets, generics, permissions, status
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response

from . import POViewSet
from ..models import PODetail, PO, PODetailTemp
from ..serializers import PODetailSerializer, POSerializer


class PODetailView(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveAPIView,
                   generics.CreateAPIView, generics.DestroyAPIView):
    queryset = PODetail.objects.filter(status=True)
    serializer_class = PODetailSerializer
    action_required_auth = ['list', 'retrieve', 'create',
                            'update']

    def get_permissions(self, list_action=action_required_auth):
        if self.action in list_action:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def list(self, request, *args, **kwargs):
        if request.user.role == 2:
            raise PermissionDenied()
        return super(PODetailView, self).list(request, *args, **kwargs)


    @action(methods=['post'], detail=False,
            url_path='create-po-detail')
    def add_PODetail(self, request):
        if request.user.role == 2:
            raise PermissionDenied()
        else:
            poid = MappingPODetail(data=request.data)
            poid.is_valid(raise_exception=True)
            podetail = PODetailTemp.objects.filter(pk=poid)
            for po in podetail:
                pode = PODetail()
                pode.PO = po.PO
                pode.Qty_order = po.Qty_total
                pode.description = po.description

    def retrieve(self, request, *args, **kwargs):
        if request.user.role == 0:
            raise PermissionDenied()
        return super(PODetailView, self).retrieve(request, *args, **kwargs)

    @swagger_auto_schema(manual_parameters=[
        Parameter('po', IN_QUERY, type='integer'),
    ])
    @action(methods=['get'], detail=False,
            url_path='get-po-details')
    def get_po_details(self, request):
        try:
            if request.user.role == 2:
                podetails = PODetail.objects.filter(PO__supplier=request.user.supplier, PO=request.query_params.get('po'))
            else:
                podetails = PODetail.objects.filter(PO=request.query_params.get('po'))
            serializer = PODetailSerializer(podetails, many=True)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        except PODetail.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)


