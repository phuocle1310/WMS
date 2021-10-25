from django.core.exceptions import ValidationError
from rest_framework import viewsets, generics, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response

from ..models import Location
from ..serializers import LocationCreateSerializer, LocationSerializer


class LocationViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Location.objects.all()
    permission_classes = [permissions.IsAdminUser]
    serializer_class = LocationSerializer

    def get_serializer_class(self):
        if self.action in ['create_location_for_new_facility']:
            return LocationCreateSerializer

    # @action(methods=['post'], detail=False, url_path='create-location-for-new-facility')
    # def create_location_for_new_facility(self, request):
    #     if request.user.role == 2 or request.user.is_anonymous:
    #         return Response({"Failed": "You don't have permission"}, status=status.HTTP_403_FORBIDDEN)
    #     return Response(status=status.HTTP_200_OK)