from django.urls import path, include
from .views import (
    LoginView, RegisterView, RefreshView, UserProfile, UserProfileView, 
    MeView, LogoutView,
    UpdateFavoriteView, CheckIsFavoriteView
)
from rest_framework.routers import DefaultRouter

router = DefaultRouter(trailing_slash=False)

router.register("profile", UserProfileView)

urlpatterns = [
    path('', include(router.urls)),
    path('login', LoginView.as_view(), name='login'),
    path('register', RegisterView.as_view(), name='register'),
    path('refresh', RefreshView.as_view(), name='refresh'),
    path('me', MeView.as_view()),
    path('logout', LogoutView.as_view()),
    path('update-favorite', UpdateFavoriteView.as_view()),
    path('check-favorite/<int:favorite_id>', CheckIsFavoriteView.as_view()),
]