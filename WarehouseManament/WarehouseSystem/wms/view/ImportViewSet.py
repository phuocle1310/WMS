from rest_framework import viewsets, permissions, generics, status
from rest_framework.decorators import action
from rest_framework.response import Response

from ..models import ImportView, PO
from ..serializers import ImportViewSerializer


class ImportViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = ImportView.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ImportViewSerializer

    @action(methods=['get'], detail=False, url_path='get_list_import_inprocess')
    def get_list_import_inprocess(self, request):
        if request.user.role == 2 or request.user.is_anonymous:
            return Response({"Failed": "You don't have permission"}, status=status.HTTP_403_FORBIDDEN)
        inprocess = ImportView.objects.filter(status=True)
        return Response(ImportViewSerializer(inprocess, many=True).data, status=status.HTTP_200_OK)

    @action(methods=['get'], detail=False, url_path='get_list_import_finish')
    def get_list_import_finish(self, request):
        if request.user.role == 2 or request.user.is_anonymous:
            return Response({"Failed": "You don't have permission"}, status=status.HTTP_403_FORBIDDEN)
        inprocess = ImportView.objects.filter(status=False)
        return Response(ImportViewSerializer(inprocess, many=True).data, status=status.HTTP_200_OK)

    @action(methods=['get'], detail=False, url_path='get_import_inprocess/(?P<PO_id>[0-9]+)')
    def get_import_inprocess_by_po(self, request, PO_id):
        if request.user.role == 2 or request.user.is_anonymous:
            return Response({"Failed": "You don't have permission"}, status=status.HTTP_403_FORBIDDEN)
        inprocess = ImportView.objects.filter(status=True, PO=PO_id)
        return Response(ImportViewSerializer(inprocess, many=True).data, status=status.HTTP_200_OK)

    @action(methods=['get'], detail=False, url_path='get_import_finish/(?P<PO_id>[0-9]+)')
    def get_import_finish_by_po(self, request, PO_id):
        if request.user.role == 2 or request.user.is_anonymous:
            return Response({"Failed": "You don't have permission"}, status=status.HTTP_403_FORBIDDEN)
        # po = PO.objects.get(pk=PO_id)
        inprocess = ImportView.objects.filter(status=False, PO=PO_id)
        return Response(ImportViewSerializer(inprocess, many=True).data, status=status.HTTP_200_OK)

    @action(methods=['patch'], detail=True)
    def update_status(self, request, pk):
        if request.user.role == 2 or request.user.is_anonymous:
            return Response({"Failed": "You don't have permission"}, status=status.HTTP_403_FORBIDDEN)
        stt = request.data.get('status')
        if stt == True:
            return Response({"Failed": "Change status unsucessfully"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            import_view = self.get_object()
            import_view.status = stt
            import_view.save()
        serializer = ImportViewSerializer(import_view, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

