from django.urls import path
from . views import SearchUser

urlpatterns = [
    path('',SearchUser.as_view())
]