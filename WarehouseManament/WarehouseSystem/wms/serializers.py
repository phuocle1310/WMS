from builtins import super
from datetime import date

from django.db import IntegrityError
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from rest_framework.validators import UniqueTogetherValidator

from .models import *


# SERIALIZER cho user class

class UserSerializer(ModelSerializer):
    role = serializers.CharField(source='get_role_display')

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'last_name', 'avatar', 'first_name', 'role', 'is_active']
        extra_kwargs = {
            'password': {'write_only': 'true'}
        }

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user


class SupplierSerializer(ModelSerializer):
    user = UserSerializer(many=False)

    class Meta:
        model = Supplier
        fields = ['id', 'company_name', 'address', 'phone', 'email', 'status', 'user']


# ITEM SERIALIZER CLASS


class ItemViewSOSerializer(ModelSerializer):
    class Meta:
        model = Item
        fields = ['id', 'name', 'Qty_total']


class ItemSerializer(ModelSerializer):
    class Meta:
        model = Item
        fields = ['id', 'name', 'unit', 'expire_date', 'production_date', 'mu_case', 'Qty_total', 'status']
        read_only_fields = ['status']


class ItemForReceiptOrderSerializer(ModelSerializer):
    Qty_receipt = serializers.IntegerField()
    Qty_order = serializers.IntegerField()

    class Meta:
        model = Item
        fields = ['id', 'name', 'unit', 'expire_date', 'production_date', 'mu_case', 'status',
                  'Qty_order', 'Qty_receipt']
        read_only_fields = ['status']


# PO SERIALIZER CLASS


class PODetailSerializer(ModelSerializer):
    item = ItemSerializer(many=False)

    class Meta:
        model = PODetail
        fields = ['Qty_order', 'item', 'status']
        read_only_fields = ['status']

    def create(self, validated_data):
        return PODetail.objects.create(**validated_data)

    def validate(self, attrs):
        instance = PODetail(**attrs)
        fields = ['item']

        for field in fields:
            if not attrs.get(field):
                raise ValidationError({field: 'This is required field'})


class POSerializer(ModelSerializer):
    podetail = PODetailSerializer(many=True)
    supplier = SupplierSerializer(many=False)
    status = serializers.CharField(source='get_status_display')
    add_who = UserSerializer(many=False)
    edit_who = UserSerializer(many=False)

    class Meta:
        model = PO
        fields = ['id', 'supplier', 'effective_date', 'add_date', 'add_who', 'edit_who',
                  'podetail', 'status']
        extra_kwargs = {
            'supplier': {'write_only': 'true'}
        }
        read_only_fields = ['status']

    def validate(self, attrs):
        instance = PO(**attrs)
        fields = ['supplier', 'effective_date', 'add_who', 'edit_who']

        for field in fields:
            if not attrs.get(field):
                raise ValidationError({field: 'This is required field'})

        # if instance.closed_date is not None:
        #     if instance.closed_date <= instance.effective_date:
        #         raise ValidationError({'closed_date': 'Close date can be < Effective date'})
        # if instance.status == 0:
        #     if instance.closed_date is None:
        #         raise ValidationError({'closed_date': 'PO\'s status was done, so close date can be null'})
        if instance.effective_date < date.today():
            raise ValidationError({'effective_date': 'Effective date can be earlier today'})
        return attrs


# SERIALIZER cho SO class

# SERIALIZER CLASS cho SO DETAIL

class SODetailSerializer(ModelSerializer):
    item = ItemSerializer(many=False)

    class Meta:
        model = SODetail
        fields = ['Qty_order', 'item', 'status']
        read_only_fields = ['status']

    def create(self, validated_data):
        return SODetail.objects.create(**validated_data)

    def validate(self, attrs):
        instance = SODetail(**attrs)
        fields = ['item']

        for field in fields:
            if not attrs.get(field):
                raise ValidationError({field: 'This is required field'})


class SOSerializer(ModelSerializer):
    sodetail = SODetailSerializer(many=True)
    add_who = UserSerializer(many=False)
    edit_who = UserSerializer(many=False)
    supplier = SupplierSerializer(many=False)
    status = serializers.CharField(source='get_status_display')

    class Meta:
        model = SO
        fields = ['id', 'supplier', 'effective_date', 'add_date', 'add_who', 'edit_who',
                  'sodetail', 'status']
        extra_kwargs = {
            'supplier': {'write_only': 'true'}
        }
        read_only_fields = ['status']

    def create(self, validated_data):
        return SO.objects.create(**validated_data)

    def validate(self, attrs):
        instance = SO(**attrs)

        fields = ['supplier', 'effective_date', 'add_who', 'edit_who']

        for field in fields:
            if not attrs.get(field):
                raise ValidationError({field: 'This is required field'})

        # if instance.closed_date is not None:
        #     if instance.closed_date <= instance.effective_date:
        #         raise ValidationError({'closed_date': 'Close date can be < Effective date'})
        # if instance.status == 0:
        #     if instance.closed_date is None:
        #         raise ValidationError({'closed_date': 'SO\'s status was done, so close date can be null'})
        if instance.effective_date < date.today():
            raise ValidationError({'effective_date': 'Effective date can be earlier today'})
        return attrs


#################################


class POCreateSerializer(ModelSerializer):
    class Meta:
        model = PO
        fields = ['id', 'effective_date']

    def create(self, validated_data):

        items = validated_data.pop('items')
        '''
            + B???t l???i nh???p
            + H??m .pop() l?? l???y r???i x??a, get() l?? l???y ch??? kh??ng x??a
        '''
        if items is None and items is not list:
            raise ValidationError("None Item")

        for item in items:
            Qty_order = item.get("Qty_order", None)
            pk = item.get("pk", None)
            try:
                Qty_order = int(Qty_order)
                pk = int(pk)
            except:
                raise ValidationError("Quantity order must be numeric characters")
            if Qty_order is None or Qty_order <= 0: raise ValidationError("Quantity order can't be null")
            if pk is None or pk <= 0: raise ValidationError("Item can't be null")

        '''
            + B???t l???i xong xu??i m???i b???t ?????u l??u PO, PO Detail
        '''

        instance = super().create(validated_data)
        items_in = []
        for item in items:
            Qty_order = item.pop("Qty_order", None)
            pk = item.pop("pk", None)
            if pk not in items_in:
                items_in.append(pk)
            else:
                po_detail_dupplicate = PODetail.objects.get(PO=instance, item__id=pk)
                po_detail_dupplicate.Qty_order = po_detail_dupplicate.Qty_order + Qty_order
                po_detail_dupplicate.save()
                print(po_detail_dupplicate.Qty_order)
                continue
            it = Item.objects.get(pk=pk)

            detail = PODetail.objects.create(PO=instance, item=it, Qty_order=Qty_order)
        return instance

    def validate(self, attrs):
        instance = PO(**attrs)
        fields = ['effective_date']

        for field in fields:
            if not attrs.get(field):
                raise ValidationError({field: 'This is required field'})

        if instance.effective_date < date.today():
            raise ValidationError({'effective_date': 'Effective date can be earlier today'})
        return attrs


class ItemCreateSerializer(ModelSerializer):
    class Meta:
        model = Item
        fields = ['id', 'name', 'unit', 'expire_date', 'production_date', 'mu_case']

    def create(self, validated_data):
        instance = super().create(validated_data)
        return instance

    def validate(self, attrs):
        instance = Item(**attrs)

        if instance.production_date > instance.expire_date:
            raise ValidationError({"production_date": "Prodcution date can't be less than expire date"})
        if instance.production_date > date.today():
            raise ValidationError({"production_date": "Prodcution date can't be greater or equal than now"})
        return attrs


class SOCreateSerializer(ModelSerializer):
    class Meta:
        model = SO
        fields = ['id', 'effective_date']

    def create(self, validated_data):
        items = validated_data.pop('items')
        '''
            + Ki???m tra, b???t l???i ?????u v??o c??c gi?? tr??? Qty Order, Name Item 
            + CASE 1: ?????u v??o r???ng
        '''
        if items is None and items is not list:
            raise ValidationError("None items")

        '''
            + CASE 2: Ph???n ki???m tra tr??ng l???p item v?? g???p s??? l?????ng order c???a item l???i
        '''

        item_out = {}
        for item in items:
            Qty_order = item.get("Qty_order", None)
            name = item.get("name", None)
            if name not in item_out:
                item_out[name] = Qty_order
                continue
            else:
                item_out[name] = Qty_order + item_out.get(name)
        '''
            + CASE 3: s??? l?????ng order v?????t qu?? s??? l?????ng t???n kho
        '''
        for item in item_out:
            Qty_order = item_out.get(item)
            name = item

            Qty_total = 0
            all_this_item = Item.objects.filter(name=name, Qty_total__gt=0, status=True)

            for item in all_this_item:
                Qty_total = Qty_total + item.Qty_total

            if int(Qty_order) > Qty_total: raise ValidationError(
                "Quantity order can't be greater than quantity of inventory")
            try:
                Qty_order = int(Qty_order)
            except:
                raise ValidationError("Quantity order must be numeric characters")
            if Qty_order is None: raise ValidationError("Quantity can be null")
            if name is None: raise ValidationError("Name Item can be null")

        '''
            + L??u SO v?? SO detail
            + L??u SO Detail l???y d???n c??c item t??? HSD s???m nh???t ?????n mu???n nh???t
        '''

        instance = super().create(validated_data)
        for item in item_out:
            Qty_order = item_out.get(item)
            name = item
            its = Item.objects.filter(name=name, Qty_total__gt=0, status=True).order_by("-expire_date")

            for it in its:
                if it.Qty_total >= Qty_order:
                    detail = SODetail.objects.create(SO=instance, item=it, Qty_order=Qty_order)
                    break
                if it.Qty_total < Qty_order:
                    detail = SODetail.objects.create(SO=instance, item=it, Qty_order=it.Qty_total)
                    Qty_order = Qty_order - it.Qty_total
        return instance

    def validate(self, attrs):
        instance = SO(**attrs)
        fields = ['effective_date']

        for field in fields:
            if not attrs.get(field):
                raise ValidationError({field: 'This is required field'})

        if instance.effective_date < date.today():
            raise ValidationError({'effective_date': 'Effective date can be earlier today'})
        return attrs


# TABLE ORDER SERIALIZER

class OrderDetailSerializer(ModelSerializer):
    item = ItemSerializer(many=False)

    class Meta:
        model = OrderDetail
        fields = ['id', 'order', 'item', 'Qty_receipt', 'status']
        read_only_fields = ['status']


class OrderSerializer(ModelSerializer):
    orderdetail = OrderDetailSerializer(many=True)
    add_who = UserSerializer(many=False)
    edit_who = UserSerializer(many=False)

    class Meta:
        model = Order
        fields = ['id', 'orderdetail', 'SO', 'add_who', 'edit_who', 'status']
        read_only_fields = ['add_who', 'edit_who', 'status']


class OrderCreateSerializer(ModelSerializer):
    class Meta:
        model = Order
        fields = ['id']

    def create(self, validated_data):
        items = validated_data.pop('items')
        '''
            + CASE 1: ?????u v??o r???ng
        '''
        if items is None and items is not list:
            raise ValidationError("None items")

        instance = super().create(validated_data)
        for item in items:
            Qty_receipt = item.get('Qty_receipt')
            it = Item.objects.get(pk=item.get('pk'))
            detail = OrderDetail.objects.create(order=instance, item=it, Qty_receipt=Qty_receipt)
        return instance


# TABLE RECEIPT SERIALIZER


class ReceiptDetailSerializer(ModelSerializer):
    item = ItemSerializer(many=False)

    class Meta:
        model = ReceiptDetail
        fields = ['id', 'receipt', 'item', 'Qty_receipt', 'status']
        read_only_fields = ['status']


class ReceiptSerializer(ModelSerializer):
    receiptdetail = ReceiptDetailSerializer(many=True)
    add_who = UserSerializer(many=False)
    edit_who = UserSerializer(many=False)

    class Meta:
        model = Receipt
        fields = ['id', 'receiptdetail', 'PO', 'add_who', 'edit_who', 'status', 'add_date', 'edit_date']
        read_only_fields = ['add_who', 'edit_who', 'status']


class ReceiptCreateSerializer(ModelSerializer):
    class Meta:
        model = Receipt
        fields = ['id', ]

    def create(self, validated_data):
        items = validated_data.pop('items')
        '''
            + CASE 1: ?????u v??o r???ng
        '''
        if items is None and items is not list:
            raise ValidationError("None items")

        instance = super().create(validated_data)
        for item in items:
            Qty_receipt = item.get('Qty_receipt')
            it = Item.objects.get(pk=item.get('pk'))
            detail = ReceiptDetail.objects.create(receipt=instance, item=it, Qty_receipt=Qty_receipt)
        return instance


class LocationSerializer(ModelSerializer):
    limited_qty = serializers.CharField(source='get_limited_qty_display')
    row_location = serializers.CharField(source='row_location.name')
    shelf_column = serializers.CharField(source='shelf_column.column')
    shelf_floor = serializers.CharField(source='shelf_floor.floor')

    class Meta:
        model = Location
        fields = ['id', 'row_location', 'shelf_column', 'shelf_floor', 'limited_qty', 'status']


class ImportViewSerializer(ModelSerializer):
    item = ItemSerializer(many=False)
    location = LocationSerializer(many=False)

    class Meta:
        model = ImportView
        fields = ['id','PO', 'item', 'location', 'qty', 'add_date', 'status']


class ExportViewSerializer(ModelSerializer):
    item = ItemSerializer(many=False)
    to_location = LocationSerializer(many=False)
    from_location = LocationSerializer(many=False)
    status = serializers.CharField(source='get_status_display')

    class Meta:
        model = ExportView
        fields = ['id','SO', 'item', 'to_location', 'from_location', 'qty', 'add_date', 'status']


# Location


class LocationCreateSerializer(serializers.Serializer):
    name_row = serializers.CharField(required=True, max_length=10)
    number_column = serializers.IntegerField(default=0)
    number_floor = serializers.IntegerField(default=0)



