from django.urls import path

from core.views import order_views as views

urlpatterns = [
    path('', views.get_orders, name='orders'),
    path('add/', views.add_order_items, name='add-orders'),
    path('my-orders/', views.get_my_orders, name='my-orders'),

    path('<str:pk>/deliver/', views.update_order_to_delivered,
         name='deliver-order'),
    path('<str:pk>/', views.get_order_by_id, name='get-order-by-id'),
    path('<str:pk>/pay/', views.update_order_to_paid, name='complete-payment'),
]
