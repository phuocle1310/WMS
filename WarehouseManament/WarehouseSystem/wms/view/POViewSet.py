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
    queryset = PO.objects.filter(active=True)
    action_required_auth = ['list', 'retrieve', 'create',
                            'update', 'add_po_detail_temp']

    def get_permissions(self, list_action=action_required_auth):
        if self.action in list_action:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def get_serializer_class(self):
        if self.action in ['create', 'add_po_detail_temp']:
            return POCreateSerializer
        if self.action in ["list",]:
            return POTempSerializer
        else:
            return POSerializer

    @action(methods=['get'], detail=True)
    def get_po(self, request, pk):
        po = self.get_object()
        if po is not None:
            return Response(data=POSerializer(po).data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    # @action(methods=['post'], detail=False)
    # def add_po_detail_temp(self, request, *args, **kwargs):
    #     # try:
    #     #     po_temp = self.get_object()
    #     # except Http404:
    #     #     return Response(status=status.HTTP_404_NOT_FOUND)
    #     # else:
    #     # podetails = request.data.get('po_detail_temp')
    #     # count=0
    #     # for po in podetails:
    #     #     items = po
    #     #     break
    #     # potem = PODetailTempSerializer(podetails, many=True)
    #     # return Response(data=items.get('items'), status=status.HTTP_200_OK)
    #     po = PO()
    #     po.Qty_total = request.data.get('Qty_total')
    #     po.supplier = request.user.supplier
    #     po.status = 2
    #     po.effective_date = request.data.get('effective_date')
    #     po.save()
    #     podetails = request.data.get('po_detail_temp')
    #
    #     if podetails is not None:
    #         for podetail in podetails:
    #             item_temp = ItemTemp()
    #             item_temp.name = items.name
    #             item_temp.production_date = items.production_date
    #             item_temp.expire_date = items.expire_date
    #             item_temp.mu_case = items.mu_case
    #             item_temp.desc = items.desc
    #             item_temp.save()
    #
    #             podetail_temp = PODetailTemp()
    #             podetail_temp.PO = po
    #             podetail_temp.item = item_temp
    #             podetail_temp.description = podetail.description
    #             podetail_temp.Qty_order = podetail.Qty_order
    #             podetail_temp.save()
    #
    #     return Response(status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        serializer = POCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save(**{"supplier": self.request.user.supplier, "items": self.request.data.get('items')})
        return Response(POTempSerializer(instance).data, status=status.HTTP_201_CREATED)
