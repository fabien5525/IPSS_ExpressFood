from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from personne_api.views import PersonneViewSet
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

router = routers.DefaultRouter()
router.register(r'personnes', PersonneViewSet)

schema_view = get_schema_view(
    openapi.Info(
        title="ExpressFood API",
        default_version='v1',
    ),
    public=True,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('docs/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]