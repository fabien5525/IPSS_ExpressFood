from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from api.views import PlatViewSet, UserViewSet, LivreurViewSet, CommandeViewSet, UserRegistrationView, UserLoginView,LocalisationView

router = routers.DefaultRouter()
# register the viewsets
router.register(r'plat', PlatViewSet)
router.register(r'user', UserViewSet)
router.register(r'livreur', LivreurViewSet)
router.register(r'commande', CommandeViewSet)

schema_view = get_schema_view(
    openapi.Info(
        title="API",
        default_version='v1',
    ),
    public=True,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('docs/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('api/register/', UserRegistrationView.as_view(), name='user-registration'),
    path('api/login/', UserLoginView.as_view(), name='user-login'),
    path("api/distance/", LocalisationView.as_view(), name='distance'),
    path('api/plat/', PlatViewSet.as_view({'get': 'list'}), name='plat-list'),
]
