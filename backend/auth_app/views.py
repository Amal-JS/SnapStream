import base64
from datetime import datetime, timedelta
from io import BytesIO
from PIL import Image
import json
import os
import uuid
from django.middleware.csrf import get_token
from django.shortcuts import get_object_or_404
from django.views import View

import requests
from backend  import settings
from . models import CustomUser
from django.http import JsonResponse
#for sending email
from django.core.mail import send_mail
from backend.settings import EMAIL_HOST
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
#hash password
from django.contrib.auth.hashers import make_password
#google auth
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from rest_framework import status

#check if a username exist in the database
class CheckUserValues(View):
    def get(self,request,*args,**kwargs):
        field = request.GET.get('field')
        value = request.GET.get('value')
        #only when call is made from userEdit component
        user_id = request.GET.get('user_id')
        user = None
        value_exist = False
        try:
            if(user_id):
                user = get_object_or_404(CustomUser,pk=user_id)
            
            if field == 'username':
                value_exist = CustomUser.objects.filter(username=value).exists()
            elif field == 'email':
                value_exist = CustomUser.objects.filter(email=value).exists()
            else:
                value_exist = CustomUser.objects.filter(phone=value).exists()
            #if value already used and the current user has that username then no problem
            if value_exist and user:
                    if user.user_id == CustomUser.objects.get(username=value).user_id:
                        value_exist = False
            return JsonResponse({'valueExist':value_exist})
        except:
            
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
            # password = make_password(password)
            #checking if user provided phone number or email
            if len(email_or_phone) > 10 and username and full_name:
              
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
            #blocked user
            if(not user.is_active) :
                return JsonResponse({'userExist':False,
                                     'message':'Account not active',
                                     })
            
            password_check = user.check_password(password)
            
            if (password_check):
                try:
                    token_for_user = get_tokens_for_user(user)
                except Exception as e: 
                    print(e)
                # Set HTTP-only cookies for access token and refresh token
                response = JsonResponse({'userExist':True,
                                        'isUserLoggedSuccessfully': True,
                                         'userId': user.user_id,
                                         'darkTheme':user.dark_theme,
                                         'isSuperUser':user.is_superuser,
                                         'profilePictureUrl':str(user.profile_picture) if user.profile_picture else ''
                                         })
                response.set_cookie(key='access_token', value=token_for_user['access'], httponly=True, secure=True, expires=datetime.now() + timedelta(minutes=5), samesite='Lax')
                response.set_cookie(key='refresh_token', value=token_for_user['refresh'], httponly=True, secure=True, expires=datetime.now() + timedelta(days=1), samesite='Lax')
                print('user login')
                print(response)
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

#function to save the cropped user profile picture
def save_base64_image(profile_picture_str,user):
                # Separate the base64 prefix from the data and remove whitespace
                imgdata = profile_picture_str.split(',')[1].strip()

                # Check if the base64 string length is a multiple of 4 and add a '=' character if not
                if len(imgdata) % 4 != 0:
                    imgdata += '=' * (4 - len(imgdata) % 4)

                # Decode the base64 string
                try:
                    imgbytes = base64.b64decode(imgdata)
                    # Convert bytes to image using PIL
                    image = Image.open(BytesIO(imgbytes))

                    # Generate a unique filename and filepath
                    filename = f'{uuid.uuid4()}.png'
                     # Generate the relative filepath
                    filepath = os.path.join('user_profile_pictures', filename)
                    file_path = os.path.join(settings.MEDIA_ROOT,'user_profile_pictures',filename)
                   
                    # Save the image to the file system
                    with open(file_path, 'wb') as f:
                        f.write(imgbytes)
                    image.save(file_path)
                    user.profile_picture = filepath
                    user.save()
                    

                    return {'profilePictureUpdated': True}
                except Exception as e:
                    print(e)
                    return {'profilePictureUpdated': False}  
                  
#update and get user data   
class UserData(APIView):
    def post(self,request):
        #change to user_id
        id = request.data['user_id']
        user = CustomUser.objects.get(user_id=id)
        
        return JsonResponse(
            {'userData':
             {
            'username':user.username,
            'userId':user.user_id,
            'phone':'' if not user.phone else user.phone,
            'email':'' if not user.email else user.email,
            'profilePicture':str(user.profile_picture),
            'dob':user.dob if user.dob else '',
            'bio':user.bio if user.bio else ''
            } })
    
    def patch(self,request):
        user_id = request.data['user_id']
        profile_picture_str = request.data.get('profilePicture',None)
        
        # etrieve user using get_object_or_404
        user = None
        try:
            user = CustomUser.objects.get(user_id= user_id)
        except:
            
            return JsonResponse({'profileDetailsUpdated':False})
        print(request.data)
        # Update fields based on provided data
        updated_fields = {}
        if 'username' in request.data:
            updated_fields['username'] = request.data['username']
        if 'email' in request.data:
            updated_fields['email'] = request.data['email']
        if 'phone' in request.data:
            updated_fields['phone'] = request.data['phone']
        if 'darkTheme' in request.data:
            updated_fields['dark_theme'] = request.data['darkTheme']
        if 'bio' in request.data:
            updated_fields['bio'] = request.data['bio']
        if 'dob' in request.data:
            updated_fields['dob'] = request.data['dob']
        
        #if profile picture exist
        if profile_picture_str:
            response = save_base64_image(profile_picture_str,user)
            return JsonResponse(response)
        print('user',user)
        if updated_fields and user:
            for field, value in updated_fields.items():
                setattr(user, field, value)
            user.save()
            print('user :',user,' updated fields :',updated_fields,' after updation :',user.dark_theme)
            return JsonResponse({'profileDetailsUpdated': True})
        
        else:
            print('not update')
            return JsonResponse({'profileDetailsUpdated':False})

            
        
    
#function to get user data from user using google login from google
def getUserDataFromGoogle(access_token):
            userinfo_url = 'https://www.googleapis.com/oauth2/v3/userinfo'  
            headers = {'Authorization': f'Bearer {access_token}'}
            response = requests.get(userinfo_url,headers=headers)
            return response


#Google Auth
class GoogleLogin(APIView):
    def post(self,request):
        access_token = request.data['access_token']
        response = getUserDataFromGoogle(access_token=access_token)
        if response.status_code == 200:
            user_info = response.json()
            #if user exist in db send the access and refresh token
            user_exist = CustomUser.objects.filter(email=user_info['email']).exists()
            if user_exist:
                user = CustomUser.objects.get(email=user_info['email'])
                token_for_user = get_tokens_for_user(user)
                # Set HTTP-only cookies for access token and refresh token
                response = JsonResponse({'isUserLoggedSuccessfully': True,
                                         'userId': user.user_id,
                                         'darkTheme':user.dark_theme,
                                         'isSuperUser':user.is_superuser,
                                         'profilePictureUrl':str(user.profile_picture) if user.profile_picture else ''
                                         })
                response.set_cookie(key='access_token', value=token_for_user['access'], httponly=True, secure=True, expires=datetime.now() + timedelta(minutes=5), samesite='Lax')
                response.set_cookie(key='refresh_token', value=token_for_user['refresh'], httponly=True, secure=True, expires=datetime.now() + timedelta(days=1), samesite='Lax')
                return response
            else:
                print('call comes here')
                return JsonResponse({'UserDoesNotExist':True})
         
        return JsonResponse({'isUserLoggedSuccessfully':False})
    
#GoogleCreateAccount
class GoogleCreateAccount(APIView):
    def post(self,request):
        access_token = request.data['access_token']
        response = getUserDataFromGoogle(access_token)
        if response.status_code == 200:
            #convert to json
            user_info = response.json()
            #check if user exist with this email
            print(user_info)
            user_exist = CustomUser.objects.filter(email = user_info['email']).exists()
            if user_exist:

                return JsonResponse({'userAlreadyExist':False})
            else:
                new_user = CustomUser(
                                        username=user_info['name'],
                                        email=user_info['email'],
                                        is_google_auth=True
                                        )
                new_user.save()
                return JsonResponse({'createdUserAccount':True})
        
        return JsonResponse({'createdUserAccount':False})

#for updating state of user in Authenticated Route
class LoggedUserData(APIView):
    def post(self,request):
        user = request.user  # This will give you the user associated with the token
        if user.is_authenticated:
            # User is authenticated, you can now access user attributes
            return JsonResponse({'userId': user.userId, 'darkTheme': user.dark_theme,'isSuperUser':user.is_superuser})
        return JsonResponse({'userDoesNotExist':True},status=status.HTTP_401_UNAUTHORIZED)
    


    #for getting user data in user profile
class UserProfileData(APIView):
    # def post(self,request):
    #     user = request.user  # This will give you the user associated with the token
    #     if user.is_authenticated:
    #         # User is authenticated, you can now access user attributes
    #         return JsonResponse({'userId': user.userId, 'darkTheme': user.dark_theme,'isSuperUser':user.is_superuser})
    #     return JsonResponse({'userDoesNotExist':True},status=status.HTTP_401_UNAUTHORIZED)
    def post(self,request):
        #change to user_id
        id = request.data['user_id']
        user = CustomUser.objects.get(user_id=id)
        
        return JsonResponse(
            {'userData':
             {
            'username':user.username,
            'bio':user.bio,
            'fullName':user.full_name,
            'profilePicture':str(user.profile_picture) if user.profile_picture else ''

            } })