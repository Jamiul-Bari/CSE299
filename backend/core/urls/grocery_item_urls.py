from django.urls import path

from core.views import grocery_item_views as views

urlpatterns = [
    path('', views.get_grocery_items, name='grocery-items'),
    path('create/', views.create_grocery_item, name='create-grocery-item'),
    path('upload/', views.upload_image, name='grocery-image-upload'),
    path('<str:pk>/', views.get_grocery_item, name='grocery-item'),

    path('update/<str:pk>/', views.update_grocery_item,
         name='update-grocery-item'),
    path('delete/<str:pk>/', views.delete_grocery_item,
         name='delete-grocery-item'),
]
