from rest_framework import serializers
from .models import Product, Transaction, Budget
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id','name', 'description')

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ('id','product', 'unit_price','trans_type', 'quantity', 'currency', 'transaction_timestamp')

class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = ('id','owner','budget')