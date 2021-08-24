from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from core.models import GroceryItem, Review
from core.grocery_items import grocery_items
from core.serializers import GroceryItemSerializer


@api_view(['GET'])
def get_grocery_items(request):
    query = request.query_params.get('keyword')

    if query == None:
        query = ''

    grocery_items_query_set = GroceryItem.objects.filter(name__icontains=query)

    page = request.query_params.get('page')
    paginator = Paginator(grocery_items_query_set, 2)

    try:
        grocery_items = paginator.page(page)
    except PageNotAnInteger:
        grocery_items = paginator.page(1)
    except EmptyPage:
        grocery_items = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)

    serializer = GroceryItemSerializer(grocery_items_query_set, many=True)

    # Send to GroceryItemReducer
    return Response({
        'grocery_items': serializer.data,
        'page': paginator.num_pages
    })


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
        countInStock=0,
        category='Sample Category',
        description='',
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


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_grocery_item_review(request, pk):
    user = request.user
    grocery_item = GroceryItem.objects.get(_id=pk)
    data = request.data

    # 1. Review already exist. One review per user.
    already_exists = grocery_item.review_set.filter(user=user).exists()

    if already_exists:
        content = {'detail': 'This Grocery Item is already reviewed by you'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 2. Review without rating or rating = 0.
    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 3. Create review.
    else:
        review = Review.objects.create(
            grocery_item=grocery_item,
            user=user,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )

        reviews = grocery_item.review_set.all()
        grocery_item.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        grocery_item.rating = total / len(reviews)
        grocery_item.save()

        return Response('Review Added')
