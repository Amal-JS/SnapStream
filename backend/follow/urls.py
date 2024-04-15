from django.urls import path

from follow.views import FollowOrUnfollow

urlpatterns = [
    path('',FollowOrUnfollow.as_view())
]