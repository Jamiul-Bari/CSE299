from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from rest_framework import status

from core.models import GroceryItem, Order, OrderItem, ShippingAddress
from core.grocery_items import grocery_items
from core.serializers import GroceryItemSerializer, OrderSerializer

from datetime import datetime


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_order_items(request):
    user = request.user
    data = request.data

    order_items = data['order_items']

    if order_items and len(order_items) == 0:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        #     Create Order
        order = Order.objects.create(
            user=user,
            paymentMethod=data['payment_method'],
            vat=data['vat'],
            deliveryCharge=data['delivery_charge'],
            totalPrice=data['total_price']
        )

        #     Create Shipping Address
        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shipping_address']['address'],
            city=data['shipping_address']['city'],
            postalCode=data['shipping_address']['postal_code'],
        )

        #     Create Order items and set order to orderItem relationship
        for i in order_items:
            grocery_item = GroceryItem.objects.get(_id=i['grocery_item'])

            item = OrderItem.objects.create(
                grocery_item=grocery_item,
                order=order,
                name=grocery_item.name,
                qty=i['qty'],
                price=i['price'],
                image=grocery_item.image.url,
            )

            #     Update item stock
            grocery_item.countInStock -= item.qty
            grocery_item.save()

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_my_orders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_orders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_order_by_id(request, pk):

    user = request.user  # from token

    try:
        order = Order.objects.get(_id=pk)

        if user.is_staff or order.user == user:  # admin or current user
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            Response({'detail': 'Not authorized to view this order'},
                     status=status.HTTP_400_BAD_REQUEST)
    except:
        # in case the order does not exist
        return Response({'detail': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_order_to_paid(request, pk):
    order = Order.objects.get(_id=pk)

    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()
    return Response('Payment for this order is complete')


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def update_order_to_delivered(request, pk):
    order = Order.objects.get(_id=pk)

    order.isDelivered = True
    order.deliveredAt = datetime.now()
    order.save()

    return Response('Order was delivered')
