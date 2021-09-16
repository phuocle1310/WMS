from django.contrib import admin
from django.contrib.auth.models import Permission
from django.utils.safestring import mark_safe

from .models import *


# Register your models here.


class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'username', 'full_name', 'role', 'avatar_show', 'is_active']
    list_filter = ['role']
    search_fields = ['username', 'last_name', 'first_name']
    exclude = ['last_login', 'is_staff', 'date_joined', 'is_superuser']

    def full_name(self, user):
        full_name = User.get_full_name(self=user)
        return full_name.strip()

    full_name.short_description = 'Full Name'

    def avatar_show(self, user):
        if user.avatar is None or user.avatar == '':
            return 'User hasn\'t avatar'
        else:
            return mark_safe("<img src='{img_url}' width='100' />".format(img_url=user.avatar.url))

    avatar_show.short_description = 'Avatar'


class POAdmin(admin.ModelAdmin):
    list_display = ['id', 'supplier', 'effective_date', 'status']


class SOAdmin(admin.ModelAdmin):
    list_display = ['id', 'supplier', 'effective_date', 'status']


class PODetailAdmin(admin.ModelAdmin):
    pass


class SODetailAdmin(admin.ModelAdmin):
    pass


class SupplierAdmin(admin.ModelAdmin):
    list_display = ['id', 'company_name', 'address', 'phone', 'email', 'status']


class ItemAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'supplier', 'mu_case', 'Qty_total', 'status']


class RowLocationAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']


class ShelfColumnAdmin(admin.ModelAdmin):
    list_display = ['id', 'column', 'row_location']
    list_filter = ['row_location']


class ShelfFloorAdmin(admin.ModelAdmin):
    list_display = ['id', 'floor', 'row_location']
    list_filter = ['row_location']


class LocationAdmin(admin.ModelAdmin):
    pass


class ItemLocationAdmin(admin.ModelAdmin):
    pass


class ReceiptAdmin(admin.ModelAdmin):
    pass


class ReceiptDetailAdmin(admin.ModelAdmin):
    pass


class OrderAdmin(admin.ModelAdmin):
    pass


class OrderDetailAdmin(admin.ModelAdmin):
    pass


admin.site.register(Permission)
admin.site.register(User, UserAdmin)
admin.site.register(PO, POAdmin)
admin.site.register(SO, SOAdmin)
admin.site.register(PODetail, PODetailAdmin)
admin.site.register(SODetail, SODetailAdmin)
admin.site.register(Supplier, SupplierAdmin)
admin.site.register(Item, ItemAdmin)
admin.site.register(RowLocation, RowLocationAdmin)
admin.site.register(ShelfColumn, ShelfColumnAdmin)
admin.site.register(ShelfFloor, ShelfFloorAdmin)
admin.site.register(Location, LocationAdmin)
admin.site.register(ItemLocation, ItemLocationAdmin)
admin.site.register(Receipt, ReceiptAdmin)
admin.site.register(ReceiptDetail, ReceiptDetailAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderDetail, OrderDetailAdmin)
