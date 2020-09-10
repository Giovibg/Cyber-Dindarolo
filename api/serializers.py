from rest_framework import serializers
from .models import Product, Transaction
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id','name', 'description')

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ('id','product', 'user', 'unit_price', 'quantity', 'currency', 'transaction_timestamp')