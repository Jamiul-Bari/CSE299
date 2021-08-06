from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from rest_framework import status

from core.models import GroceryItem
from core.grocery_items import grocery_items
from core.serializers import GroceryItemSerializer


@api_view(['GET'])
def get_grocery_items(request):
    grocery_items_query_set = GroceryItem.objects.all()
    serializer = GroceryItemSerializer(grocery_items_query_set, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_grocery_item(request, pk):
    grocery_item = GroceryItem.objects.get(_id=pk)
    serializer = GroceryItemSerializer(grocery_item, many=False)
    return Response(serializer.data)
