# Generated by Django 3.2.6 on 2021-10-03 09:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('wms', '0022_exportview_importview'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='importview',
            name='PO',
        ),
        migrations.RemoveField(
            model_name='importview',
            name='item',
        ),
        migrations.RemoveField(
            model_name='importview',
            name='location',
        ),
        migrations.DeleteModel(
            name='ExportView',
        ),
        migrations.DeleteModel(
            name='ImportView',
        ),
    ]