# Generated by Django 2.2 on 2020-10-22 17:22

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_auto_20201022_1720'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transaction',
            name='unit_price',
            field=models.FloatField(default=0.01, validators=[django.core.validators.MinValueValidator(0.01)]),
        ),
    ]