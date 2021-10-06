from rest_framework import viewsets, permissions, generics, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .BaseView import BaseAPIView
from ..models import ExportView, SO
from ..serializers import ExportViewSerializer


class ExportViewSet(viewsets.ViewSet, generics.ListAPIView, BaseAPIView):
    queryset = ExportView.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ExportViewSerializer

    @action(methods=['patch'], detail=True)
    def update_status(self, request, pk):
        export_view = self.get_object()
        if request.user.role == 2 or request.user.is_anonymous:
            return Response({"Failed": "You don't have permission"}, status=status.HTTP_403_FORBIDDEN)
        stt = request.data.get('status')
        if stt == 0:
            return Response({"Failed": "Change status unsucessfully"}, status=status.HTTP_400_BAD_REQUEST)
        if stt < export_view.status:
            return Response({"Failed": "Change status unsucessfully"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            export_view = self.get_object()
            export_view.status = stt
            export_view.save()
        serializer = ExportViewSerializer(export_view, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

