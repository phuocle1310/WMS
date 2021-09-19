import datetime

from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


# Create your models here.


class User(AbstractUser):
    avatar = models.ImageField(upload_to='avatar_user/%Y/%m', blank=True)
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

    role = models.PositiveSmallIntegerField(choices=USER_TYPE_CHOICES, default=USER)

    def save(self, *args, **kwargs):
        super(User, self).save(*args, **kwargs)
        self.set_password(self.password)
        if self.is_superuser:
            self.role = self.ADMIN
        if self.role == self.ADMIN:
            self.is_superuser = True
            self.is_staff = True
        else:
            self.is_superuser = False
            self.is_staff = False



class Supplier(models.Model):
    company_name = models.CharField(max_length=100, null=False, unique=True)
    address = models.CharField(max_length=100, null=False)
    phone = models.CharField(max_length=20, null=True)
    email = models.CharField(max_length=100, null=True)
    status = models.BooleanField(default=True)

    def __str__(self):
        return self.company_name

    # def clean(self):
    #     suplier = Supplier.objects.filter(company_name=self.company_name)
    #     if suplier is not None:
    #         raise ValidationError({'company_name': 'Company name is exist'})


class Item(models.Model):
    name = models.CharField(max_length=100, null=False)
    unit = models.CharField(max_length=10, null=False)
    supplier = models.ForeignKey(Supplier, on_delete=models.SET_NULL, null=True)
    expire_date = models.DateField()  # HSD
    production_date = models.DateField()  # NSX
    mu_case = models.IntegerField(default=1, null=False,
                                  validators=[MinValueValidator(1, 'Quantity MU/CASE at least 1 CASE')])  # MU/Case
    Qty_total = models.IntegerField(default=1, null=True,
                                    validators=[MinValueValidator(1, 'Quantity total at least 1 CASE')])
    desc = models.TextField(null=True, blank=True)
    status = models.BooleanField(default=True)

    class Meta:
        unique_together = ['name', 'production_date']

    def __str__(self):
        return self.name

    def clean(self):
        if self.expire_date is not None or self.production_date is not None:
            if self.expire_date < self.production_date:
                # Nếu ko chỉ đỉnh trường nào thì nó sẽ raise trên cùng
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
    Qty_total = models.IntegerField(default=1, validators=[MinValueValidator(1, 'Quantity total at least 1 CASE')],
                                    null=False)
    effective_date = models.DateField()
    closed_date = models.DateField(blank=True, null=True)
    add_date = models.DateField(auto_now_add=True)
    edit_date = models.DateField(auto_now=True)
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

    def clean(self):
        if self.closed_date is not None and self.effective_date is not None:
            if self.closed_date <= self.effective_date:
                # Nếu ko chỉ định trường nào thì nó sẽ raise trên cùng
                raise ValidationError({'closed_date': 'Close date can be < Effective date'})
        if self.status == 0:
            if self.closed_date is None:
                raise ValidationError({'closed_date': 'SO\'s status was done, so close date can be null'})

    def __str__(self):
        return '%s -- %s' % (self.supplier.company_name, self.add_date)


class PO(BasePOSO):
    add_who = models.ForeignKey(User, related_name="po_add_who", on_delete=models.SET_NULL, null=True)
    edit_who = models.ForeignKey(User, related_name="po_edit_who", on_delete=models.SET_NULL, null=True)


class SO(BasePOSO):
    add_who = models.ForeignKey(User, related_name="so_add_who", on_delete=models.SET_NULL, null=True)
    edit_who = models.ForeignKey(User, related_name="so_edit_who", on_delete=models.SET_NULL, null=True)


class ItemTemp(models.Model):
    name = models.CharField(max_length=100, null=False)
    supplier = models.ForeignKey(Supplier, on_delete=models.SET_NULL, null=True)
    expire_date = models.DateField()  # HSD
    production_date = models.DateField()  # NSX
    mu_case = models.IntegerField(default=1, null=False,
                                  validators=[MinValueValidator(1, 'Quantity MU/CASE at least 1 CASE')])  # MU/Case
    desc = models.TextField(null=True, blank=True)
    status = models.BooleanField(default=True)

    class Meta:
        unique_together = ['name', 'production_date']

    def __str__(self):
        return self.name

    def clean(self):
        if self.expire_date is not None or self.production_date is not None:
            if self.expire_date <= self.production_date:
                # Nếu ko chỉ đỉnh trường nào thì nó sẽ raise trên cùng
                raise ValidationError({'expire_date': 'Expire date can be < Production date'})


class PODetailTemp(models.Model):
    PO = models.ForeignKey(PO, on_delete=models.CASCADE, null=False)
    item = models.ForeignKey(ItemTemp, on_delete=models.SET_NULL, null=True)
    Qty_order = models.IntegerField(default=1, validators=[MinValueValidator(1, 'Quantity order at least 1 CASE')])
    description = models.TextField(null=True, blank=True)
    status = models.BooleanField(default=True)

    class Meta:
        ordering = ['-id']


class BasePOSODetail(models.Model):
    item = models.ForeignKey(Item, on_delete=models.SET_NULL, null=True)
    Qty_order = models.IntegerField(default=1, validators=[MinValueValidator(1, 'Quantity order at least 1 CASE')])
    description = models.TextField(null=True, blank=True)
    status = models.BooleanField(default=True)

    class Meta:
        abstract = True
        ordering = ['-id']

    def __str__(self):
        str_po_detail = '%s--%s' % (self.item, self.Qty_order)
        return str_po_detail


class PODetail(BasePOSODetail):
    PO = models.ForeignKey(PO, on_delete=models.CASCADE, null=False)

    class Meta:
        unique_together = ['PO', 'item']


class SODetail(BasePOSODetail):
    SO = models.ForeignKey(SO, on_delete=models.CASCADE, null=False)

    class Meta:
        unique_together = ['SO', 'item']


class BaseReceiptOrder(models.Model):
    add_date = models.DateField(auto_now_add=True)
    edit_date = models.DateField(auto_now=True)
    status = models.BooleanField(default=True)

    class Meta:
        abstract = True
        ordering = ['-id']


class Receipt(BaseReceiptOrder):
    PO = models.ForeignKey(PO, on_delete=models.CASCADE, null=False)
    add_who = models.ForeignKey(User, related_name="receipt_add_who", on_delete=models.SET_NULL, null=True)
    edit_who = models.ForeignKey(User, related_name="receipt_edit_who", on_delete=models.SET_NULL, null=True)

    def __str__(self):
        str_receipt = '%s - %s' % (self.supplier.company_name, self.add_date)
        return str_receipt


class Order(BaseReceiptOrder):
    SO = models.ForeignKey(SO, on_delete=models.CASCADE, null=False)
    add_who = models.ForeignKey(User, related_name="order_add_who", on_delete=models.SET_NULL, null=True)
    edit_who = models.ForeignKey(User, related_name="order_edit_who", on_delete=models.SET_NULL, null=True)

    def __str__(self):
        str_order = '%s - %s' % (self.supplier.company_name, self.add_date)
        return str_order


class BaseReceiptOrderDetail(models.Model):
    item = models.ForeignKey(Item, on_delete=models.SET_NULL, null=True)
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

    class Meta:
        unique_together = ['receipt', 'item']


class OrderDetail(BaseReceiptOrderDetail):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, null=False)

    def __str__(self):
        return ReceiptDetail.item

    class Meta:
        unique_together = ['order', 'item']
