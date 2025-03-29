from django.urls import path
from .views import *
urlpatterns = [
    # path('/', ),
    path('api/signup/', UserRegistrationView.as_view(), name='signup'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/rooms/create/', CreateRoomView.as_view(), name='create-room'),
    path('api/rooms/', ListRoomsView.as_view(), name='list-rooms')
]