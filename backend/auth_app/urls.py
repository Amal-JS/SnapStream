from django.urls import path
from . views import CheckUserValues,SendOtp,GetCSRFToken


urlpatterns = [
    path('check_value_exist/',CheckUserValues.as_view()),
    path('sendEmail/',SendOtp.as_view()),
    path('get_csrf_token/',GetCSRFToken.as_view())
]