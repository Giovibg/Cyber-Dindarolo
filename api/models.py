from django.db import models
from django.contrib.auth.models import User
#from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.

class Product(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField(blank=True, max_length=100)

    def __str__(self):
        return f'{self.name}'

class Transaction(models.Model):
    product = models.ForeignKey('Product', related_name='transactions', on_delete=models.CASCADE)
    #user = models.ForeignKey(User, on_delete=models.CASCADE)
    unit_price = models.FloatField()
    quantity = models.IntegerField()
    currency = models.CharField(max_length=3)
    transaction_timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-transaction_timestamp']

class Budget(models.Model):
    budget = models.IntegerField(default=0)
    #user = models.ForeignKey(User, on_delete=models.CASCADE)