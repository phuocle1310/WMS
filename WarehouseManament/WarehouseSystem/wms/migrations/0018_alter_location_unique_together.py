# Generated by Django 3.2.6 on 2021-10-01 04:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('wms', '0017_auto_20211001_1100'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='location',
            unique_together={('shelf_column', 'shelf_floor', 'row_location')},
        ),
    ]
