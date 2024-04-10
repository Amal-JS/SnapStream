from django.urls import path
from . views import LikeView, PostView, SavedView
urlpatterns = [
    path('post/',PostView.as_view()),
    path('like/',LikeView.as_view()),
    path('saved/',SavedView.as_view())
]