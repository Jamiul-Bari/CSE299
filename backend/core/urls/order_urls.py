from django.urls import path

from core.views import order_views as views

urlpatterns = [
    path('add/', views.add_order_items, name='add-orders'),
    path('<str:pk>/', views.get_order_by_id, name='get-order-by-id'),
    path('<str:pk>/pay/', views.update_order_to_paid, name='complete-payment'),
]
