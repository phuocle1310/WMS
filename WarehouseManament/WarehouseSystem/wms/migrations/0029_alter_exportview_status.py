# Generated by Django 3.2.6 on 2021-10-06 17:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wms', '0028_alter_exportview_to_location'),
    ]

    operations = [
        migrations.AlterField(
            model_name='exportview',
            name='status',
            field=models.PositiveSmallIntegerField(choices=[(0, 'ALLOCATED'), (1, 'PICKED'), (2, 'SORTED')], default=0),
        ),
    ]
