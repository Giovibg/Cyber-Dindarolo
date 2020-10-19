from rest_framework import serializers
from .models import Product, Transaction, Budget
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'name', 'description', 'quantity', 'unit_price')

class TransactionGetSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='product.name')
    class Meta:
        model = Transaction
        fields = ('id', 'product_name', 'unit_price',  'quantity', 'currency', 'transaction_timestamp','subtotal') 

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ('id', 'product', 'quantity', 'currency', 'transaction_timestamp','subtotal','owner')


class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = ('id', 'user', 'budget')

class BudgetGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = ('id', 'budget')