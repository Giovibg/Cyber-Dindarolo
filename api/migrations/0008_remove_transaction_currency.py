# Generated by Django 2.2 on 2020-10-26 18:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_auto_20201022_1806'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='transaction',
            name='currency',
        ),
    ]
