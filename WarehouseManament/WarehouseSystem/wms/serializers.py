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


class ItemSerializer(ModelSerializer):
    class Meta:
        model = Item
        fields = ['name', 'unit', 'expire_date', 'production_date', 'mu_case', 'status']
        extra_kwargs = {}
        validators = []

    def validators(self, attrs):
        instance = Item(**attrs)

        fields = ['supplier']
        for field in fields:
            if not attrs.get(field):
                raise ValidationError({field: 'This is required field'})


class PODetailSerializer(ModelSerializer):
    item = ItemSerializer(many=False)

    class Meta:
        model = PODetail
        fields = ['Qty_order', 'status', 'item']
        extra_kwargs = {}
        validators = []

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
        fields = ['id', 'supplier', 'effective_date', 'Qty_total', 'closed_date', 'status', 'podetail']
        extra_kwargs = {}
        read_only_fields = ['status', 'active']

    def create(self, validated_data):
        return PO.objects.create(**validated_data)

    def validate(self, attrs):
        instance = PO(**attrs)
        # Validate các trường ko được null

        fields = ['supplier', 'effective_date', 'add_who', 'edit_who']
        for field in fields:
            if not attrs.get(field):
                raise ValidationError({field: 'This is required field'})

        if instance.closed_date is not None:
            if instance.closed_date <= instance.effective_date:
                # Nếu ko chỉ đỉnh trường nào thì nó sẽ raise trên cùng
                raise ValidationError({'closed_date': 'Close date can be < Effective date'})
        if instance.status == 0:
            if instance.closed_date is None:
                raise ValidationError({'closed_date': 'PO\'s status was done, so close date can be null'})
        return attrs


class ItemTempSerializer(ModelSerializer):
    class Meta:
        model = ItemTemp
        fields = ['id', 'name', 'production_date', 'expire_date', 'mu_case']


class PODetailTempSerializer(ModelSerializer):
    item = ItemTempSerializer()

    class Meta:
        model = PODetailTemp
        fields = ['item', 'Qty_order']
        extra_kwargs = {}
        validators = []

    def create(self, validated_data):
        return PODetailTemp.objects.create(**validated_data)

    def validate(self, attrs):
        instance = PODetailTemp(**attrs)
        fields = ['item']

        for field in fields:
            if not attrs.get(field):
                raise ValidationError({field: 'This is required field'})


class POTempSerializer(ModelSerializer):
    podetail_temp = PODetailTempSerializer(many=True)

    class Meta:
        model = PO
        fields = ['id', 'supplier', 'effective_date', 'closed_date', 'status', 'podetail_temp', 'Qty_total']
        extra_kwargs = {
            'supplier': {'write_only': 'true'}
        }
        validators = []
        read_only_fields = ['status', 'active']

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


# SERIALIZER cho SO class


class SOSerializer(ModelSerializer):
    class Meta:
        model = SO
        fields = '__all__'
        extra_kwargs = {}
        validators = []

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


# SERIALIZER CLASS cho SO DETAIL

class SODetailSerializer(ModelSerializer):
    class Meta:
        model = SODetail
        fields = '__all__'
        extra_kwargs = {}
        validators = []

    def create(self, validated_data):
        return SODetail.objects.create(**validated_data)

    def validate(self, attrs):
        instance = SODetail(**attrs)
        fields = ['item']

        for field in fields:
            if not attrs.get(field):
                raise ValidationError({field: 'This is required field'})


# SERIALIZER CLASS cho Item

class ItemViewSerializer(ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'
        extra_kwargs = {}
        validators = []

    def validators(self, attrs):
        instance = Item(**attrs)

        fields = ['supplier']
        for field in fields:
            if not attrs.get(field):
                raise ValidationError({field: 'This is required field'})


#################################


class POCreateSerializer(ModelSerializer):
    class Meta:
        model = PO
        fields = ['id', 'Qty_total', 'effective_date']

    def create(self, validated_data):
        items = validated_data.pop('items')
        instance = super().create(validated_data)
        if items is None and items is not list:
            raise ValidationError("Khong co item")

        for item in items:
            print(item)
            Qty_order = item.pop("Qty_order", None)

            if Qty_order is None: raise ValidationError("yêu cầu nhập số lượng")
            try:
                Qty_order = int(Qty_order)
            except:
                raise ValidationError("Yêu cầu nhập số")

            serializer = ItemTempSerializer(data=item)
            serializer.is_valid(raise_exception=True)
            it = serializer.save()
            detail = PODetailTemp.objects.create(PO=instance, item=it, Qty_order=Qty_order)

        return instance
