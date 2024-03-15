from django.urls import include, path
from . views import CheckUserValues, GoogleLogin,SendOtp,GetCSRFToken,UserAccount, \
                    LoginUser,ForgotPassword,UserData,LoggedUserData,GoogleCreateAccount


urlpatterns = [
    path('check_value_exist/',CheckUserValues.as_view()),
    path('sendEmail/',SendOtp.as_view()),
    path('get_csrf_token/',GetCSRFToken.as_view()),
    path('createNewUserAccount/',UserAccount.as_view()),
    path('LoginUser/',LoginUser.as_view()),
    path('ForgotPassword/',ForgotPassword.as_view()),
    path('userData/',UserData.as_view()),
    path('googleLogin/',GoogleLogin.as_view()),
    path('createAccountGoogle/',GoogleCreateAccount.as_view()),
    path('getLoggedUserData/',LoggedUserData.as_view())
]
