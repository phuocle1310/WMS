# Generated by Django 3.2.6 on 2021-09-19 15:36

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('wms', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='supplier',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='supplier', to=settings.AUTH_USER_MODEL),
        ),
    ]
