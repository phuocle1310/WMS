from django.contrib.auth.models import AbstractUser
from django.db import models


# Create your models here.


class User(AbstractUser):
    avatar = models.CharField(max_length=500, null=True)
    supplier = models.ForeignKey("Supplier", on_delete=models.SET_NULL, null=True)
    address = models.CharField(max_length=255, null=True)
    phone_number = models.CharField(max_length=10, null=True)
    ADMIN = 1
    USER = 0
    SUPPLIER = 2
    USER_TYPE_CHOICES = (
        (ADMIN, 'ADMIN'),
        (USER, 'USER'),
        (SUPPLIER, 'SUPPLIER'),
    )

    role = models.PositiveSmallIntegerField(choices=USER_TYPE_CHOICES, default=USER)


class Supplier(models.Model):
    company_name = models.CharField(max_length=100, null=False, unique=True)
    address = models.CharField(max_length=100, null=False)
    phone = models.CharField(max_length=100, null=True)
    email = models.CharField(max_length=100, null=True)
    status = models.BooleanField(default=True)


class Item(models.Model):
    name = models.CharField(max_length=100, null=False)
    supplier = models.ForeignKey(Supplier, on_delete=models.SET_NULL, null=True)
    expire_date = models.DateTimeField()  # HSD
    production_date = models.DateTimeField()  # NSX
    mu_case = models.IntegerField(default=0, null=False)  # MU/Case
    Qty_total = models.IntegerField(default=0, null=True)
    desc = models.TextField(null=True, blank=True)
    status = models.BooleanField(default=True)


class RowLocation(models.Model):
    name = models.CharField(max_length=10, null=False, blank=False)


class ShelfColumn(models.Model):
    name = models.CharField(max_length=10, null=False, blank=False)
    row_location = models.ForeignKey(RowLocation, on_delete=models.CASCADE)


class ShelfFloor(models.Model):
    name = models.CharField(max_length=10, null=False, blank=False)
    row_location = models.ForeignKey(RowLocation, on_delete=models.CASCADE)


class Location(models.Model):
    row_location = models.ForeignKey(RowLocation, on_delete=models.CASCADE)
    shelf_column = models.ForeignKey(ShelfColumn, on_delete=models.CASCADE)
    shelf_floor = models.ForeignKey(ShelfFloor, on_delete=models.CASCADE)
    limited_qty = models.IntegerField(default=0)
    status = models.BooleanField(default=True)


class ItemLocation(models.Model):
    location = models.OneToOneField(Location, on_delete=models.CASCADE, null=False)
    item = models.ForeignKey(Item, on_delete=models.CASCADE, null=False)
    qty = models.IntegerField(default=0)
    status = models.BooleanField(default=True)

    class Meta:
        unique_together = ['location', 'item']

    # Phan tao cac PO, SO, Receipt, Order


class Request(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    created_date = models.DateTimeField(auto_now_add=True)
    Qty_total = models.IntegerField(default=0, null=True)
    status = models.BooleanField(default=True)

    class Meta:
        abstract = True
        ordering = ['-id']


class PORequest(Request):
    import_date = models.DateTimeField()


class SORequest(Request):
    release_date = models.DateTimeField()


class BasePOSO(models.Model):
    supplier = models.ForeignKey(Supplier, on_delete=models.SET_NULL, null=True)
    Qty_total = models.IntegerField(default=0, null=True)
    closed_date = models.DateTimeField(null=True)
    add_date = models.DateTimeField(auto_now_add=True)
    edit_date = models.DateTimeField(auto_now=True)
    status = models.BooleanField(default=True)

    class Meta:
        abstract = True
        ordering = ['-id']


class PO(BasePOSO):
    add_who = models.ForeignKey(User, related_name="po_add_who", on_delete=models.SET_NULL, null=True)
    edit_who = models.ForeignKey(User, related_name="po_edit_who", on_delete=models.SET_NULL, null=True)


class SO(BasePOSO):
    add_who = models.ForeignKey(User, related_name="so_add_who", on_delete=models.SET_NULL, null=True)
    edit_who = models.ForeignKey(User, related_name="so_edit_who", on_delete=models.SET_NULL, null=True)


class BasePOSODetail(models.Model):
    item = models.ManyToManyField(Item)
    Qty_order = models.IntegerField(default=0)
    description = models.TextField(null=True, blank=True)
    status = models.BooleanField(default=True)

    class Meta:
        abstract = True
        ordering = ['-id']


class PODetail(BasePOSODetail):
    PO = models.ForeignKey(PO, on_delete=models.CASCADE, null=False)


class SODetail(BasePOSODetail):
    SO = models.ForeignKey(SO, on_delete=models.CASCADE, null=False)


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


class Order(BaseReceiptOrder):
    SO = models.ForeignKey(SO, on_delete=models.CASCADE, null=False)
    add_who = models.ForeignKey(User, related_name="order_add_who", on_delete=models.SET_NULL, null=True)
    edit_who = models.ForeignKey(User, related_name="order_edit_who", on_delete=models.SET_NULL, null=True)


class BaseReceiptOrderDetail(models.Model):
    item = models.ManyToManyField(Item)
    Qty_order = models.IntegerField(default=0, null=True)
    Qty_just = models.IntegerField(default=0, null=True)
    Qty_receipt = models.IntegerField(default=0, null=True)
    description = models.TextField(null=True, blank=True)
    status = models.BooleanField(default=True)

    class Meta:
        abstract = True
        ordering = ['-id']


class ReceiptDetail(BaseReceiptOrderDetail):
    receipt = models.ForeignKey(Receipt, on_delete=models.CASCADE, null=False)


class OrderDetail(BaseReceiptOrderDetail):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, null=False)
