from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from rest_framework import status

from core.models import GroceryItem, Order, OrderItem, ShippingAddress
from core.grocery_items import grocery_items
from core.serializers import GroceryItemSerializer, OrderSerializer


@api_view(['POST'])
@permission_classes(['IsAuthenticated'])
def add_order_items(request):
    user = request.user
    data = request.data

    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        #     Create Order
        order = Order.objects.create(
            user=user,
            paymentMethod=data['payment_method'],
            vat=data['tax_price'],
            deliveryCharge=data['delivery_charge'],
            totalPrice=data['total_price']
        )
        #     Create Shipping Address
        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalCode'],
        )
        #     Create Order items and set order to orderItem relationship
        for i in orderItems:
            grocery_item = GroceryItem.objects.get(_id=i['grocery_item'])

            item = OrderItem.objects.create(
                grocery_item=grocery_item,
                order=order,
                name=grocery_item.name,
                qty=i['qty'],
                price=i['price'],
                image=grocery_item.image.url
            )

            #     Update item stock
            grocery_item.countInStock -=item.qty
            grocery_item.save()

    serializer = OrderSerializer(order, many=True)
    return Response('order')
