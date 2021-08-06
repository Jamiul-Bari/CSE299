from django.urls import path

from . import views

urlpatterns = [
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),

    path('', views.get_routes, name='routes'),

    path('users/profile/', views.get_user_profile, name='user-profile'),

    path('grocery-items/', views.get_grocery_items, name='grocery-items'),
    path('grocery-item/<str:pk>', views.get_grocery_item, name='grocery-item'),
]
