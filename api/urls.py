from django.contrib import admin
from django.urls import path
from rest_framework import routers
from django.conf.urls import include
from .views import ProductViewSet, TransactionViewSet, BudgetViewSet

#router = routers.DefaultRouter()
#router.register('products', ProductViewSet)
#router.register('transactions', TransactionViewSet)

urlpatterns = [
    path('products/', ProductViewSet.as_view()),
    path('transactions/',TransactionViewSet.as_view()),
    path('budget/',BudgetViewSet.as_view())
]
