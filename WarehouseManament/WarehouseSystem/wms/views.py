from django.shortcuts import render
from .models import *
from rest_framework import viewsets
from .serializers import UserSerializer
# Create your views here.


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.filter(role=0)
    serializer_class = UserSerializer
