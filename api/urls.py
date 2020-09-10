from django.contrib import admin
from django.urls import path
from rest_framework import routers
from django.conf.urls import include
from .views import ProductViewSet, TransactionViewSet

router = routers.DefaultRouter()
router.register('products', ProductViewSet)
router.register('transactions', TransactionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
