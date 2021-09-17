from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import permissions, viewsets, generics
from rest_framework.parsers import MultiPartParser

from ..models import User
from ..serializers import UserSerializer


class UserViewSet(viewsets.ViewSet, generics.CreateAPIView, generics.RetrieveAPIView,
                  generics.UpdateAPIView, generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    parser_classes = [MultiPartParser, ]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['first_name', 'last_name', 'role', 'is_active', 'username', 'address']

    def get_permissions(self):
        if self.action == 'retrieve' or self.action == 'update' or self.action == 'list':
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]
