from django.contrib import admin

# Register your models here.
from .models import Plat, Role, User, Livreur, Commande

admin.site.register(Plat)
admin.site.register(Role)
admin.site.register(User)
admin.site.register(Livreur)
admin.site.register(Commande)
