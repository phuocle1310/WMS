from rest_framework import viewsets, generics, permissions

from ..models import PODetail
from ..serializers import PODetailSerializer


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