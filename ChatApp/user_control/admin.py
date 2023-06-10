from django.contrib import admin
from .models import CustomUser, Jwt, Favorite
# Register your models here.

admin.site.register((CustomUser, Jwt,  Favorite))
# admin.site.register(CustomUserManager)

