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


# SERIALIZER cho PO class



# SERIALIZER cho PO Detail

class PODetailSerializer(ModelSerializer):
    class Meta:
        model = PODetail
        fields = '__all__'
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


# SERIALIZER CHO PODETAIL TEMP



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

class ItemSerializer(ModelSerializer):
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




class ItemTempSerializer(ModelSerializer):
    class Meta:
        model = ItemTemp
        fields = '__all__'
        extra_kwargs = {}
        validators = []

    def validators(self, attrs):
        instance = Item(**attrs)

        fields = ['supplier']
        for field in fields:
            if not attrs.get(field):
                raise ValidationError({field: 'This is required field'})

class PODetailTempSerializer(ModelSerializer):
    ItemTemp = ItemTempSerializer()

    class Meta:
        model = PODetailTemp
        fields = ['id', 'ItemTemp']
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

class POSerializer(ModelSerializer):
    potailtemp = PODetailTempSerializer(many=True)
    class Meta:
        model = PO
        fields = ['supplier', 'effective_date', 'add_who', 'edit_who', 'potailtemp']
        extra_kwargs = {}
        validators = []
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
