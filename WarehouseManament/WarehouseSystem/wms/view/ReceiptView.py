from django.core.exceptions import ValidationError
from drf_yasg.openapi import IN_QUERY, Parameter
from drf_yasg.utils import swagger_auto_schema
from rest_framework import permissions, generics, viewsets, status
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response

from .BaseView import BaseAPIView
from ..models import Receipt, PODetail, ReceiptDetail, User, Item
from ..serializers import ReceiptSerializer, ReceiptCreateSerializer, ReceiptDetailSerializer, POSerializer


class ReceiptView(viewsets.ViewSet, generics.RetrieveAPIView, generics.ListAPIView, BaseAPIView):
    queryset = Receipt.objects.all()
    action_required_auth = ['list', 'retrieve', 'create',
                            'update']

    def get_permissions(self, list_action=action_required_auth):
        if self.action in list_action:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def get_serializer_class(self):
        return ReceiptSerializer

    @action(methods=['put'], detail=True, url_path='update-receipt')
    def update_receipt_detail(self, request, pk):

        try:
            pk_item = int(request.data.get('pk'))
            Qty_receipt_change = int(request.data.get('Qty_receipt'))
        except:
            raise ValidationError("Quantity and pk must be numeric and can be null")

        if Qty_receipt_change <= 0 or pk_item <= 0:
            return Response({"Failed": "Quantity and pk must be greater than 0"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            item = Item.objects.get(pk=pk_item)
            receipt = self.get_object()
            detail = ReceiptDetail.objects.get(receipt=receipt, item=item)
        except ReceiptDetail.DoesNotExist:
            return Response({"Failed": "Receipt Detail isn't exist"}, status=status.HTTP_404_NOT_FOUND)
        items_receipted = self.get_item_receipted(receipt.PO)

        for item in items_receipted:
            if item.get('id') == request.data.get('pk'):
                if Qty_receipt_change + item.get('Qty_receipt') - detail.Qty_receipt > item.get('Qty_order'):
                    return Response({"Failed": "Over quantity permitted"}, status=status.HTTP_400_BAD_REQUEST)

        detail.Qty_receipt = Qty_receipt_change
        detail.save()
        serializer = ReceiptSerializer(receipt)

        return Response(serializer.data, status=status.HTTP_200_OK)



