from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.


class User(AbstractUser):
    avatar = models.CharField(max_length=500, null=True)


class Supplier(models.Model):
    company_name = models.CharField(max_length=100, null=False, unique=True)
    address = models.CharField(max_length=100, null=False)
    phone = models.CharField(max_length=100, null=True)
    email = models.CharField(max_length=100, null=True)
    status = models.BooleanField(default=True)


class Item(models.Model):
    name = models.CharField(max_length=100, null=False)
    supplier = models.ForeignKey(Supplier, on_delete=models.SET_NULL, null=True)
    expire_date = models.DateTimeField()        # HSD
    production_date = models.DateTimeField()    # NSX
    mu_case = models.IntegerField(default=0, null=False)    # MU/Case
    Qty_total = models.IntegerField(default=0, null=True)
    desc = models.TextField(null=True, blank=True)
    status = models.BooleanField(default=True)


class PORequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    created_date = models.DateTimeField(auto_now_add=True)
    Qty_total = models.IntegerField(default=0, null=True)
    import_date = models.DateTimeField()
    status = models.BooleanField(default=True)


class PO(models.Model):
    supplier = models.ForeignKey(Supplier, on_delete=models.SET_NULL, null=True)
    Qty_total = models.IntegerField(default=0, null=True)
    created_date = models.DateTimeField()
    add_date = models.DateTimeField(auto_now_add=True)
    add_who = models.ForeignKey(User, related_name="add_who", on_delete=models.SET_NULL, null=True)
    edit_date = models.DateTimeField(auto_now_add=True)
    edit_who = models.ForeignKey(User, related_name="edit_who", on_delete=models.SET_NULL, null=True)
    status = models.BooleanField(default=True)


class PODetail(models.Model):
    PO = models.ForeignKey(PO, on_delete=models.CASCADE, null=False)
    item = models.ManyToManyField(Item, null=False, blank=False)
    Qty_order = models.IntegerField(default=0)
    Qty_just = models.IntegerField(default=0)
    Qty_Receipt = models.IntegerField(default=0)
    desc = models.TextField(null=True, blank=True)
    status = models.BooleanField(default=True)



