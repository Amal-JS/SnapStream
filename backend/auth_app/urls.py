from django.urls import path
from . views import CheckUserValues,SendOtp,GetCSRFToken,UserAccount,LoginUser


urlpatterns = [
    path('check_value_exist/',CheckUserValues.as_view()),
    path('sendEmail/',SendOtp.as_view()),
    path('get_csrf_token/',GetCSRFToken.as_view()),
    path('createNewUserAccount/',UserAccount.as_view()),
    path('LoginUser/',LoginUser.as_view())
]