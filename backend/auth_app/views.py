from datetime import datetime, timedelta
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
#hash password
from django.contrib.auth.hashers import make_password



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
        process = data.get('process')
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
            print(user)
        else:
            # Otherwise, try to find the user by email or username
            user = CustomUser.objects.filter(email=phone_or_email_or_username).first() \
                or CustomUser.objects.filter(username=phone_or_email_or_username).first()
            print(user)
        if (user):
            #blocked user
            if(not user.is_active) :
                return JsonResponse({'userExist':False,
                                     'message':'Account not active',
                                     })
            password_check = user.check_password(password)
            if (password_check):
                token_for_user = get_tokens_for_user(user)
                # Set HTTP-only cookies for access token and refresh token
                response = JsonResponse({'userExist': True, 'message': 'Have a nice day.', 'user': user.user_id})
                response.set_cookie(key='access_token', value=token_for_user['access'], httponly=True, secure=True, expires=datetime.now() + timedelta(minutes=5), samesite='Lax')
                response.set_cookie(key='refresh_token', value=token_for_user['refresh'], httponly=True, secure=True, expires=datetime.now() + timedelta(days=1), samesite='Lax')
                return response
            else:
                return JsonResponse({'userExist':False,
                                     'message':'Invalid Credentials',
                                     })
        return JsonResponse({'userExist':False,'message':"Account doesn't exist.Please create an account"})
    
class ForgotPassword(APIView):
    def get(self,request):
        usernameOrPhoneOrEmail = request.GET.get('usernameOrPhoneOrEmail',None)
  
        if (usernameOrPhoneOrEmail):
            #phone number
            if len(usernameOrPhoneOrEmail) == 10 and usernameOrPhoneOrEmail.isdigit():
                # If the input is a 10-digit number, assume it's a phone number
                user = CustomUser.objects.filter(phone=usernameOrPhoneOrEmail).first()
                print(user,'one')
            else:
                # Otherwise, try to find the user by email or username
                user = CustomUser.objects.filter(email=usernameOrPhoneOrEmail).first() \
                        or CustomUser.objects.filter(username=usernameOrPhoneOrEmail).first()
                print(user,' two')
            if (user):
                #blocked user
                if(not user.is_active) :
                    return JsonResponse({'userExist':False,
                                        'message':'Account not active',
                                        })
                else:
                    phoneOrEmail = user.email if user.email else user.phone
                    return JsonResponse({'userExist':True,
                                        'message':f"Otp has successfully send to {phoneOrEmail}",
                                        'phoneOrEmail' :phoneOrEmail,
                                  
                                        })
 
        return JsonResponse({'userExist':False})
    
    
    def post(self,request):
        new_paswword = request.data['password']
        phone_or_email = request.data['phoneOrEmail']
        if(new_paswword and phone_or_email):
            #phone number
            if len(phone_or_email) == 10 and phone_or_email.isdigit():
                # If the input is a 10-digit number, assume it's a phone number
                user = CustomUser.objects.filter(phone=phone_or_email).first()
                
            else:
                # Otherwise, try to find the user by email or username
                user = CustomUser.objects.filter(email=phone_or_email).first()
            #hash and store the password
            user.password = make_password(new_paswword)
            user.save()
            return JsonResponse({'passwordUpdated':True})
            

        return JsonResponse({'passwordUpdated':False})
    
class UserData(APIView):
    def post(self,request):
        #change to user_id
        id = request.data['user_id']
        user = CustomUser.objects.get(id=id)
        return JsonResponse(
            {'userData':
             {
            'username':user.username,
            'phone':'' if not user.phone else user.phone,
            'email':'' if not user.email else user.email}})