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
from .models import PO
from .serializers import POSerializer
# lấy thông tin cl, id
class AuthInfo(APIView):
    def get(self, request):
        return Response(settings.OAUTH2_INFO, status=status.HTTP_200_OK)



