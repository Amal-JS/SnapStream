import json
from django.middleware.csrf import get_token
from django.views import View
from . models import CustomUser
from django.http import JsonResponse
#for sending email
from django.core.mail import send_mail
from backend.settings import EMAIL_HOST
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken



#check if a username exist in the database
class CheckUserValues(View):
    def get(self,request,*args,**kwargs):
        field = request.GET.get('field')
        value = request.GET.get('value')
     
        value_exist = False
        if field == 'username':
            
            value_exist = CustomUser.objects.filter(username=value).exists()
           
        elif field == 'email':
            value_exist = CustomUser.objects.filter(email=value).exists()
            
        else:
            value_exist = CustomUser.objects.filter(phone=value).exists()
        
        return JsonResponse({'valueExist':value_exist})
    
#generate csrf token for post request
class GetCSRFToken(View):
    def get(self, request):
        csrf_token = get_token(request)

        # assert csrf_token is not None, "CSRF token not found in request"
        return JsonResponse({'csrfToken': csrf_token})
    

#send otp to phone or email
class SendOtp(View):
    def post(self,request):
        #data is send in json format to get the values used json.loads
        data = json.loads(request.body)
        otp = data.get('otp')
        email_or_phone_value = data.get('value')
        
        #sending email
        if len(email_or_phone_value) > 10:
            send_mail(
                        "Creating new account.",
                        f"Your otp is {otp}.",
                        EMAIL_HOST,
                        [email_or_phone_value],
                        fail_silently=False,
                    )
     
            return JsonResponse({'otpSendingFailed': False})
        
        return JsonResponse({'otpSendingFailed': True})
    
#View to create and update User account
class UserAccount(APIView):
    def post(self,request):
        try:
            username = request.data['userName']
            password = request.data['password']
            full_name = request.data['fullName']
            email_or_phone = request.data['phoneOrEmail']
    
            #checking if user provided phone number or email
            if len(email_or_phone) > 10:
              
                new_user = CustomUser(username=username,
                                    password=password,
                                    full_name=full_name,
                                    email= email_or_phone
                                    )
            else:
              

                new_user = CustomUser(username=username,
                                    password=password,
                                    full_name=full_name,
                                    phone= email_or_phone
                                    )
            new_user.save()
         
            return JsonResponse({'userAccountCreatedSuccessfully':True})
        except Exception as e:
            print(e)
            return JsonResponse({'userAccountCreatedSuccessfully':False})
        
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }   

#Login User
class LoginUser(APIView):
    def post(self,request):
        phone_or_email_or_username = request.data['phoneOrEmailOrUsername']
        password = request.data['password']
        user = None
        token_for_user = None
        #phone number
        if len(phone_or_email_or_username) == 10 and phone_or_email_or_username.isdigit():
            # If the input is a 10-digit number, assume it's a phone number
            user = CustomUser.objects.filter(phone=phone_or_email_or_username).first()
        else:
            # Otherwise, try to find the user by email or username
            user = CustomUser.objects.filter(email=phone_or_email_or_username).first() \
                or CustomUser.objects.filter(username=phone_or_email_or_username).first()

        if (user):
            password_check = user.check_password(password)
            if (password_check):
                token_for_user = get_tokens_for_user(user)
                return JsonResponse({'userExist':True,
                                     'message':'Have a nice day.',
                                     'access':token_for_user['access'],
                                      'refresh':token_for_user['refresh'],
                                      'user':user.user_id
                                     })
            else:
                return JsonResponse({'userExist':False,
                                     'message':'Invalid Credentials',
                                     })
        return JsonResponse({'userExist':False,'message':"Account doesn't exist.Please create an account"})