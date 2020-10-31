from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from api.models import *
class DindaroloTest(APITestCase):
    def setUp(self):
        #register an account and get token
        self.client = APIClient()
        url = 'http://localhost:8000/jwt_auth/register/'
        data = {
            "username":"bob",
            "email":"bob@gmail.com",
            "password":"bob",
            "password2":"bob"
        }
        response = self.client.post(url,data)
        self.token = response.data['access']
        self.refresh = response.data['refresh']
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        #Insert a product
        self.product_1 = Product(name="Cavo", description="Audio", unit_price=11, quantity=3)
        self.product_1.save()
        
        self.user = User.objects.get(id=1)
        self.budget = Budget(user=self.user, budget = 50)
        self.budget.save()
        
    def test_GetNotLogged(self):
        #Test get without token
        url = 'http://localhost:8000/api/products/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
    def test_InsertNotLogged(self):
        #Insert a product without login
        url = 'http://localhost:8000/api/products/'
        data = {
            "name":"Mascherine",
            "unit_price":0.35,
            "quantity":100
        }
        response = self.client.put(url,data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_GetProductsLogged(self):
        #Test get with token 
        url = 'http://localhost:8000/api/products/'
        self.client.credentials(HTTP_AUTHORIZATION='Bearer '+ str(self.token))
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    def test_InsertProductLogged(self):
        #Insert new Product 
        url = 'http://localhost:8000/api/products/'
        self.client.credentials(HTTP_AUTHORIZATION='Bearer '+ str(self.token))
        data = {
            "name":"Mascherine",
            "unit_price":0.35,
            "quantity":100
        }
        response = self.client.put(url,data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
    def test_UpdateProduct(self):
        #Update quantity and unit price of a product previously inserted
        url = 'http://localhost:8000/api/products/'
        self.client.credentials(HTTP_AUTHORIZATION='Bearer '+ str(self.token))
        data2 = {
            "name":"Cavo",
            "unit_price":8,
            "quantity":15
        }
        response = self.client.put(url,data2)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_makeTransactionNoBudget(self):
        #Make transaction(buy a product available) without sufficient budget
        url = 'http://localhost:8000/api/transactions/'
        self.client.credentials(HTTP_AUTHORIZATION='Bearer '+ str(self.token))
        data = {
            "product":1,
            "quantity":9
        }
        response = self.client.put(url,data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_makeTransaction(self):
        #Buy a product
        url = 'http://localhost:8000/api/transactions/'
        self.client.credentials(HTTP_AUTHORIZATION='Bearer '+ str(self.token))
        data = {
            "product":1,
            "quantity":3
        }
        response = self.client.put(url,data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
    def test_TransactionQuantityOver(self):
        #Make a transaction with quantity choosen higher than available
        url = 'http://localhost:8000/api/transactions/'
        self.client.credentials(HTTP_AUTHORIZATION='Bearer '+ str(self.token))
        data = {
            "product":1,
            "quantity":15
        }
        response = self.client.put(url,data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_Blacklist(self):
        #Blacklist refresh token
        url = 'http://localhost:8000/jwt_auth/blacklist/'
        data = {
            "refresh_token":str(self.refresh)
        }
        response = self.client.post(url,data)
        self.assertEqual(response.status_code, status.HTTP_205_RESET_CONTENT)        
