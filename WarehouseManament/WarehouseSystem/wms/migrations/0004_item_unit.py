# Generated by Django 3.2.6 on 2021-09-12 08:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wms', '0003_alter_supplier_phone'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='unit',
            field=models.CharField(default='Chai', max_length=10),
        ),
    ]
