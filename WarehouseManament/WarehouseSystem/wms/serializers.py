from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from rest_framework.validators import UniqueTogetherValidator

from .models import *


# API cho user class

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


# API cho PO class

class POSerializer(ModelSerializer):
    class Meta:
        model = PO
        fields = '__all__'
        extra_kwargs = {}
        validators = []

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
            if instance.closed_date.date() <= instance.effective_date.date():
                # Nếu ko chỉ đỉnh trường nào thì nó sẽ raise trên cùng
                raise ValidationError({'closed_date': 'Close date can be < Effective date'})
        if instance.status == 0:
            if instance.closed_date is None:
                raise ValidationError({'closed_date': 'PO\'s status was done, so close date can be null'})

        return attrs


# API cho PO Detail


# API cho SO class


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
            if instance.closed_date.date() <= instance.effective_date.date():
                # Nếu ko chỉ đỉnh trường nào thì nó sẽ raise trên cùng
                raise ValidationError({'closed_date': 'Close date can be < Effective date'})
        if instance.status == 0:
            if instance.closed_date is None:
                raise ValidationError({'closed_date': 'SO\'s status was done, so close date can be null'})
        return attrs


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

