from ..models import OrderDetail, PODetail, SODetail, Receipt, Order, ReceiptDetail


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
