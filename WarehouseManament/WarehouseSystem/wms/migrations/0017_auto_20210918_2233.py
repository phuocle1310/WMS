# Generated by Django 3.2.6 on 2021-09-18 15:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('wms', '0016_auto_20210918_1904'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='orderdetail',
            options={},
        ),
        migrations.AlterModelOptions(
            name='podetail',
            options={},
        ),
        migrations.AlterModelOptions(
            name='receiptdetail',
            options={},
        ),
        migrations.AlterModelOptions(
            name='sodetail',
            options={},
        ),
        migrations.AddField(
            model_name='orderdetail',
            name='item',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='wms.item'),
        ),
        migrations.AddField(
            model_name='receiptdetail',
            name='item',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='wms.item'),
        ),
        migrations.AlterUniqueTogether(
            name='orderdetail',
            unique_together={('order', 'item')},
        ),
        migrations.AlterUniqueTogether(
            name='podetail',
            unique_together={('PO', 'item')},
        ),
        migrations.AlterUniqueTogether(
            name='receiptdetail',
            unique_together={('receipt', 'item')},
        ),
        migrations.AlterUniqueTogether(
            name='sodetail',
            unique_together={('SO', 'item')},
        ),
        migrations.RemoveField(
            model_name='orderdetail',
            name='item',
        ),
        migrations.RemoveField(
            model_name='receiptdetail',
            name='item',
        ),
    ]