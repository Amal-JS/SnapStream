from django.urls import path
from .views import UserActiveStatusView, UserMemories, UserStatus

urlpatterns = [
    path('userStatus/',UserStatus.as_view()),
    path('userMemory/',UserMemories.as_view()),
    path('',UserActiveStatusView.as_view()),
    
]