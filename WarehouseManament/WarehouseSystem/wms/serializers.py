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
        fields = ['id', 'supplier', 'effective_date', 'closed_date', 'status', 'podetail']
        extra_kwargs = {
            'supplier': {'write_only': 'true'}
        }
        read_only_fields = ['status']

    def create(self, validated_data):
        return PO.objects.create(**validated_data)

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
        return attrs


# class ItemTempSerializer(ModelSerializer):
#     class Meta:
#         model = ItemTemp
#         fields = ['id', 'name', 'production_date', 'expire_date', 'mu_case']


# class PODetailTempSerializer(ModelSerializer):
#     item = ItemTempSerializer()
#
#     class Meta:
#         model = PODetailTemp
#         fields = ['item', 'Qty_order']
#         extra_kwargs = {}
#         validators = []
#
#     def create(self, validated_data):
#         return PODetailTemp.objects.create(**validated_data)
#
#     def validate(self, attrs):
#         instance = PODetailTemp(**attrs)
#         fields = ['item']
#
#         for field in fields:
#             if not attrs.get(field):
#                 raise ValidationError({field: 'This is required field'})


# class POTempSerializer(ModelSerializer):
#     podetail_temp = PODetailTempSerializer(many=True)
#
#     class Meta:
#         model = PO
#         fields = ['id', 'supplier', 'effective_date', 'closed_date', 'status', 'podetail_temp']
#         extra_kwargs = {
#             'supplier': {'write_only': 'true'}
#         }
#         validators = []
#         read_only_fields = ['status']
#
#     def create(self, validated_data):
#         return PO.objects.create(**validated_data)
#
#     def validate(self, attrs):
#         instance = PO(**attrs)
#         fields = ['supplier', 'effective_date', 'add_who', 'edit_who']
#
#         for field in fields:
#             if not attrs.get(field):
#                 raise ValidationError({field: 'This is required field'})
#
#         if instance.closed_date is not None:
#             if instance.closed_date <= instance.effective_date:
#                 raise ValidationError({'closed_date': 'Close date can be < Effective date'})
#         if instance.status == 0:
#             if instance.closed_date is None:
#                 raise ValidationError({'closed_date': 'PO\'s status was done, so close date can be null'})
#
#         return attrs


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
        fields = ['id', 'supplier', 'effective_date', 'closed_date', 'status', 'sodetail']
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
            raise ValidationError("Khong co item")

        for item in items:
            Qty_order = item.get("Qty_order", None)
            pk = item.get("pk", None)
            if Qty_order is None or Qty_order <= 0: raise ValidationError("yêu cầu nhập số lượng")
            if pk is None or pk <= 0: raise ValidationError("yêu cầu nhập item")
            try:
                Qty_order = int(Qty_order)
                pk = int(pk)
            except:
                raise ValidationError("Yêu cầu nhập số")

        '''
            + Bắt lỗi xong xuôi mới bắt đầu lưu PO, PO Detail
            + Chưa bắt lỗi đc dupplicate item
        '''

        instance = super().create(validated_data)

        for item in items:
            Qty_order = item.pop("Qty_order", None)
            pk = item.pop("pk", None)
            it = Item.objects.get(pk=pk)

            detail = PODetail.objects.create(PO=instance, item=it, Qty_order=Qty_order)
        return instance


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
            + CASE 2: số lượng order vượt quá số lượng tồn kho
        '''
        if items is None and items is not list:
            raise ValidationError("Khong co item")

        for item in items:
            Qty_order = item.get("Qty_order", None)
            name = item.get("name", None)
            Qty_total = 0
            all_this_item = Item.objects.filter(name=name, Qty_total__gt=0, status=True)
            print(all_this_item)
            for item in all_this_item:
                Qty_total = Qty_total + item.Qty_total
                print(item.Qty_total)
            if int(Qty_order) > Qty_total: raise ValidationError("Quantity order can't be greater than quantity of inventory")
            if Qty_order is None: raise ValidationError("Quantity can be null")
            if name is None: raise ValidationError("Name Item can be null")
            try:
                Qty_order = int(Qty_order)
            except:
                raise ValidationError("Yêu cầu nhập số")

        '''
            + Lưu SO và SO detail
            + Lưu SO Detail lấy dần các item từ HSD sớm nhất đến muộn nhất
            + Chưa bắt đc lỗi dupplicate
        '''

        instance = super().create(validated_data)
        for item in items:
            Qty_order = item.pop("Qty_order", None)
            name = item.pop("name", None)
            its = Item.objects.filter(name=name, Qty_total__gt=0, status=True).order_by("-expire_date")

            for it in its:
                if it.Qty_total >= Qty_order:
                    detail = SODetail.objects.create(SO=instance, item=it, Qty_order=Qty_order)
                    # it.Qty_total = it.Qty_total - Qty_order
                    # it.save()
                    break
                if it.Qty_total < Qty_order:
                    detail = SODetail.objects.create(SO=instance, item=it, Qty_order=it.Qty_total)
                    Qty_order = Qty_order - it.Qty_total
                    # it.Qty_total = 0
                    # it.save()
        return instance
