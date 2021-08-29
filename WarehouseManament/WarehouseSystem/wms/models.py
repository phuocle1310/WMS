import datetime

from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


# Create your models here.


class User(AbstractUser):
    avatar = models.ImageField(upload_to='avatar_user/%Y/%m', blank=False)
    supplier = models.ForeignKey("Supplier", on_delete=models.SET_NULL, null=True)
    address = models.CharField(max_length=255, null=True)
    phone_number = models.CharField(max_length=10, null=True)
    ADMIN = 0
    USER = 1
    SUPPLIER = 2
    USER_TYPE_CHOICES = (
        (ADMIN, 'ADMIN'),
        (USER, 'USER'),
        (SUPPLIER, 'SUPPLIER'),
    )

    role = models.PositiveSmallIntegerField(choices=USER_TYPE_CHOICES, default=USER, verbose_name='Vai trò')


class Supplier(models.Model):
    company_name = models.CharField(max_length=100, null=False, unique=True)
    address = models.CharField(max_length=100, null=False)
    phone = models.CharField(max_length=100, null=True)
    email = models.CharField(max_length=100, null=True)
    status = models.BooleanField(default=True)

    def __str__(self):
        return self.company_name


class Item(models.Model):
    name = models.CharField(max_length=100, null=False)
    supplier = models.ForeignKey(Supplier, on_delete=models.SET_NULL, null=True)
    expire_date = models.DateTimeField()  # HSD
    production_date = models.DateTimeField()  # NSX
    mu_case = models.IntegerField(default=0, null=False)  # MU/Case
    Qty_total = models.IntegerField(default=0, null=True)
    desc = models.TextField(null=True, blank=True)
    status = models.BooleanField(default=True)

    def __str__(self):
        return Item.name


class RowLocation(models.Model):
    name = models.CharField(max_length=10, null=False, blank=False)

    def __str__(self):
        return RowLocation.name


class ShelfColumn(models.Model):
    name = models.CharField(max_length=10, null=False, blank=False)
    row_location = models.ForeignKey(RowLocation, on_delete=models.CASCADE)

    def __str__(self):
        return ShelfColumn.name


class ShelfFloor(models.Model):
    name = models.CharField(max_length=10, null=False, blank=False)
    row_location = models.ForeignKey(RowLocation, on_delete=models.CASCADE)

    def __str__(self):
        return ShelfFloor.name


class Location(models.Model):
    row_location = models.ForeignKey(RowLocation, on_delete=models.CASCADE)
    shelf_column = models.ForeignKey(ShelfColumn, on_delete=models.CASCADE)
    shelf_floor = models.ForeignKey(ShelfFloor, on_delete=models.CASCADE)

    STORAGE = 20
    PICK_FACE = 10
    LOC_CHOICES = (
        (STORAGE, 'STORAGE'),
        (PICK_FACE, 'PICK FACE'),
    )

    limited_qty = models.PositiveSmallIntegerField(choices=LOC_CHOICES, default=STORAGE)
    status = models.BooleanField(default=True)

    def __str__(self):
        loc = '%s-%s-%s' % (Location.row_location, Location.shelf_floor, Location.shelf_column)
        return loc.strip()


class ItemLocation(models.Model):
    location = models.OneToOneField(Location, on_delete=models.CASCADE, null=False)
    item = models.ForeignKey(Item, on_delete=models.CASCADE, null=False)
    qty = models.IntegerField(default=1, validators=[MinValueValidator(1, 'khong duoc duoi 1 CASE')])
    status = models.BooleanField(default=True)

    def __str__(self):
        return ItemLocation.item.name

    class Meta:
        unique_together = ['location', 'item']

    # Phan tao cac PO, SO, Receipt, Order


# class Request(models.Model):
#     user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
#     created_date = models.DateTimeField(auto_now_add=True)
#     Qty_total = models.IntegerField(default=0, null=True)
#     status = models.BooleanField(default=True)
#
#     class Meta:
#         abstract = True
#         ordering = ['-id']
#
#
# class PORequest(Request):
#     import_date = models.DateTimeField()
#
#
# class SORequest(Request):
#     release_date = models.DateTimeField()


class BasePOSO(models.Model):
    supplier = models.ForeignKey(Supplier, on_delete=models.SET_NULL, null=True)
    Qty_total = models.IntegerField(default=1,validators=[MinValueValidator(1, 'khong duoc duoi 1 CASE')], null=True)
    effective_date = models.DateTimeField()
    closed_date = models.DateTimeField(null=True)
    add_date = models.DateTimeField(auto_now_add=True)
    edit_date = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)

    PENDING = 2
    ACCEPTED = 1
    FAILED = 3
    DONE = 0
    STATUS_CHOICES = (
        (PENDING, 'PENDING'),
        (ACCEPTED, 'ACCEPTED'),
        (FAILED, 'FAILED'),
        (DONE, 'DONE'),
    )

    status = models.PositiveSmallIntegerField(choices=STATUS_CHOICES, default=PENDING)

    class Meta:
        abstract = True
        ordering = ['-id']



class PO(BasePOSO):
    add_who = models.ForeignKey(User, related_name="po_add_who", on_delete=models.SET_NULL, null=True)
    edit_who = models.ForeignKey(User, related_name="po_edit_who", on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return PO.supplier.company_name


class SO(BasePOSO):
    add_who = models.ForeignKey(User, related_name="so_add_who", on_delete=models.SET_NULL, null=True)
    edit_who = models.ForeignKey(User, related_name="so_edit_who", on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return SO.supplier.company_name


class BasePOSODetail(models.Model):
    item = models.ManyToManyField(Item)
    Qty_order = models.IntegerField(default=1, validators=[MinValueValidator(1, 'khong duoc duoi 1 CASE')])
    description = models.TextField(null=True, blank=True)
    status = models.BooleanField(default=True)

    class Meta:
        abstract = True
        ordering = ['-id']


class PODetail(BasePOSODetail):
    PO = models.ForeignKey(PO, on_delete=models.CASCADE, null=False)

    def __str__(self):
        str_po_detail = '%s: %s--%s' % (PO.supplier.company_name, self.item, self.Qty_order)
        return str_po_detail


class SODetail(BasePOSODetail):
    SO = models.ForeignKey(SO, on_delete=models.CASCADE, null=False)

    def __str__(self):
        str_so_detail = '%s: %s--%s' % (SO.supplier.company_name, self.item, self.Qty_order)
        return str_so_detail


class BaseReceiptOrder(models.Model):
    add_date = models.DateTimeField(auto_now_add=True)
    edit_date = models.DateTimeField(auto_now=True)
    status = models.BooleanField(default=True)

    class Meta:
        abstract = True
        ordering = ['-id']


class Receipt(BaseReceiptOrder):
    PO = models.ForeignKey(PO, on_delete=models.CASCADE, null=False)
    add_who = models.ForeignKey(User, related_name="receipt_add_who", on_delete=models.SET_NULL, null=True)
    edit_who = models.ForeignKey(User, related_name="receipt_edit_who", on_delete=models.SET_NULL, null=True)

    def __str__(self):
        str_receipt = '%s - %s' % (PO.supplier.company_name, self.add_date)
        return str_receipt


class Order(BaseReceiptOrder):
    SO = models.ForeignKey(SO, on_delete=models.CASCADE, null=False)
    add_who = models.ForeignKey(User, related_name="order_add_who", on_delete=models.SET_NULL, null=True)
    edit_who = models.ForeignKey(User, related_name="order_edit_who", on_delete=models.SET_NULL, null=True)

    def __str__(self):
        str_order = '%s - %s' % (SO.supplier.company_name, self.add_date)
        return str_order


class BaseReceiptOrderDetail(models.Model):
    item = models.ManyToManyField(Item)
    Qty_order = models.IntegerField(default=1, validators=[MinValueValidator(1, 'khong duoc duoi 1 CASE')], null=True)
    Qty_just = models.IntegerField(default=1, validators=[MinValueValidator(1, 'khong duoc duoi 1 CASE')], null=True)
    Qty_receipt = models.IntegerField(default=1, validators=[MinValueValidator(1, 'khong duoc duoi 1 CASE')], null=True)
    description = models.TextField(null=True, blank=True)
    status = models.BooleanField(default=True)

    class Meta:
        abstract = True
        ordering = ['-id']


class ReceiptDetail(BaseReceiptOrderDetail):
    receipt = models.ForeignKey(Receipt, on_delete=models.CASCADE, null=False)

    def __str__(self):
        return ReceiptDetail.item


class OrderDetail(BaseReceiptOrderDetail):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, null=False)

    def __str__(self):
        return ReceiptDetail.item
