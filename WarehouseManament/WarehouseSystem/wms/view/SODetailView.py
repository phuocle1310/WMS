from rest_framework import viewsets, generics, permissions

from ..models import SODetail
from ..serializers import SODetailSerializer


class SODetailView(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveAPIView,
                   generics.CreateAPIView, generics.DestroyAPIView):
    queryset = SODetail.objects.filter(status=True)
    serializer_class = SODetailSerializer
    action_required_auth = ['list', 'retrieve', 'create',
                            'update']

    def get_permissions(self, list_action=action_required_auth):
        if self.action in list_action:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]