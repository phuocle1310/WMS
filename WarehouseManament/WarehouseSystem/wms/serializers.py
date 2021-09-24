from builtins import super
from datetime import date

from django.db import IntegrityError
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from rest_framework.validators import UniqueTogetherValidator

from .models import *


# SERIALIZER cho user class

class UserSerializer(ModelSerializer):
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


class ItemViewSOSerializer(ModelSerializer):

    class Meta:
        model = Item
        fields = ['id', 'name', 'Qty_total']


class ItemSerializer(ModelSerializer):
    class Meta:
        model = Item
        fields = ['id', 'name', 'unit', 'expire_date', 'production_date', 'mu_case', 'Qty_total', 'status']
        read_only_fields = ['status']


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

    class Meta:
        model = PO
        fields = ['id', 'supplier', 'effective_date', 'closed_date', 'add_date', 'close_date', 'add_who', 'edit_who', 'podetail', 'status']
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

        if instance.closed_date is not None:
            if instance.closed_date <= instance.effective_date:
                raise ValidationError({'closed_date': 'Close date can be < Effective date'})
        if instance.status == 0:
            if instance.closed_date is None:
                raise ValidationError({'closed_date': 'PO\'s status was done, so close date can be null'})
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

    class Meta:
        model = SO
        fields = ['id', 'supplier', 'effective_date', 'closed_date', 'add_date', 'close_date', 'add_who', 'edit_who', 'sodetail', 'status']
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

        if instance.closed_date is not None:
            if instance.closed_date <= instance.effective_date:
                raise ValidationError({'closed_date': 'Close date can be < Effective date'})
        if instance.status == 0:
            if instance.closed_date is None:
                raise ValidationError({'closed_date': 'SO\'s status was done, so close date can be null'})
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
            + Bắt lỗi nhập
            + Hàm .pop() là lấy rồi xóa, get() là lấy chứ không xóa
        '''
        if items is None and items is not list:
            raise ValidationError("None Item")

        for item in items:
            Qty_order = item.get("Qty_order", None)
            pk = item.get("pk", None)
            if Qty_order is None or Qty_order <= 0: raise ValidationError("Quantity order can't be null")
            if pk is None or pk <= 0: raise ValidationError("Item can't be null")
            try:
                Qty_order = int(Qty_order)
                pk = int(pk)
            except:
                raise ValidationError("Quantity order must be numeric characters")

        '''
            + Bắt lỗi xong xuôi mới bắt đầu lưu PO, PO Detail
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
            raise ValidationError({'effective_date':'Effective date can be earlier today'})
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
            raise ValidationError({"production_date": "Prodcution date can be less than expire date"})
        if instance.production_date >= date.today():
            raise ValidationError({"production_date": "Prodcution date can be less or equal than now"})
        return attrs


class SOCreateSerializer(ModelSerializer):
    class Meta:
        model = SO
        fields = ['id', 'effective_date']

    def create(self, validated_data):
        items = validated_data.pop('items')
        '''
            + Kiểm tra, bắt lỗi đầu vào các giá trị Qty Order, Name Item 
            + CASE 1: đầu vào rỗng
        '''
        if items is None and items is not list:
            raise ValidationError("None items")

        '''
            + CASE 2: Phần kiểm tra trùng lắp item và gộp số lượng order của item lại
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
            + CASE 3: số lượng order vượt quá số lượng tồn kho
        '''
        for item in item_out:
            Qty_order = item_out.get(item)
            name = item

            Qty_total = 0
            all_this_item = Item.objects.filter(name=name, Qty_total__gt=0, status=True)

            for item in all_this_item:
                Qty_total = Qty_total + item.Qty_total
            print(str(Qty_order) + "----" + str(item))
            if int(Qty_order) > Qty_total: raise ValidationError("Quantity order can't be greater than quantity of inventory")
            if Qty_order is None: raise ValidationError("Quantity can be null")
            if name is None: raise ValidationError("Name Item can be null")
            try:
                Qty_order = int(Qty_order)
            except:
                raise ValidationError("Quantity order must be numeric characters")

        '''
            + Lưu SO và SO detail
            + Lưu SO Detail lấy dần các item từ HSD sớm nhất đến muộn nhất
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
            raise ValidationError({'effective_date':'Effective date can be earlier today'})
        return attrs


# TABLE ORDER SERIALIZER

class OrderDetailSerializer(ModelSerializer):
    item = ItemSerializer(many=False)

    class Meta:
        model = OrderDetail
        fields = ['id', 'order', 'item', 'Qty_order', 'Qty_just', 'Qty_receipt', 'status']
        read_only_fields = ['status']


class OrderSerializer(ModelSerializer):
    order = OrderDetailSerializer(many=True)

    class Meta:
        model = Order
        fields = ['id', 'order', 'SO', 'add_who', 'edit_who', 'status']
        read_only_fields = ['add_who', 'edit_who', 'status']


class OrderCreateSerializer(ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'SO']

    def create(self, validated_data):
        pass

# TABLE RECEIPT SERIALIZER


class ReceiptDetailSerializer(ModelSerializer):
    item = ItemSerializer(many=False)

    class Meta:
        model = ReceiptDetail
        fields = ['id', 'receipt', 'item', 'Qty_order', 'Qty_just', 'Qty_receipt', 'status']
        read_only_fields = ['status']


class ReceiptSerializer(ModelSerializer):
    receipt = ReceiptDetailSerializer(many=True)

    class Meta:
        model = Receipt
        fields = ['id', 'receipt', 'PO', 'add_who', 'edit_who', 'status']
        read_only_fields = ['add_who', 'edit_who', 'status']


class ReceiptCreateSerializer(ModelSerializer):
    class Meta:
        model = Receipt
        fields = ['id', 'PO']

    def create(self, validated_data):
        pass