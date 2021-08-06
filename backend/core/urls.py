from django.urls import path

from . import views

urlpatterns = [
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/register/', views.register_user, name='register'),

    path('user/profile/', views.get_user_profile, name='user-profile'),
    path('users/', views.get_users, name='users'),

    path('grocery-items/', views.get_grocery_items, name='grocery-items'),
    path('grocery-item/<str:pk>', views.get_grocery_item, name='grocery-item'),
]
