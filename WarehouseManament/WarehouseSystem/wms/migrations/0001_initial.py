# Generated by Django 3.2.6 on 2021-09-12 04:02

from django.conf import settings
import django.contrib.auth.models
import django.contrib.auth.validators
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('avatar', models.ImageField(blank=True, upload_to='avatar_user/%Y/%m')),
                ('address', models.CharField(max_length=255, null=True)),
                ('phone_number', models.CharField(max_length=10, null=True)),
                ('role', models.PositiveSmallIntegerField(choices=[(0, 'ADMIN'), (1, 'USER'), (2, 'SUPPLIER')], default=1)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('expire_date', models.DateTimeField()),
                ('production_date', models.DateTimeField()),
                ('mu_case', models.IntegerField(default=1, validators=[django.core.validators.MinValueValidator(1, 'Quantity MU/CASE at least 1 CASE')])),
                ('Qty_total', models.IntegerField(default=1, null=True, validators=[django.core.validators.MinValueValidator(1, 'Quantity total at least 1 CASE')])),
                ('desc', models.TextField(blank=True, null=True)),
                ('status', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='ItemTemp',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('expire_date', models.DateTimeField()),
                ('production_date', models.DateTimeField()),
                ('mu_case', models.IntegerField(default=1, validators=[django.core.validators.MinValueValidator(1, 'Quantity MU/CASE at least 1 CASE')])),
                ('desc', models.TextField(blank=True, null=True)),
                ('status', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('add_date', models.DateTimeField(auto_now_add=True)),
                ('edit_date', models.DateTimeField(auto_now=True)),
                ('status', models.BooleanField(default=True)),
            ],
            options={
                'ordering': ['-id'],
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='PO',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Qty_total', models.IntegerField(default=1, null=True, validators=[django.core.validators.MinValueValidator(1, 'Quantity total at least 1 CASE')])),
                ('effective_date', models.DateTimeField()),
                ('closed_date', models.DateTimeField(blank=True)),
                ('add_date', models.DateTimeField(auto_now_add=True)),
                ('edit_date', models.DateTimeField(auto_now=True)),
                ('active', models.BooleanField(default=True)),
                ('status', models.PositiveSmallIntegerField(choices=[(2, 'PENDING'), (1, 'ACCEPTED'), (3, 'FAILED'), (0, 'DONE')], default=2)),
                ('add_who', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='po_add_who', to=settings.AUTH_USER_MODEL)),
                ('edit_who', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='po_edit_who', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-id'],
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Receipt',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('add_date', models.DateTimeField(auto_now_add=True)),
                ('edit_date', models.DateTimeField(auto_now=True)),
                ('status', models.BooleanField(default=True)),
                ('PO', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='wms.po')),
                ('add_who', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='receipt_add_who', to=settings.AUTH_USER_MODEL)),
                ('edit_who', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='receipt_edit_who', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-id'],
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='RowLocation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=3)),
            ],
        ),
        migrations.CreateModel(
            name='SO',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Qty_total', models.IntegerField(default=1, null=True, validators=[django.core.validators.MinValueValidator(1, 'Quantity total at least 1 CASE')])),
                ('effective_date', models.DateTimeField()),
                ('closed_date', models.DateTimeField(blank=True)),
                ('add_date', models.DateTimeField(auto_now_add=True)),
                ('edit_date', models.DateTimeField(auto_now=True)),
                ('active', models.BooleanField(default=True)),
                ('status', models.PositiveSmallIntegerField(choices=[(2, 'PENDING'), (1, 'ACCEPTED'), (3, 'FAILED'), (0, 'DONE')], default=2)),
                ('add_who', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='so_add_who', to=settings.AUTH_USER_MODEL)),
                ('edit_who', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='so_edit_who', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-id'],
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Supplier',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('company_name', models.CharField(max_length=100, unique=True)),
                ('address', models.CharField(max_length=100)),
                ('phone', models.CharField(max_length=100, null=True)),
                ('email', models.CharField(max_length=100, null=True)),
                ('status', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='SODetail',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Qty_order', models.IntegerField(default=1, validators=[django.core.validators.MinValueValidator(1, 'Quantity order at least 1 CASE')])),
                ('description', models.TextField(blank=True, null=True)),
                ('status', models.BooleanField(default=True)),
                ('SO', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='wms.so')),
                ('item', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='wms.item')),
            ],
            options={
                'ordering': ['-id'],
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='so',
            name='supplier',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='wms.supplier'),
        ),
        migrations.CreateModel(
            name='ShelfFloor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('floor', models.IntegerField(default=1, validators=[django.core.validators.MinValueValidator(1, 'MIN is 1'), django.core.validators.MaxValueValidator(5, 'MAX is 5')])),
                ('row_location', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='wms.rowlocation')),
            ],
        ),
        migrations.CreateModel(
            name='ShelfColumn',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('column', models.IntegerField(default=1, validators=[django.core.validators.MinValueValidator(1, 'MIN is 1'), django.core.validators.MaxValueValidator(10, 'MAX is 10')])),
                ('row_location', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='wms.rowlocation')),
            ],
        ),
        migrations.CreateModel(
            name='ReceiptDetail',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Qty_order', models.IntegerField(default=1, null=True, validators=[django.core.validators.MinValueValidator(1, 'khong duoc duoi 1 CASE')])),
                ('Qty_just', models.IntegerField(default=1, null=True, validators=[django.core.validators.MinValueValidator(1, 'khong duoc duoi 1 CASE')])),
                ('Qty_receipt', models.IntegerField(default=1, null=True, validators=[django.core.validators.MinValueValidator(1, 'khong duoc duoi 1 CASE')])),
                ('description', models.TextField(blank=True, null=True)),
                ('status', models.BooleanField(default=True)),
                ('item', models.ManyToManyField(to='wms.Item')),
                ('receipt', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='wms.receipt')),
            ],
            options={
                'ordering': ['-id'],
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='PODetailTemp',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Qty_order', models.IntegerField(default=1, validators=[django.core.validators.MinValueValidator(1, 'Quantity order at least 1 CASE')])),
                ('description', models.TextField(blank=True, null=True)),
                ('status', models.BooleanField(default=True)),
                ('PO', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='wms.po')),
                ('item', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='wms.itemtemp')),
            ],
            options={
                'ordering': ['-id'],
            },
        ),
        migrations.CreateModel(
            name='PODetail',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Qty_order', models.IntegerField(default=1, validators=[django.core.validators.MinValueValidator(1, 'Quantity order at least 1 CASE')])),
                ('description', models.TextField(blank=True, null=True)),
                ('status', models.BooleanField(default=True)),
                ('PO', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='wms.po')),
                ('item', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='wms.item')),
            ],
            options={
                'ordering': ['-id'],
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='po',
            name='supplier',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='wms.supplier'),
        ),
        migrations.CreateModel(
            name='OrderDetail',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Qty_order', models.IntegerField(default=1, null=True, validators=[django.core.validators.MinValueValidator(1, 'khong duoc duoi 1 CASE')])),
                ('Qty_just', models.IntegerField(default=1, null=True, validators=[django.core.validators.MinValueValidator(1, 'khong duoc duoi 1 CASE')])),
                ('Qty_receipt', models.IntegerField(default=1, null=True, validators=[django.core.validators.MinValueValidator(1, 'khong duoc duoi 1 CASE')])),
                ('description', models.TextField(blank=True, null=True)),
                ('status', models.BooleanField(default=True)),
                ('item', models.ManyToManyField(to='wms.Item')),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='wms.order')),
            ],
            options={
                'ordering': ['-id'],
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='order',
            name='SO',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='wms.so'),
        ),
        migrations.AddField(
            model_name='order',
            name='add_who',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='order_add_who', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='order',
            name='edit_who',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='order_edit_who', to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('limited_qty', models.PositiveSmallIntegerField(choices=[(20, 'STORAGE'), (10, 'PICK FACE')], default=20)),
                ('status', models.BooleanField(default=True)),
                ('row_location', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='wms.rowlocation')),
                ('shelf_column', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='wms.shelfcolumn')),
                ('shelf_floor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='wms.shelffloor')),
            ],
        ),
        migrations.AddField(
            model_name='itemtemp',
            name='supplier',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='wms.supplier'),
        ),
        migrations.AddField(
            model_name='item',
            name='supplier',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='wms.supplier'),
        ),
        migrations.AddField(
            model_name='user',
            name='supplier',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='wms.supplier'),
        ),
        migrations.AddField(
            model_name='user',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions'),
        ),
        migrations.AlterUniqueTogether(
            name='itemtemp',
            unique_together={('name', 'production_date')},
        ),
        migrations.CreateModel(
            name='ItemLocation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('qty', models.IntegerField(default=1, validators=[django.core.validators.MinValueValidator(1, 'Quantity at least 1 CASE')])),
                ('status', models.BooleanField(default=True)),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='wms.item')),
                ('location', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='wms.location')),
            ],
            options={
                'unique_together': {('location', 'item')},
            },
        ),
        migrations.AlterUniqueTogether(
            name='item',
            unique_together={('name', 'production_date')},
        ),
    ]
