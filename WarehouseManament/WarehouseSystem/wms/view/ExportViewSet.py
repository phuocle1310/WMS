from rest_framework import viewsets, permissions, generics, status
from rest_framework.decorators import action
from rest_framework.response import Response

from ..models import ExportView, SO
from ..serializers import ExportViewSerializer


class ExportViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = ExportView.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ExportViewSerializer

