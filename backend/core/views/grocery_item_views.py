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



@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_grocery_item(request):
    user = request.user
    grocery_item = GroceryItem.objects.create(
        user=user,
        name='Sample Name',
        price=0,
        brand='Sample Brand',
        countInStock = 0,
        category = 'Sample Category',
        description = '',
    )
    serializer = GroceryItemSerializer(grocery_item, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def update_grocery_item(request, pk):
    grocery_item = GroceryItem.objects.get(_id=pk)

    data = request.data

    grocery_item.name = data['name']
    grocery_item.price = data['price']
    grocery_item.brand = data['brand']
    grocery_item.countInStock = data['countInStock']
    grocery_item.category = data['category']
    grocery_item.description = data['description']

    grocery_item.save()

    serializer = GroceryItemSerializer(grocery_item, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_grocery_item(request, pk):
    grocery_item = GroceryItem.objects.get(_id=pk)
    grocery_item.delete()
    return Response('Grocery Item Deleted')


@api_view(['POST'])
def upload_image(request):
    data = request.data

    grocery_item_id = data['grocery_item_id']
    grocery_item = GroceryItem.objects.get(_id=grocery_item_id)

    grocery_item.image = request.FILES.get('image')
    grocery_item.save()

    return Response('Grocery Image is uploaded')
