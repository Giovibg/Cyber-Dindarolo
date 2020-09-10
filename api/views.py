from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Product, Transaction
from .serializers import ProductSerializer, TransactionSerializer
# Create your views here.

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    #Insert product if not already available
    @action(detail=False, methods=['POST'])
    def post(self, request):
        if 'name' in request.data:
            name = request.data['name']
            products = Product.objects.all()
            for prod in products:
                if prod.name == name:
                    response = {'message': 'product already available'}
                    return Response(response, status=status.HTTP_400_BAD_REQUEST)
            response = {'message': 'product added'}
            product_serializer = ProductSerializer(data=request.data)
            if product_serializer.is_valid():
                product_serializer.save()
                return Response(response, status=status.HTTP_201_CREATED)

    #Get all products
    
            

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer