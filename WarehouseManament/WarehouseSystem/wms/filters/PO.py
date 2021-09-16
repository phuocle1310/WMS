from django_filters import FilterSet
from django_filters.rest_framework import filters

from ..models import PO


class POFilter(FilterSet):
    class Meta:
        model = PO
        fields = ['supplier']

    def filter_queryset(seft, request, queryset, view):
        return queryset.filter(pk=request.query_params.get('pk'))