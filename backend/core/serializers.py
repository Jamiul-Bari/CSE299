from rest_framework import serializers
from django.contrib.auth.models import User

from .models import GroceryItem


class GroceryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroceryItem
        fields = '__all__'
