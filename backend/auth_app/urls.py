from django.urls import path
from . views import CheckUserValues


urlpatterns = [
    path('check_value_exist/',CheckUserValues.as_view())
]