# Generated by Django 3.2.6 on 2021-09-22 01:08

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wms', '0003_auto_20210920_2157'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='Qty_total',
            field=models.IntegerField(default=1, null=True, validators=[django.core.validators.MinValueValidator(0, 'Quantity total at least 0 CASE')]),
        ),
    ]
