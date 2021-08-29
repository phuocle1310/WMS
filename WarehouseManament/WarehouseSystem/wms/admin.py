from django.contrib import admin
from django.contrib.auth.models import Permission
from django.utils.safestring import mark_safe

from .models import *
# Register your models here.


class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'username', 'full_name', 'role', 'avatar_show', 'is_active']
    list_filter = ['role']
    search_fields = ['username', 'last_name', 'first_name']

    def full_name(self, user):
        full_name = '%s %s' %(user.first_name, user.last_name)
        return full_name.strip()
    full_name.short_description = 'Full Name'

    def avatar_show(self, user):
        return mark_safe("<img src='{img_url}' width='100' />".format(img_url=user.avatar.url))
    avatar_show.short_description = 'Ảnh đại diện'
    User.username.short_description = 'tên tk'


class POAdmin(admin.ModelAdmin):
    pass


class SOAdmin(admin.ModelAdmin):
    pass


class PODetailAdmin(admin.ModelAdmin):
    pass


class SODetailAdmin(admin.ModelAdmin):
    pass


class SupplierAdmin(admin.ModelAdmin):
    pass


class ItemAdmin(admin.ModelAdmin):
    pass


class RowLocationAdmin(admin.ModelAdmin):
    pass


class ShelfColumnAdmin(admin.ModelAdmin):
    pass


class ShelfFloorAdmin(admin.ModelAdmin):
    pass


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