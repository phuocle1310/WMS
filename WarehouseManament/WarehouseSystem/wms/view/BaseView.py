import datetime

from django.core.exceptions import ValidationError
from django.db.models import Sum
from rest_framework import status
from rest_framework.response import Response

from ..models import OrderDetail, PODetail, SODetail, Receipt, Order, ReceiptDetail, Location, ItemLocation, Item, \
    ImportView


class BaseAPIView:
    def get_item_receipted(self, instance=None, type=0):
        instance = instance or self.get_object()
        if type == 0:
            po_details = PODetail.objects.filter(PO=instance)
        if type == 1:
            po_details = SODetail.objects.filter(SO=instance)
        '''
            + Tạo 1 mảng các item trong PO Detail
            + Mặc định số lượng đã nhập bằng 0
        '''

        items = []
        for po_detail in po_details:
            item = {}
            item["id"] = po_detail.item.pk
            item['name'] = po_detail.item.name
            item["unit"] = po_detail.item.unit
            item["mu_case"] = po_detail.item.mu_case
            item["expire_date"] = po_detail.item.expire_date
            item["production_date"] = po_detail.item.production_date
            item["Qty_order"] = po_detail.Qty_order
            item["Qty_receipt"] = 0
            items.append(item)

        '''
            + Tính tổng số lượng đã nhập của từng items
        '''

        list_items_id = []
        for item in items: list_items_id.append(item.get('id'))
        if type == 0:
            receipts = Receipt.objects.filter(PO=instance, status=True)
        if type == 1:
            receipts = Order.objects.filter(SO=instance, status=True)

        if receipts is not None:
            for receipt in receipts:
                if type == 0:
                    rc_details = ReceiptDetail.objects.filter(receipt=receipt, status=True)
                if type == 1:
                    rc_details = OrderDetail.objects.filter(order=receipt, status=True)
                for rc_detail in rc_details:
                    for item in items:
                        if item.get('id') == rc_detail.item.id:
                            item["Qty_receipt"] = rc_detail.Qty_receipt + item.get('Qty_receipt')
                            break
        return items

    def update_status_done(self, instance=None, type=0):
        items = self.get_item_receipted(instance, type)
        flag = True
        for item in items:
            if item.get('Qty_receipt') != item.get('Qty_order'):
                flag = False
                break
        return flag

# CAC FUNCTION CHECK AND IMPORT GOOD

    '''
        + Check is enough loc to allocate
    '''

    def is_empty_storage_locations(self, instance=None):
        instance = instance or self.get_object()
        loc_empty = Location.objects.filter(item_location__isnull=True, limited_qty=Location.STORAGE, status=True)
        item_loc_available = ItemLocation.objects.filter(status=True, location__limited_qty=Location.STORAGE,
                                                         qty__lt=Location.STORAGE)
        Qty_total_po = PODetail.objects.filter(PO=instance, status=True).aggregate(total=Sum('Qty_order'))
        po_details = PODetail.objects.filter(PO=instance, status=True)
        loc_need = Qty_total_po.get('total')/Location.STORAGE

        '''
            + Nếu ko còn chỗ trống, kiểm tra xem:
                1) Nếu có item khác không trùng với những item có sẵn trong kho thì return False và ngược lại
                2) Kiểm tra số lượng item đó có thể lấp vào những chỗ trống không, nếu nhiều quá return False và ngược lại
                3) 
        '''

        flag = True
        item_not_in_stock = False
        if loc_empty.count() == 0:
            if item_loc_available.count() <= 0:
                return False
            else:
                for podetail in po_details:
                    for loc in item_loc_available:
                        if podetail.item != loc.item:
                            item_not_in_stock = True
                            break
                        else:
                            item_not_in_stock = False
                            if podetail.Qty_order + loc.qty > Location.STORAGE:
                                flag = False
                            else:
                                continue

        else:
            if round(loc_need) < loc_need:
                loc_need = loc_need + 1
            if round(loc_need) > loc_empty.count():
                return False
        if item_not_in_stock:
            return False
        else:
            if not flag:
                return False
        return True


    '''
        + Lấy số lượng quantity chẵn lẻ location ở PO
    '''

    def get_even_item_qty(self, instance=None):
        instance = instance or self.get_object()
        po_details = PODetail.objects.filter(PO=instance, status=True)
        even_items = []
        odd_items = []

        for po_detail in po_details:
            even_item = {}
            odd_item = {}
            even_item['pk'] = po_detail.item.pk
            odd_qty = po_detail.Qty_order % Location.STORAGE
            even_item['Qty_order'] = po_detail.Qty_order - odd_qty
            even_items.append(even_item)

            if odd_qty > 0:
                odd_item['pk'] = po_detail.item.pk
                odd_item['Qty_order'] = odd_qty
                odd_items.append(odd_item)
        return even_items

    def get_odd_item_qty(self, instance=None):
        instance = instance or self.get_object()
        po_details = PODetail.objects.filter(PO=instance, status=True)
        odd_items = []

        for po_detail in po_details:
            odd_item = {}
            odd_qty = po_detail.Qty_order % Location.STORAGE

            if odd_qty > 0:
                odd_item['pk'] = po_detail.item.pk
                odd_item['Qty_order'] = odd_qty
                odd_items.append(odd_item)
        return odd_items

    def import_good_to_loc(self, instance=None):
        instance = instance or self.get_object()
        even = self.get_even_item_qty(instance)

        '''
            1) Đổ vào location trống với even quantity
        '''
        views_even_item = []
        for item in even:
            it = Item.objects.get(pk=item.get('pk'))
            Qty_total = item.get('Qty_order')
            loc_empty = Location.objects.filter(item_location__isnull=True, limited_qty=Location.STORAGE, status=True)
            for loc in loc_empty:
                if Qty_total > 0:
                    Qty_order = Location.STORAGE
                    item_loc, _ = ItemLocation.objects.get_or_create(location=loc, item=it, qty=Qty_order, status=True)
                    Qty_total -= Location.STORAGE
                    import_view = ImportView.objects.create(PO=instance, item=it, location=loc, qty=Qty_order)
                    views_even_item.append(import_view)
                else:
                    break
            continue

        '''
            2) Đổ vào location có id item trùng
        '''
        odd = self.get_odd_item_qty(instance)
        for item in odd:
            it = Item.objects.get(pk=item.get('pk'))
            Qty_total = item.get('Qty_order')
            can_fill_locs = ItemLocation.objects.filter(item=it, status=True, qty__lt=Location.STORAGE,
                                                        location__limited_qty=Location.STORAGE)
            if can_fill_locs.count() <= 0:
                loc_empty = Location.objects.filter(item_location__isnull=True, limited_qty=Location.STORAGE,
                                                    status=True)

                if loc_empty.count() > 0:
                    item_loc = ItemLocation.objects.create(location=loc_empty[0], item=it, qty=Qty_total)
                    import_view = ImportView.objects.create(PO=instance, item=it, location=item_loc.location, qty=Qty_total)
                    views_even_item.append(import_view)
            else:
                for loc in can_fill_locs:
                    if Qty_total > 0:
                        if Qty_total + loc.qty <= Location.STORAGE:
                            loc.qty = Qty_total + loc.qty
                            loc.save()
                            loc_import = Location.objects.get(pk=loc.location.pk)
                            import_view = ImportView.objects.create(PO=instance, item=it, location=loc_import,
                                                                    qty=Qty_total)
                            views_even_item.append(import_view)
                            Qty_total = 0
                            break
                        else:
                            Qty_total = Qty_total + loc.qty - Location.STORAGE
                            loc.qty = Location.STORAGE
                            loc.save()
                            import_view = ImportView.objects.create(PO=instance, item=it, location=loc_import,
                                                                    qty=Qty_total)
                            views_even_item.append(import_view)
                    else:
                        break
                if Qty_total > 0:
                    loc_empty = Location.objects.filter(item_location__isnull=True, limited_qty=Location.STORAGE,
                                                        status=True)
                    if loc_empty.count() > 0:
                        item_loc = ItemLocation.objects.create(location=loc_empty[0], item=it, qty=Qty_total)
                        import_view = ImportView.objects.create(PO=instance, item=it, location=loc_import,
                                                                qty=Qty_total)
                        views_even_item.append(import_view)
        return views_even_item

    def delete_import_view(self):
        print(datetime.datetime.now() - datetime.timedelta(days=0))
        imports_delete = ImportView.objects.filter(status=False, add_date__lte=datetime.datetime.now() - datetime.timedelta(days=7))
        for import_delete in imports_delete:
            import_delete.delete()
        return True

# CAC FUNCTION CHECK AND IMPORT GOOD

    '''
        + Check is enough good in stock to export
    '''

    def is_empty_pickface_locations(self, instance=None):
        instance = instance or self.get_objects()
        so_details = SODetail.objects.filter(SO=instance, status=True)

        # for


    def is_can_export(self, instance=None):
        instance = instance or self.get_objects()
        so_details = SODetail.objects.filter(SO=instance, status=True)

        for so_detail in so_details:
            items_loc = ItemLocation.objects.filter(item=so_detail.item, location=Location.STORAGE,
                                                    status=True).order_by('qty')
            Qty_order = so_detail.Qty_order
            for item_loc in items_loc:
                if Qty_order > 0:
                    if Qty_order <= item_loc.qty:
                        item_loc.qty = item_loc.qty - Qty_order
                        Qty_order = 0
                        if item_loc.qty == 0:
                            item_loc.delete()
                        # save here
                        break
                    else:
                        # save here vs qty = Location.Storage
                        item_loc.delete()
                        Qty_order = Qty_order - item_loc.qty
                        continue
                else:
                    break


