from rest_framework import viewsets, permissions, generics, status
from rest_framework.decorators import action
from rest_framework.response import Response

from ..models import ImportView, PO
from ..serializers import ImportViewSerializer, POSerializer


class ImportViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = ImportView.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ImportViewSerializer

    @action(methods=['get'], detail=False, url_path='get_list_po_import_inprocess')
    def get_list_po_import_inprocess(self, request):
        if request.user.role == 2 or request.user.is_anonymous:
            return Response({"Failed": "You don't have permission"}, status=status.HTTP_403_FORBIDDEN)
        import_view = PO.objects.filter(import_view__isnull=False, import_view__status=True).distinct()
        serializer = POSerializer(import_view, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=['get'], detail=False, url_path='get_list_po_import_finish')
    def get_list_po_import_finish(self, request):
        if request.user.role == 2 or request.user.is_anonymous:
            return Response({"Failed": "You don't have permission"}, status=status.HTTP_403_FORBIDDEN)
        imported_po = PO.objects.filter(status=4).distinct()
        serializer = POSerializer(imported_po, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

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
        inprocess = ImportView.objects.filter(status=False, PO=PO_id)
        return Response(ImportViewSerializer(inprocess, many=True).data, status=status.HTTP_200_OK)

    @action(methods=['put'], detail=False, url_path='update-import')
    def update_status(self, request):
        if request.user.role == 2 or request.user.is_anonymous:
            return Response({"Failed": "You don't have permission"}, status=status.HTTP_403_FORBIDDEN)
        pk_list = []
        import_view_update = request.data.get('import')
        if import_view_update is None:
            return Response({"Failed": "Required data"}, status=status.HTTP_400_BAD_REQUEST)
        for import_view in import_view_update:
            try:
                datas_update = ImportView.objects.get(pk=import_view.get('pk'))
            except ImportView.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
            pk_list.append(import_view.get('pk'))

        for pk in pk_list:
            data_update = ImportView.objects.get(pk=pk)
            data_update.status = False
            data_update.save()

            '''
                + kiểm tra nếu PO đã import xong thì update status là IMPORTED
            '''

            po_update = data_update.PO
            is_imported = self.is_imported(po_update)
            if is_imported:
                po_update.status = 4
                po_update.edit_who = request.user
                po_update.save()
        data_return = ImportView.objects.filter(pk__in=pk_list)
        serializer = ImportViewSerializer(data_return, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



    '''
        + Check PO đã imported xong chưa
        1) Rồi - update status PO là IMPORTED
        2) Chưa- thì thôi
    '''

    def is_imported(self, instance):
        instance = instance
        import_po = ImportView.objects.filter(PO=instance, status=True)
        if import_po.count() > 0:
            return False
        return True
