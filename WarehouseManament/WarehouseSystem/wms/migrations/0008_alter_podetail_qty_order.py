# Generated by Django 3.2.6 on 2021-09-22 04:20

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wms', '0007_auto_20210922_1059'),
    ]

    operations = [
        migrations.AlterField(
            model_name='podetail',
            name='Qty_order',
            field=models.IntegerField(default=1, validators=[django.core.validators.MinValueValidator(0, 'Quantity order must greater or equal than 1')]),
        ),
    ]
