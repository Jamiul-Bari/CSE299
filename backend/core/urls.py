from django.urls import path

from . import views

urlpatterns = [
    path('', views.get_routes, name='routes'),
    path('grocery-items/', views.get_grocery_items, name='grocery-items'),
    path('grocery-item/<str:pk>', views.get_grocery_item, name='grocery-item'),
]
