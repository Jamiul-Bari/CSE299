from django.contrib.auth.models import User

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import GroceryItem
from .grocery_items import grocery_items
from .serializers import GroceryItemSerializer, UserSerializer, UserSerializerWithToken


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for key, value in serializer.items():
            data[key] = value

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# Create your views here.
@api_view(['GET'])
def get_routes(request):
    routes = [
        "/drf/products/",
        "/drf/products/create/",

        "/drf/products/upload/",

        "/drf/products/<id>/reviews/",

        "/drf/products/top/",
        "/drf/products/<id>/",

        "/drf/products/delete/<id>/",
        "/drf/products/<update>/<id>/",
    ]

    return Response(routes)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    # When a user logs in using default Django authentication. You can get the authenticated user from request.user
    # But here it will get from the token. Then it will give user from the token.
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


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

