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
from .models import PO, Receipt, ReceiptDetail, PODetail, SODetail, Order, OrderDetail,SO,Item
from .serializers import POSerializer
from rest_framework.decorators import action
import datetime
# lấy thông tin cl, id
class AuthInfo(APIView):
    def get(self, request):
        return Response(settings.OAUTH2_INFO, status=status.HTTP_200_OK)


#thống kê

class StatisticalViewSet(viewsets.ViewSet,generics.RetrieveAPIView):
    action_required_auth = ['get_statistical_all','total_Po_So_By_Year']

    def get_permissions(self, list_action=action_required_auth):
        if self.action in list_action:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]
    @action(methods=['get'], detail=False, url_path="statistical")
    def get_statistical_all(self, request):
        totalPo = 0 #tổng po,so, product, các đơn hàng thành công
        totalSo = 0
        totalProduct = 0
        totalDone = 0
        if request.user.role == 2:
            totalPo = PO.objects.filter(supplier=request.user.supplier).count()
            totalSo = SO.objects.filter(supplier=request.user.supplier).count()
            totalProduct = Item.objects.filter(supplier=request.user.supplier, Qty_total__gt=0, status=True).values("name").distinct().count()
            totalDonePo = PO.objects.filter(supplier=request.user.supplier, status=0).count() #tổng các đơn hàng po done
            totalDoneSo = SO.objects.filter(supplier=request.user.supplier, status=0).count()#tổng các đơn hàng so done
            totalDone = totalDonePo+totalDoneSo;
        else:
            totalPo = PO.objects.all().count()
            totalSo = SO.objects.all().count()
            totalProduct = Item.objects.filter(Qty_total__gt=0, status=True).count()
            totalDonePo = PO.objects.filter(status=0).count() #tổng các đơn hàng po done
            totalDoneSo = SO.objects.filter(status=0).count()#tổng các đơn hàng so done
            totalDone = totalDonePo+totalDoneSo;
        data= {"totalPo":totalPo,"totalSo":totalSo, "totalProduct":totalProduct,"totalDone":totalDone}
        return Response(data=data, status=status.HTTP_200_OK)
    @action(methods=['get'], detail=False, url_path="totalPoSoByYear")
    def total_Po_So_By_Year(self, request):
        year = self.request.query_params.get('year', datetime.datetime.now().year)
        dataPo = {"months": {}}
        dataSo = {"months": {}}
        if request.user.role == 2:
            dataPo = self.get_statisticalPo_month_by_year(int(year),2,request.user.supplier)
            dataSo = self.get_statisticalSo_month_by_year(int(year),2,request.user.supplier)
        else:
            dataPo = self.get_statisticalPo_month_by_year(int(year))
            dataSo = self.get_statisticalSo_month_by_year(int(year))
        data = {"po":dataPo,"so":dataSo}
        return Response(data=data, status=status.HTTP_200_OK)
    def get_statisticalPo_month_by_year(self, year=datetime.datetime.now().year,role=None,pagram=None):
        if type(year) is int:
            data = {"months": {}}
            month = 11
            for m in range(month):
                if role == 2:
                    data["months"][str(m + 1)] = PO.objects.filter(add_date__year=year, add_date__month=m,
                                                                   supplier=pagram).count()
                else:
                    data["months"][str(m + 1)] = PO.objects.filter(add_date__year=year, add_date__month=m, ).count()
            return data
        return {"data": []}
    def get_statisticalSo_month_by_year(self, year=datetime.datetime.now().year,role=None,pagram=None):
        if type(year) is int:
            data = {"months": {}}
            month = 11
            for m in range(month):
                if role==2:
                    data["months"][str(m+1)] =SO.objects.filter(add_date__year=year,add_date__month=m,supplier=pagram).count()
                else:
                    data["months"][str(m + 1)] = SO.objects.filter(add_date__year=year, add_date__month=m,).count()

            return data
        return {"data": []}



