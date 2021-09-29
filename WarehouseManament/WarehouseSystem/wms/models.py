import datetime

from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from datetime import date

# Create your models here.


class User(AbstractUser):
    avatar = models.ImageField(upload_to='avatar_user/%Y/%m', blank=True)
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

    role = models.PositiveSmallIntegerField(choices=USER_TYPE_CHOICES, default=ADMIN)

    def save(self, *args, **kwargs):
        self.set_password(self.password)
        super(User, self).save(*args, **kwargs)
        # self.set_password(self.password)
        # if self.is_superuser:
        #     self.role = self.ADMIN
        # if self.role == self.ADMIN:
        #     self.is_superuser = True
        #     self.is_staff = True
        # else:
        #     self.is_superuser = False
        #     self.is_staff = False


class Supplier(models.Model):
    company_name = models.CharField(max_length=100, null=False, unique=True)
    user = models.OneToOneField(User, related_name="supplier", on_delete=models.CASCADE, null=False)
    address = models.CharField(max_length=100, null=False)
    phone = models.CharField(max_length=20, null=True)
    email = models.CharField(max_length=100, null=True)
    status = models.BooleanField(default=True)

    def __str__(self):
        return self.company_name


class Item(models.Model):
    name = models.CharField(max_length=100, null=False)
    unit = models.CharField(max_length=10, null=False)
    supplier = models.ForeignKey(Supplier, on_delete=models.SET_NULL, null=True)
    expire_date = models.DateField()  # HSD
    production_date = models.DateField()  # NSX
    mu_case = models.IntegerField(default=1, null=False,
                                  validators=[MinValueValidator(1, 'Quantity MU/CASE must greater than or equal')])  # MU/Case
    Qty_total = models.IntegerField(default=0, null=True,
                                    validators=[MinValueValidator(0, 'Quantity total must greater than 0')])
    status = models.BooleanField(default=True)

    class Meta:
        unique_together = ['name', 'production_date']

    def __str__(self):
        return self.name +"      " +str(self.production_date)

    def clean(self):
        if self.expire_date is not None or self.production_date is not None:
            if self.expire_date < self.production_date:
                raise ValidationError({'expire_date': 'Expire date can be < Production date'})


class RowLocation(models.Model):
    name = models.CharField(max_length=3, null=False, blank=False)
    status = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class ShelfColumn(models.Model):
    column = models.IntegerField(default=1, null=False, blank=False, validators=[MinValueValidator(1, 'MIN is 1'),
                                                                                 MaxValueValidator(10, 'MAX is 10')])
    row_location = models.ForeignKey(RowLocation, on_delete=models.CASCADE)

    def __str__(self):
        return '%s-%d' % (self.row_location.name, self.column)

    def clean(self):
        column = ShelfColumn.objects.filter(column=self.column, row_location__name=self.row_location.name)
        err_msg = 'Column %s-%d is exist' % (self.row_location, self.column)
        if column is not None:
            raise ValidationError({'column': err_msg})


class ShelfFloor(models.Model):
    floor = models.IntegerField(default=1, null=False, blank=False, validators=[MinValueValidator(1, 'MIN is 1'),
                                                                                MaxValueValidator(5, 'MAX is 5')])
    row_location = models.ForeignKey(RowLocation, on_delete=models.CASCADE)

    def __str__(self):
        return '%s-%d' % (self.row_location.name, self.floor)


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
    qty = models.IntegerField(default=1, validators=[MinValueValidator(1, 'Quantity at least 1 CASE')])
    status = models.BooleanField(default=True)

    class Meta:
        unique_together = ['location', 'item']

    def __str__(self):
        return self.item.name


# Phan tao cac PO, SO, Receipt, Order


class BasePOSO(models.Model):
    supplier = models.ForeignKey(Supplier, on_delete=models.SET_NULL, null=True, blank=False)
    effective_date = models.DateField()
    # closed_date = models.DateField(blank=True, null=True)
    add_date = models.DateTimeField(auto_now_add=True)
    edit_date = models.DateTimeField(auto_now=True)
    description = models.TextField(null=True, blank=True)

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

    # def clean(self):
    #     if self.closed_date is not None and self.effective_date is not None:
    #         if self.closed_date.date() <= self.effective_date.date():
    #             raise ValidationError({'closed_date': 'Close date can be < Effective date'})
        # if self.status == 0:
        #     if self.closed_date is None:
        #         raise ValidationError({'closed_date': 'SO\'s status was done, so close date can be null'})

    def __str__(self):
        return '%d -- %s' % (self.id, self.supplier.user.first_name)


class PO(BasePOSO):
    add_who = models.ForeignKey(User, related_name="po_add_who", on_delete=models.SET_NULL, null=True)
    edit_who = models.ForeignKey(User, related_name="po_edit_who", on_delete=models.SET_NULL, null=True)


class SO(BasePOSO):
    add_who = models.ForeignKey(User, related_name="so_add_who", on_delete=models.SET_NULL, null=True)
    edit_who = models.ForeignKey(User, related_name="so_edit_who", on_delete=models.SET_NULL, null=True)


class BasePOSODetail(models.Model):
    Qty_order = models.IntegerField(default=1, validators=[MinValueValidator(1, 'Quantity order must greater or equal than 1')])
    status = models.BooleanField(default=True)

    class Meta:
        abstract = True
        ordering = ['-id']

    def __str__(self):
        str_po_detail = '%s--%s' % (self.item, self.Qty_order)
        return str_po_detail


class PODetail(BasePOSODetail):
    item = models.ForeignKey(Item, related_name="podetail", on_delete=models.SET_NULL, null=True)
    PO = models.ForeignKey(PO, related_name="podetail", on_delete=models.CASCADE, null=False)

    class Meta:
        unique_together = ['PO', 'item']


class SODetail(BasePOSODetail):
    item = models.ForeignKey(Item, related_name="sodetail", on_delete=models.SET_NULL, null=True)
    SO = models.ForeignKey(SO, related_name="sodetail", on_delete=models.CASCADE, null=False)

    class Meta:
        unique_together = ['SO', 'item']


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
        str_receipt = '%s - %s' % (self.add_who.first_name, self.add_date)
        return str_receipt


class Order(BaseReceiptOrder):
    SO = models.ForeignKey(SO, on_delete=models.CASCADE, null=False)
    add_who = models.ForeignKey(User, related_name="order_add_who", on_delete=models.SET_NULL, null=True)
    edit_who = models.ForeignKey(User, related_name="order_edit_who", on_delete=models.SET_NULL, null=True)

    def __str__(self):
        str_order = '%s - %s' % (self.add_who.first_name, self.add_date)
        return str_order


class BaseReceiptOrderDetail(models.Model):
    item = models.ForeignKey(Item, on_delete=models.SET_NULL, null=True)
    Qty_receipt = models.IntegerField(default=0, validators=[MinValueValidator(0, 'Quantity just must greater than or equal 0')], null=True)
    status = models.BooleanField(default=True)

    class Meta:
        abstract = True
        ordering = ['-id']


class ReceiptDetail(BaseReceiptOrderDetail):
    receipt = models.ForeignKey(Receipt, related_name="receiptdetail", on_delete=models.CASCADE, null=False)

    def __str__(self):
        return self.item.name

    class Meta:
        unique_together = ['receipt', 'item']


class OrderDetail(BaseReceiptOrderDetail):
    order = models.ForeignKey(Order, related_name="orderdetail", on_delete=models.CASCADE, null=False)

    def __str__(self):
        return self.item.name

    class Meta:
        unique_together = ['order', 'item']
