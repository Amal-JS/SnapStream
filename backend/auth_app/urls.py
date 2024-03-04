from django.urls import path
from . views import CheckUserValues,SendOtp,GetCSRFToken,UserAccount,LoginUser,ForgotPassword


urlpatterns = [
    path('check_value_exist/',CheckUserValues.as_view()),
    path('sendEmail/',SendOtp.as_view()),
    path('get_csrf_token/',GetCSRFToken.as_view()),
    path('createNewUserAccount/',UserAccount.as_view()),
    path('LoginUser/',LoginUser.as_view()),
    path('ForgotPassword/',ForgotPassword.as_view())
]