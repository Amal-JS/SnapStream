from django.urls import path
from . views import CheckUserValues,SendOtp


urlpatterns = [
    path('check_value_exist/',CheckUserValues.as_view()),
    path('sendEmail/',SendOtp.as_view())
]