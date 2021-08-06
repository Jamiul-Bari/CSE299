from django.urls import path

from core.views import grocery_item_views as views

urlpatterns = [
    path('', views.get_grocery_items, name='grocery-items'),
    path('<str:pk>/', views.get_grocery_item, name='grocery-item'),
]
