from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

from . import views

urlpatterns = [
    path('users/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),

    path('', views.get_routes, name='routes'),
    path('grocery-items/', views.get_grocery_items, name='grocery-items'),
    path('grocery-item/<str:pk>', views.get_grocery_item, name='grocery-item'),
]
