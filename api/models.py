from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
from django.utils import timezone

class Product(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField(blank=True, max_length=100)
    quantity = models.IntegerField(validators=[MinValueValidator(1)])
    unit_price = models.FloatField(default=0.01, validators=[MinValueValidator(0.01)])
    def __str__(self):
        return f'{self.name}'
        
    class Meta:
        ordering = ['name']

class Transaction(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, blank=True)
    product = models.ForeignKey('Product', related_name='transactions', on_delete=models.DO_NOTHING)
    unit_price = models.FloatField(default=0.01, validators=[MinValueValidator(0.01)])
    quantity = models.IntegerField(validators=[MinValueValidator(1)])
    subtotal = models.FloatField(blank=True, default=0)
    #trans_type = models.CharField(max_length=4, default="DOWN")
    transaction_timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-transaction_timestamp']

class Budget(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True, null=True)
    budget = models.FloatField(default=0.00)

