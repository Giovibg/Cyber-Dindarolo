from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Product, Transaction, Budget
from rest_framework.views import APIView
from .serializers import ProductSerializer, TransactionSerializer, BudgetSerializer, BudgetGetSerializer, TransactionGetSerializer
from rest_framework.exceptions import  PermissionDenied
from rest_framework import permissions
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
# Create your views here.

class IsOwner(permissions.BasePermission):
    def has_object_permission(self,request,view,obj):
        return obj.owner == request.user

@permission_classes([IsAuthenticated])

class ProductViewSet(APIView):

    #Insert product if not already available
    #@action(detail=False, methods=['POST'])
    def post(self, request):
        product_serializer = ProductSerializer(data=request.data)
        if product_serializer.is_valid():
            #Check if product already exists
            name = request.data['name']
            products = Product.objects.all()
            for prod in products:
                if prod.name == name:
                    response = {'message': 'product already available'}
                    return Response(response, status=status.HTTP_400_BAD_REQUEST)
            
            product_serializer.save()
            response = {'message': 'product added'}
            return Response(response, status=status.HTTP_201_CREATED)
        return Response(product_serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    #Get all products
    
   # @permission_classes([IsAuthenticated])
    def get(self,request):
        all_products = Product.objects.all()
        serializer = ProductSerializer(all_products, many=True)
        return Response(serializer.data)
        #return Response(data={"hello":"world"}, status=status.HTTP_200_OK)

class TransactionViewSet(APIView):
    permission_classes = (IsOwner,)
    #authentication_classes = (TokenAuthentication, )
    #Get all transaction list
    def get(self,request):
        user = self.request.user
        if user.is_authenticated:
            all_transactions = Transaction.objects.filter(owner=user)
            serializer_class = TransactionGetSerializer(all_transactions, many=True)
            return Response(serializer_class.data)
        raise PermissionDenied()
        
    
    #Create a transaction
    def put(self,request):
        serializer = TransactionSerializer(data = request.data)
        user = self.request.user
        if serializer.is_valid():
            total = 0
            if serializer.validated_data['trans_type'] == 'DOWN':
                total = -serializer.validated_data['quantity'] * serializer.validated_data['unit_price']
                print(total)
            elif serializer.validated_data['trans_type'] == 'UP':
                total = serializer.validated_data['quantity'] * serializer.validated_data['unit_price']
                print(total)

            #Get back old budget value
            try:
                budget = Budget.objects.get(user=self.request.user)
            except:
                budget = Budget(user = self.request.user, budget = 0)
                budget.save()
                budget = Budget.objects.get(user=self.request.user)

            budget_serial = BudgetSerializer(budget)
            old_budget = budget_serial.data['budget']
            
            print("budget", old_budget)
            
            #Update only if positive budget
            if (old_budget + total) >= 0:
                old_budget += total
                new_budget = round(float(old_budget), 2)
                budget.budget = new_budget
                print("new budget: "+ str(new_budget))

                budget.save()
                total = round(float(total), 2)
                serializer.save(subtotal = total, owner = self.request.user)
                         
                #serializer.save(subtotal = total)
                #serializer.save(owner=self.request.user)
                #serializer.save()
                
                response = {'message':'Created transaction'}
                return Response(response, status=status.HTTP_200_OK)
            else:
                response = {'message':'Not sufficient budget'}
                return Response(response,status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class BudgetViewSet(APIView):
    permission_classes = (IsOwner,)
    #Get Budget of the user
    def get(self, request):
        user = self.request.user
        if user.is_authenticated:
            budget1 = Budget.objects.filter(user=self.request.user)
            serializer_class = BudgetSerializer(budget1, many=True)

            return Response(serializer_class.data)
        raise PermissionDenied()

    