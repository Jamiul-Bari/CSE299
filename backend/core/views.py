from rest_framework.decorators import api_view
from rest_framework.response import Response

from .grocery_items import grocery_items


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
def get_grocery_item(request, pk):
    grocery_item = None

    for i in grocery_items:
        if i['_id'] == pk:
            grocery_item = i
            break

    return Response(grocery_item)


@api_view(['GET'])
def get_grocery_items(request):
    return Response(grocery_items)
