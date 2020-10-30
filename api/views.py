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

    #Insert product with quantity and unit price. If already available, update it
    #@action(detail=False, methods=['POST'])
    def put(self, request):
        product_serializer = ProductSerializer(data=request.data)
        if product_serializer.is_valid():
            product_serializer.validated_data['name'] = product_serializer.validated_data['name'].capitalize()
            #Get back old budget for user
            try:
                budget = Budget.objects.get(user=self.request.user)
            except:
                budget = Budget(user = self.request.user, budget = 0)
                budget.save()
                budget = Budget.objects.get(user=self.request.user)
            budget_serial = BudgetSerializer(budget)
            old_budget = budget_serial.data['budget']
            #print("old budget", old_budget)

            #print("name:",product_serializer)
            total = product_serializer.validated_data['quantity'] * product_serializer.validated_data['unit_price']

            #Update budget
            old_budget += total
            new_budget = round(float(old_budget), 2)
            budget.budget = new_budget
            #print("new budget: "+ str(new_budget))
            budget.save()
            #print("budget", old_budget)

            #Check if product already exists
            name = product_serializer.validated_data['name']
            products = Product.objects.all()
            for prod in products:
                if prod.name == name:
                
                    #Get old quantity
                    old_quantity = prod.quantity
                    old_price = prod.unit_price
                
                    #Update quantity and price
                    new_quantity = old_quantity + product_serializer.validated_data['quantity']
                    new_unit_price = ((old_quantity * old_price) + (product_serializer.validated_data['quantity']* product_serializer.validated_data['unit_price'] )) / new_quantity
                    new_unit_price = round(float(new_unit_price), 2)
                    prod.unit_price = new_unit_price
                    prod.quantity = new_quantity
                    prod.save()

                    #Update History
                    t = Transaction.objects.create(owner=self.request.user, product=prod, unit_price=product_serializer.validated_data['unit_price'], quantity=product_serializer.validated_data['quantity'], subtotal=(product_serializer.validated_data['quantity']* product_serializer.validated_data['unit_price'] ))
                    t.save()
                    response = {'message': 'product modified'}
                    return Response(response, status=status.HTTP_200_OK)
            product_serializer.validated_data['name'] = product_serializer.validated_data['name'].capitalize()
            #Add new product

            product_serializer.save()
            prod = Product.objects.get(name=product_serializer.validated_data['name'])
            #print("prodotto:",prod)
            #Update history
            t = Transaction.objects.create(owner=self.request.user, product=prod, unit_price=product_serializer.validated_data['unit_price'], quantity=product_serializer.validated_data['quantity'], subtotal=(product_serializer.validated_data['quantity']* product_serializer.validated_data['unit_price'] ))
            t.save()

            response = {'message': 'product added'}
            return Response(response, status=status.HTTP_201_CREATED)
        return Response(product_serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    #Get all products
    
    #@permission_classes([IsAuthenticated])
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
            #print("prodotto:", serializer.validated_data['product'])
            #Get back product choosen and check availability
            try:
                product = Product.objects.get(name=serializer.validated_data['product'])
            except:
                response = {'message': 'product not available'}
                return Response(response, status=status.HTTP_400_BAD_REQUEST)
            product_serial = ProductSerializer(product)

            if(serializer.validated_data['quantity'] > product_serial.data['quantity']):
                response = {'message': 'Not sufficient quantity available'}
                return Response(response, status=status.HTTP_400_BAD_REQUEST)
            #print("prezzo unitario:",product_serial.data['unit_price'])
            total = -serializer.validated_data['quantity'] * product_serial.data['unit_price']

            #Get back old budget value
            try:
                budget = Budget.objects.get(user=self.request.user)
            except:
                budget = Budget(user = self.request.user, budget = 0)
                budget.save()
                budget = Budget.objects.get(user=self.request.user)

            budget_serial = BudgetSerializer(budget)
            old_budget = budget_serial.data['budget']
            
            #print("budget", old_budget)
            
            #Update budget only if positive budget
            if (old_budget + total) >= 0:
                old_budget += total
                new_budget = round(float(old_budget), 2)
                budget.budget = new_budget
                #print("new budget: "+ str(new_budget))

                budget.save()
                total = round(float(total), 2)
                #Update History
                serializer.save(subtotal = total, owner = self.request.user, unit_price = product_serial.data['unit_price'])
                         
                #Update Product quantity
                old_quantity_prod = product_serial.data['quantity']
                new_quantity_prod = old_quantity_prod - serializer.validated_data['quantity']
                product.quantity = new_quantity_prod
                product.save()

                response = {'message':'Created transaction'}
                return Response(response, status=status.HTTP_201_CREATED)
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
            try:
                budget = Budget.objects.get(user=self.request.user)
            except:
                budget = Budget(user = self.request.user, budget = 0)
                budget.save()
                budget = Budget.objects.get(user=self.request.user)
            serializer_class = BudgetSerializer(budget)

            return Response(serializer_class.data)
        raise PermissionDenied()

    