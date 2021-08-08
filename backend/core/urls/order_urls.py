from django.urls import path

from core.views import order_views as views

urlpatterns = [
    path('add/', views.add_order_items, name='add-orders'),
]
