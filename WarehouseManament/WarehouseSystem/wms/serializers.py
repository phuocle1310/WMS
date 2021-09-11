from rest_framework.serializers import ModelSerializer
from .models import *


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'last_name', 'avatar', 'first_name', 'role', 'is_active']
