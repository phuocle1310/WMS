# Generated by Django 3.2.6 on 2021-09-12 09:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wms', '0009_auto_20210912_1628'),
    ]

    operations = [
        migrations.AlterField(
            model_name='po',
            name='closed_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='so',
            name='closed_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
