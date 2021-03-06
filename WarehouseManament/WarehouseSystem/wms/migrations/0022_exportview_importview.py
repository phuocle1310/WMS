# Generated by Django 3.2.6 on 2021-10-03 08:51

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('wms', '0021_alter_itemlocation_location'),
    ]

    operations = [
        migrations.CreateModel(
            name='ImportView',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('qty', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0, 'Quantity just must greater than or equal 0')])),
                ('PO', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='import_view', to='wms.po')),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='import_view', to='wms.item')),
                ('location', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='import_view', to='wms.location')),
            ],
        ),
        migrations.CreateModel(
            name='ExportView',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('qty', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0, 'Quantity just must greater than or equal 0')])),
                ('SO', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='export_view', to='wms.so')),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='export_view', to='wms.item')),
                ('location', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='export_view', to='wms.location')),
            ],
        ),
    ]
