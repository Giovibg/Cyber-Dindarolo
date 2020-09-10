from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Product, Transaction, Budget
from rest_framework.views import APIView
from .serializers import ProductSerializer, TransactionSerializer, BudgetSerializer
# Create your views here.

class ProductViewSet(APIView):

    #Insert product if not already available
    #@action(detail=False, methods=['POST'])
    def post(self, request):
        if 'name' in request.data:
            #Check if product already exists
            name = request.data['name']
            products = Product.objects.all()
            for prod in products:
                if prod.name == name:
                    response = {'message': 'product already available'}
                    return Response(response, status=status.HTTP_400_BAD_REQUEST)
            product_serializer = ProductSerializer(data=request.data)
            if product_serializer.is_valid():
                product_serializer.save()
                response = {'message': 'product added'}
                return Response(response, status=status.HTTP_201_CREATED)
        return Response(product_serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    #Get all products
    def get(self,request):
        all_products = Product.objects.all()
        serializer = ProductSerializer(all_products, many=True)
        return Response(serializer.data)

class TransactionViewSet(APIView):

    #Get all transaction list
    def get(self,request):
        all_transactions = Transaction.objects.all()
        serializer_class = TransactionSerializer(all_transactions, many=True)
        return Response(serializer_class.data)
    
    #Create a transaction
    def post(self,request):
        serializer = TransactionSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class BudgetViewSet(APIView):
    
    #Get Budget of the user
    def get(self,request):
        budget = Budget.objects.get(pk=1)
        serializer = BudgetSerializer(budget)
        return Response(serializer.data)

    #Set/Update budget
    def put(self,request):
        budget = Budget.objects.get(pk=1)

        #Get old budget available 
        old_serial = BudgetSerializer(budget)
        old_budget = old_serial.data['budget']

        serializer = BudgetSerializer(budget, data=request.data)
        if serializer.is_valid():
            #Update only if positive budget
            if (old_budget + serializer.validated_data['budget']) >= 0:
                serializer.validated_data['budget'] = old_budget + serializer.validated_data['budget']
                serializer.save()
                return Response(serializer.data)
            else:
                response = {'message': 'Operation not permitted'}
                return Response(response, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, stauts=status.HTTP_400_BAD_REQUEST)