from django_filters import FilterSet, ChoiceFilter
from django_filters.rest_framework import filters
from rest_framework.filters import SearchFilter

from ..models import PO


class POFilter(SearchFilter):
    status = ChoiceFilter(choices=PO.STATUS_CHOICES)

    class Meta:
        model = PO
        fields = ['status']