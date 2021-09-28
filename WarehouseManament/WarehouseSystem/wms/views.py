# from drf_yasg.openapi import Parameter, IN_QUERY
# from drf_yasg.utils import swagger_auto_schema
# from rest_framework import viewsets, generics, permissions, status
# from rest_framework.decorators import action
# from rest_framework.response import Response
#
# from .models import *
# from .serializers import *
#
from .view import *
from rest_framework.views import APIView
from django.conf import settings
from rest_framework.response import Response
from django.http import Http404
from rest_framework import viewsets, generics, status, permissions
from rest_framework import viewsets, generics, permissions, status
from .models import PO, Receipt, ReceiptDetail, PODetail, SODetail, Order, OrderDetail
from .serializers import POSerializer
# lấy thông tin cl, id

class AuthInfo(APIView):
    def get(self, request):
        return Response(settings.OAUTH2_INFO, status=status.HTTP_200_OK)


# class BaseAPIView:
#     def get_item_receipted(self, instance=None, type=0):
#         instance = instance or self.get_object()
#         if type == 0:
#             po_details = PODetail.objects.filter(PO=instance)
#         else:
#             po_details = SODetail.objects.filter(SO=instance)
#         '''
#             + Tạo 1 mảng các item trong PO Detail
#             + Mặc định số lượng đã nhập bằng 0
#         '''
#
#         items = []
#         for po_detail in po_details:
#             item = {}
#             item["id"] = po_detail.item.pk
#             item['name'] = po_detail.item.name
#             item["unit"] = po_detail.item.unit
#             item["mu_case"] = po_detail.item.mu_case
#             item["expire_date"] = po_detail.item.expire_date
#             item["production_date"] = po_detail.item.production_date
#             item["Qty_order"] = po_detail.Qty_order
#             item["Qty_receipt"] = 0
#             items.append(item)
#
#         '''
#             + Tính tổng số lượng đã nhập của từng items
#         '''
#
#         list_items_id = []
#         for item in items: list_items_id.append(item.get('id'))
#         if type == 0:
#             receipts = Receipt.objects.filter(PO=instance, status=True)
#         else:
#             receipts = Order.objects.filter(SO=instance, status=True)
#
#         if receipts is not None:
#             for receipt in receipts:
#                 if type == 0:
#                     rc_details = ReceiptDetail.objects.filter(receipt=receipt, status=True)
#                 else:
#                     rc_details = OrderDetail.objects.filter(order=receipt, status=True)
#                 for rc_detail in rc_details:
#                     for item in items:
#                         if item.get('id') == rc_detail.item.id:
#                             item["Qty_receipt"] = rc_detail.Qty_receipt + item.get('Qty_receipt')
#                             break
#         return items



