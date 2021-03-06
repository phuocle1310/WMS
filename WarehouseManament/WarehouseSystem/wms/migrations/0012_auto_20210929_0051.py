# Generated by Django 3.2.6 on 2021-09-28 17:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wms', '0011_auto_20210927_0124'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='add_date',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='edit_date',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='po',
            name='add_date',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='po',
            name='closed_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='po',
            name='edit_date',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='po',
            name='effective_date',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='receipt',
            name='add_date',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='receipt',
            name='edit_date',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='so',
            name='add_date',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='so',
            name='closed_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='so',
            name='edit_date',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='so',
            name='effective_date',
            field=models.DateTimeField(),
        ),
    ]
