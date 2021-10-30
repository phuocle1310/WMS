import oauth2_provider.models
from django.contrib import admin
from django.contrib.auth.models import Permission, Group
from django.utils.safestring import mark_safe

from .models import *


# Register your models here.


class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'username', 'full_name', 'role', 'avatar_show', 'is_active']
    list_filter = ['role', 'is_active']
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
    list_display = ['id', 'supplier', 'effective_date', 'add_date', 'edit_date', 'add_who', 'edit_who', 'status']
    list_filter = ['supplier', 'effective_date', 'status']
    search_fields = ['supplier', 'effective_date', 'status']


class SOAdmin(admin.ModelAdmin):
    list_display = ['id', 'supplier', 'effective_date', 'add_date', 'edit_date', 'add_who', 'edit_who', 'status']
    list_filter = ['supplier', 'effective_date', 'status']
    search_fields = ['supplier', 'effective_date', 'status']


class PODetailAdmin(admin.ModelAdmin):
    list_display = ['id', 'PO', 'item', 'Qty_order', 'status']
    list_filter = ['item', 'status']
    search_fields = ['PO', 'item', 'Qty_order', 'status']


class SODetailAdmin(admin.ModelAdmin):
    list_display = ['id', 'SO', 'item', 'Qty_order', 'status']
    list_filter = ['item', 'status']
    search_fields = ['SO', 'item', 'Qty_order', 'status']


class SupplierAdmin(admin.ModelAdmin):
    list_display = ['id', 'company_name', 'user', 'address', 'phone', 'email', 'status']
    list_filter = ['company_name', 'user', 'status']
    search_fields = ['company_name', 'user', 'address', 'phone', 'email', 'status']


class ItemAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'supplier', 'unit', 'mu_case', 'Qty_total', 'expire_date', 'production_date',
                    'status']
    list_filter = ['supplier', 'unit', 'expire_date', 'production_date', 'status']
    search_fields = ['name', 'supplier', 'unit', 'mu_case', 'Qty_total', 'expire_date', 'production_date', 'status']


class RowLocationAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'status']
    list_filter = ['name', 'status']
    search_fields = ['name', 'status']


class ShelfColumnAdmin(admin.ModelAdmin):
    list_display = ['id', 'column', 'row_location']
    list_filter = ['column', 'row_location']
    search_fields = ['column', 'row_location']


class ShelfFloorAdmin(admin.ModelAdmin):
    list_display = ['id', 'floor', 'row_location']
    list_filter = ['floor', 'row_location']
    search_fields = ['floor', 'row_location']


class LocationAdmin(admin.ModelAdmin):
    list_display = ['id', 'row_location', 'shelf_column', 'shelf_floor', 'limited_qty', 'status']
    list_filter = ['row_location', 'shelf_column', 'shelf_floor', 'limited_qty', 'status']
    search_fields = ['row_location', 'shelf_column', 'shelf_floor', 'limited_qty', 'status']


class ItemLocationAdmin(admin.ModelAdmin):
    list_display = ['id', 'location', 'item', 'qty', 'status']
    list_filter = ['location', 'item', 'status']
    search_fields = ['location', 'item', 'qty', 'status']


class ReceiptAdmin(admin.ModelAdmin):
    list_display = ['id', 'PO', 'add_who', 'edit_who', 'add_date', 'edit_date', 'status']
    list_filter = ['add_who', 'edit_who', 'status']
    search_fields = ['PO', 'add_who', 'edit_who', 'add_date', 'edit_date', 'status']


class ReceiptDetailAdmin(admin.ModelAdmin):
    list_display = ['id', 'receipt', 'item', 'Qty_receipt', 'status']
    list_filter = ['receipt', 'item', 'status']
    search_fields = ['receipt', 'item', 'Qty_receipt', 'status']


class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'SO', 'add_who', 'edit_who', 'add_date', 'edit_date', 'status']
    list_filter = ['add_who', 'edit_who', 'status']
    search_fields = ['SO', 'add_who', 'edit_who', 'add_date', 'edit_date', 'status']


class OrderDetailAdmin(admin.ModelAdmin):
    list_display = ['id', 'order', 'item', 'Qty_receipt', 'status']
    list_filter = ['order', 'item', 'status']
    search_fields = ['order', 'item', 'Qty_receipt', 'status']


class ImportAdmin(admin.ModelAdmin):
    list_display = ['id', 'PO', 'item', 'location', 'qty', 'add_date', 'status']
    list_filter = ['item', 'location', 'status']
    search_fields = ['PO', 'item', 'location', 'qty', 'add_date', 'status']


class ExportAdmin(admin.ModelAdmin):
    list_display = ['id', 'SO', 'item', 'from_location', 'to_location', 'qty', 'add_date', 'status']
    list_filter = ['item', 'from_location', 'to_location', 'status']
    search_fields = ['SO', 'item', 'from_location', 'to_location', 'qty', 'add_date', 'status']


# admin.site.register(Permission)
# admin.site.register(User, UserAdmin)
# admin.site.register(PO, POAdmin)
# admin.site.register(SO, SOAdmin)
# admin.site.register(PODetail, PODetailAdmin)
# admin.site.register(SODetail, SODetailAdmin)
# admin.site.register(Supplier, SupplierAdmin)
# admin.site.register(Item, ItemAdmin)
# admin.site.register(RowLocation, RowLocationAdmin)
# admin.site.register(ShelfColumn, ShelfColumnAdmin)
# admin.site.register(ShelfFloor, ShelfFloorAdmin)
# admin.site.register(Location, LocationAdmin)
# admin.site.register(ItemLocation, ItemLocationAdmin)
# admin.site.register(Receipt, ReceiptAdmin)
# admin.site.register(ReceiptDetail, ReceiptDetailAdmin)
# admin.site.register(Order, OrderAdmin)
# admin.site.register(OrderDetail, OrderDetailAdmin)
# admin.site.register(ImportView, ImportAdmin)
# admin.site.register(ExportView, ExportAdmin)


class WMSAppAdminSite(admin.AdminSite):
    site_header = 'HỆ THỐNG QUẢN LÝ KHO HÀNG'


admin_site = WMSAppAdminSite('WMS')

admin_site.register(Group)
admin_site.register(Permission)
admin_site.register(User, UserAdmin)
admin_site.register(PO, POAdmin)
admin_site.register(SO, SOAdmin)
admin_site.register(PODetail, PODetailAdmin)
admin_site.register(SODetail, SODetailAdmin)
admin_site.register(Supplier, SupplierAdmin)
admin_site.register(Item, ItemAdmin)
admin_site.register(RowLocation, RowLocationAdmin)
admin_site.register(ShelfColumn, ShelfColumnAdmin)
admin_site.register(ShelfFloor, ShelfFloorAdmin)
admin_site.register(Location, LocationAdmin)
admin_site.register(ItemLocation, ItemLocationAdmin)
admin_site.register(Receipt, ReceiptAdmin)
admin_site.register(ReceiptDetail, ReceiptDetailAdmin)
admin_site.register(Order, OrderAdmin)
admin_site.register(OrderDetail, OrderDetailAdmin)
admin_site.register(ImportView, ImportAdmin)
admin_site.register(ExportView, ExportAdmin)

# OAUTH2 REGISTER
from oauth2_provider.models import (
    get_access_token_admin_class,
    get_access_token_model,
    get_application_admin_class,
    get_application_model,
    get_grant_admin_class,
    get_grant_model,
    get_id_token_admin_class,
    get_id_token_model,
    get_refresh_token_admin_class,
    get_refresh_token_model,
)


class ApplicationAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "user", "client_type", "authorization_grant_type")
    list_filter = ("client_type", "authorization_grant_type", "skip_authorization")
    radio_fields = {
        "client_type": admin.HORIZONTAL,
        "authorization_grant_type": admin.VERTICAL,
    }
    raw_id_fields = ("user",)


class AccessTokenAdmin(admin.ModelAdmin):
    list_display = ("token", "user", "application", "expires")
    list_select_related = ("application", "user")
    raw_id_fields = ("user", "source_refresh_token")


class GrantAdmin(admin.ModelAdmin):
    list_display = ("code", "application", "user", "expires")
    raw_id_fields = ("user",)


class IDTokenAdmin(admin.ModelAdmin):
    list_display = ("jti", "user", "application", "expires")
    raw_id_fields = ("user",)


class RefreshTokenAdmin(admin.ModelAdmin):
    list_display = ("token", "user", "application")
    raw_id_fields = ("user", "access_token")


application_model = get_application_model()
access_token_model = get_access_token_model()
grant_model = get_grant_model()
id_token_model = get_id_token_model()
refresh_token_model = get_refresh_token_model()

application_admin_class = get_application_admin_class()
access_token_admin_class = get_access_token_admin_class()
grant_admin_class = get_grant_admin_class()
id_token_admin_class = get_id_token_admin_class()
refresh_token_admin_class = get_refresh_token_admin_class()

admin_site.register(application_model, application_admin_class)
admin_site.register(access_token_model, access_token_admin_class)
admin_site.register(grant_model, grant_admin_class)
admin_site.register(id_token_model, id_token_admin_class)
admin_site.register(refresh_token_model, refresh_token_admin_class)
