from rest_framework import viewsets, generics, permissions, status, filters
from ..models import *
from ..serializers import ItemSerializer


class ItemViewSet(viewsets.ViewSet, generics.ListAPIView, generics.CreateAPIView,
                  generics.UpdateAPIView, generics.RetrieveAPIView):
    queryset = Item.objects.filter(active=True)
    serializer_class = ItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_item_by_hsd(self, request):


        items = Item.objects.filter()
