from django.urls import path

from core.views import user_views as views

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', views.register_user, name='register'),

    path('profile/', views.get_user_profile, name='user-profile'),
    path('profile/update', views.update_user_profile, name='update-user-profile'),
    path('', views.get_users, name='users'),

    path('<str:pk>/', views.get_user_by_id, name='get-user-by-id'),
    path('update/<str:pk>/', views.update_user, name='update-user'),

    path('delete/<str:pk>/', views.delete_user, name='delete-user'),
]
