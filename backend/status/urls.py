from django.urls import path
from .views import UserStatus

urlpatterns = [
    path('userStatus/',UserStatus.as_view())
]