from django.urls import include, path
from . views import CheckUserValues, GoogleLogin,SendOtp,GetCSRFToken,UserAccount,LoginUser,ForgotPassword,UserData


urlpatterns = [
    path('check_value_exist/',CheckUserValues.as_view()),
    path('sendEmail/',SendOtp.as_view()),
    path('get_csrf_token/',GetCSRFToken.as_view()),
    path('createNewUserAccount/',UserAccount.as_view()),
    path('LoginUser/',LoginUser.as_view()),
    path('ForgotPassword/',ForgotPassword.as_view()),
    path('userData/',UserData.as_view()),
     path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/google/', GoogleLogin.as_view(), name='google_login')
]
