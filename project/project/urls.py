from django.contrib import admin
from django.urls import include, path
from rest_framework import routers

from api import views
# from drf_yasg.views import get_schema_view
# from drf_yasg import openapi

# router = routers.DefaultRouter()
# router.register(r'personnes', PersonneViewSet)

# schema_view = get_schema_view(
#     openapi.Info(
#         title="ExpressFood API",
#         default_version='v1',
#     ),
#     public=True,
# )

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('api/', include('api.urls')),
    path('ListePlat/', views.getAllPlat, name='ListePlat'),
    path('ListeUser/', views.getAllUser, name='ListeUser'),
    path('ListeLivreur/', views.getAllLivreur, name='ListeLivreur'),
    path('ListeCommande/', views.getAllCommande, name='ListeCommande'),
    path('EditerPlatduJour/<int:id>', views.updatePlatduJour, name='EditerPlatduJour'),
    path('Inscription/', views.Inscription, name='Inscription'),
    path('Connexion/', views.Connexion, name='Connexion'),
    path('Rechercher/<int:id>', views.SearchPlat, name='Rechercher'),
    # path('api/', include(router.urls)),
    # path('docs/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]