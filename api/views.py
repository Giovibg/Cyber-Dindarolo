from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Product, Transaction, Budget
from rest_framework.views import APIView
from .serializers import ProductSerializer, TransactionSerializer, BudgetSerializer, TransactionGetSerializer,BudgetGetSerializer
from rest_framework.exceptions import  PermissionDenied
from rest_framework import permissions
from rest_framework.authentication import TokenAuthentication
# Create your views here.

class IsOwner(permissions.BasePermission):
    def has_object_permission(self,request,view,obj):
        return obj.owner == request.user

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
    def get(self,request):
        all_products = Product.objects.all()
        serializer = ProductSerializer(all_products, many=True)
        return Response(serializer.data)

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
            
            #profile = serializer.save(commit=False)
            #profile.user = self.request.user
            #profile.save()
            if serializer.validated_data['trans_type'] == 'DOWN':
                total = -serializer.validated_data['quantity'] * serializer.validated_data['unit_price']
                print(total)
                #return Response(ret, status=status.HTTP_201_CREATED)
            elif serializer.validated_data['trans_type'] == 'UP':
                total = serializer.validated_data['quantity'] * serializer.validated_data['unit_price']
                print(total)
                #return Response(ret, status=status.HTTP_201_CREATED)

            #Check if budget is sufficient
            budget = Budget.objects.get(user=self.request.user)
            budget_serial = BudgetSerializer(budget)
            old_budget = budget_serial.data['budget']
            #old_budget = user.budget.budget
            #old_budget = Budget.objects.get(user = request.user)
            #profile = Budget.objects.create(user=request.user)
            #old_budget = profile.budget
            print("budget",old_budget)
            
            #Update only if positive budget
            if (old_budget + total) >= 0:
                total += old_budget
                bud = Budget(user = self.request.user, budget = total)
                bud.save()
                #budget_serial2 = BudgetSerializer(budget=total, user=self.request.user)
                #if budget_serial2.is_valid():
                #    budget_serial2.save()
                #budget_serial.save(budget=total)
                #budget_serial.save(owner=self.request.user)
                
                #if budget_serial.is_valid():
                #    budget_serial.validated_data['budget'] = old_budget + total
                #budget_serial.save()
                return Response(budget, status=status.HTTP_200_OK)
            else:
                response = {'message':'Not sufficient budget'}
                return Response(response,status=status.HTTP_400_BAD_REQUEST)
            serializer.save(subtotal = total)
            serializer.save(owner=self.request.user)
            serializer.save()
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class BudgetViewSet(APIView):
    permission_classes = (IsOwner,)
    #Get Budget of the user
    def get(self, request):
        user = self.request.user
        if user.is_authenticated:
            budget1 = Budget.objects.filter(owner=user)
            serializer_class = BudgetSerializer(budget1, many=True)

            return Response(serializer_class.data)
        raise PermissionDenied()
        #budget1 = Budget.objects.get(pk=1)
        #print(budget1)
        #serializer = BudgetSerializer(budget1)
        #resp = {'msg':'ok'}
        #if serializer.is_valid():
        #print(serializer.validated_data["budget"])
        #    return Response(serializer.data,status=status.HTTP_200_OK)

    #Set/Update budget TODO:Correct error if no budget
    def put(self,request):
        budget = Budget.objects.filter(owner=self.request.user)
        serializer2 = BudgetGetSerializer(budget, data=request.data)
        if serializer2.is_valid():

            #Get old budget available 
            old_serial = BudgetGetSerializer(budget)
            print(old_serial)
            old_budget = old_serial.data['budget']

            #Update only if positive budget
            if (old_budget + serializer.validated_data['budget']) >= 0:
                serializer.validated_data['budget'] = old_budget + serializer.validated_data['budget']
                serializer.save(owner=self.request.user)
                serializer.save()
                return Response(serializer.data)
            else:
                response = {'message': 'Operation not permitted'}
                return Response(response, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)