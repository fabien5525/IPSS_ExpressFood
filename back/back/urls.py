from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from api.views import PlatViewSet, UserViewSet, LivreurViewSet, CommandeViewSet, UserRegistrationView, UserLoginView

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

from django.conf import settings
from django.views.static import serve


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('docs/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('api/register/', UserRegistrationView.as_view(), name='user-registration'),
    path('api/login/', UserLoginView.as_view(), name='user-login'),
    # static folder
    path('images/<path:path>/', serve, {'document_root': str(settings.BASE_DIR) + "/images/"}),
]

