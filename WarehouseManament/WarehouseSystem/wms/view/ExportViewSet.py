from django.core.exceptions import ValidationError
from rest_framework import viewsets, permissions, generics, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .BaseView import BaseAPIView
from ..models import ExportView, SO
from ..serializers import ExportViewSerializer, SOSerializer


class ExportViewSet(viewsets.ViewSet, generics.ListAPIView, BaseAPIView):
    queryset = ExportView.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ExportViewSerializer

    @action(methods=['get'], detail=False, url_path='get_list_export_allocated')
    def get_list_export_allocated(self, request):
        if request.user.role == 2 or request.user.is_anonymous:
            return Response({"Failed": "You don't have permission"}, status=status.HTTP_403_FORBIDDEN)
        allocated = ExportView.objects.filter(status=0)
        return Response(ExportViewSerializer(allocated, many=True).data, status=status.HTTP_200_OK)

    @action(methods=['get'], detail=False, url_path='get_list_export_picked')
    def get_list_export_picked(self, request):
        if request.user.role == 2 or request.user.is_anonymous:
            return Response({"Failed": "You don't have permission"}, status=status.HTTP_403_FORBIDDEN)
        picked = ExportView.objects.filter(status=1)
        return Response(ExportViewSerializer(picked, many=True).data, status=status.HTTP_200_OK)

    @action(methods=['get'], detail=False, url_path='get_list_export_sorted')
    def get_list_export_sorted(self, request):
        if request.user.role == 2 or request.user.is_anonymous:
            return Response({"Failed": "You don't have permission"}, status=status.HTTP_403_FORBIDDEN)
        sorted = ExportView.objects.filter(status=2)
        return Response(ExportViewSerializer(sorted, many=True).data, status=status.HTTP_200_OK)

    '''
        Get export with SO id
    '''

    @action(methods=['get'], detail=False, url_path='get_export_allocated_by_so/(?P<SO_id>[0-9]+)')
    def get_export_allocated_by_so(self, request, SO_id):
        if request.user.role == 2 or request.user.is_anonymous:
            return Response({"Failed": "You don't have permission"}, status=status.HTTP_403_FORBIDDEN)
        allocated = ExportView.objects.filter(status=0, SO=SO_id)
        return Response(ExportViewSerializer(allocated, many=True).data, status=status.HTTP_200_OK)

    @action(methods=['get'], detail=False, url_path='get_export_picked_by_so/(?P<SO_id>[0-9]+)')
    def get_export_picked_by_so(self, request, SO_id):
        if request.user.role == 2 or request.user.is_anonymous:
            return Response({"Failed": "You don't have permission"}, status=status.HTTP_403_FORBIDDEN)
        picked = ExportView.objects.filter(status=1, SO=SO_id)
        return Response(ExportViewSerializer(picked, many=True).data, status=status.HTTP_200_OK)

    @action(methods=['get'], detail=False, url_path='get_export_sorted_by_so/(?P<SO_id>[0-9]+)')
    def get_export_sorted_by_so(self, request, SO_id):
        if request.user.role == 2 or request.user.is_anonymous:
            return Response({"Failed": "You don't have permission"}, status=status.HTTP_403_FORBIDDEN)
        sorted = ExportView.objects.filter(status=2, SO=SO_id)
        return Response(ExportViewSerializer(sorted, many=True).data, status=status.HTTP_200_OK)

    '''
        Get SO exported
    '''

    @action(methods=['get'], detail=False, url_path='get_list_so_export_finish')
    def get_list_so_export_finish(self, request):
        if request.user.role == 2 or request.user.is_anonymous:
            return Response({"Failed": "You don't have permission"}, status=status.HTTP_403_FORBIDDEN)
        exported_so = SO.objects.filter(status=4).distinct()
        serializer = SOSerializer(exported_so, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=['get'], detail=False, url_path='get_list_po_import_inprocess')
    def get_list_so_export_inprocess(self, request):
        if request.user.role == 2 or request.user.is_anonymous:
            return Response({"Failed": "You don't have permission"}, status=status.HTTP_403_FORBIDDEN)
        import_view = SO.objects.filter(export_view__isnull=False, export_view__status__in=[0, 1]).distinct()
        serializer = SOSerializer(import_view, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=['put'], detail=False)
    def update_status(self, request):
        if request.user.role == 2 or request.user.is_anonymous:
            return Response({"Failed": "You don't have permission"}, status=status.HTTP_403_FORBIDDEN)
        pk_so_list = []
        pk_export_list = []
        export_view_update = request.data.get('export')
        if export_view_update is None:
            return Response({"Failed": "Required data"}, status=status.HTTP_400_BAD_REQUEST)
        for export_view in export_view_update:
            stt = export_view.get('status')
            try:
                stt = int(stt)
            except:
                raise ValidationError("Quantity order must be numeric characters")
            data_update = ExportView.objects.get(pk=export_view.get('pk'))
            if stt < data_update.status or stt > data_update.status + 1:
                return Response({"Failed": "Change status unsucessfully"}, status=status.HTTP_400_BAD_REQUEST)

        for export_view in export_view_update:
            try:
                data_update = ExportView.objects.get(pk=export_view.get('pk'))
                stt = export_view.get('status')
                data_update.status = stt
                data_update.save()
                pk_so_list.append(data_update.SO.pk)
                pk_export_list.append(export_view.get('pk'))
            except ExportView.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)

        for pk in pk_so_list:
            so = SO.objects.get(pk=pk)
            is_exported = self.is_exported(so)
            if is_exported:
                so.status = 4
                so.edit_who = request.user
                so.save()

        export_updated = ExportView.objects.filter(pk__in=pk_export_list)
        serializer = ExportViewSerializer(export_updated, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    '''
        + Check SO đã exported xong chưa
        1) Rồi - update status PO là EXPORTED
        2) Chưa- thì thôi
    '''

    def is_exported(self, instance):
        instance = instance
        export_so = ExportView.objects.filter(SO=instance, status__in=[0, 1])
        if export_so.count() > 0:
            return False
        return True
