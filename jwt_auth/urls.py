from django.urls import path
from .views import registration, blacklist

urlpatterns = [
    path('register/', registration, name='register'),
    path('blacklist/', blacklist, name='blacklist'),
]