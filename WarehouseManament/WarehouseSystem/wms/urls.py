from django.conf.urls import url
from django.urls import path, include, re_path
from rest_framework import permissions
from rest_framework.routers import DefaultRouter
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from . import views
from .admin import admin_site

schema_view = get_schema_view(
    openapi.Info(
        title="WMS API",
        default_version='v1',
        description="APIs for WMS.PY",
        contact=openapi.Contact(email="1851050120phuoc@ou.edu.vn"),
        license=openapi.License(name="wms PY 2021"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),

)

router = DefaultRouter()
router.register('po', views.POViewSet)
router.register('so', views.SOView)
router.register('user', views.UserViewSet)
router.register('item', views.ItemViewSet)
router.register('order', views.OrderView)
router.register('receipt', views.ReceiptView)
router.register('supplier', views.SupplierView)
router.register('statistical', views.StatisticalViewSet, basename='MyModel')
router.register(r'import', views.ImportViewSet)
router.register(r'export', views.ExportViewSet)
router.register(r'location', views.LocationViewSet)

urlpatterns = [
    path('admin/', admin_site.urls),
    path('', include(router.urls)),

    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
    path('oauth2-info/', views.AuthInfo.as_view()),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
