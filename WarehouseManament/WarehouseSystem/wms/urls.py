from django.urls import path, include, re_path
from rest_framework import permissions

from . import views
from rest_framework.routers import DefaultRouter
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="WMS API",
        default_version='v1',
        description="APIs for WMS.PY",
        contact=openapi.Contact(email="1851050120phuoc@ou.edu.vn"),
        license=openapi.License(name="Le Huu Phuoc 2021"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

router = DefaultRouter()
router.register('users', views.UserViewSet)
router.register('pos', views.POViewSet, basename='po')

urlpatterns = [
    path('', include(router.urls)),

    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    path('o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
]
