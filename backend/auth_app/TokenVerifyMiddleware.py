from datetime import datetime, timedelta
import time
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework import status
from rest_framework.response import Response
import jwt
from django.contrib.auth import settings



class TokenVerificationMiddleware:
    def __init__(self,get_response):
        self.get_response = get_response
        
    def set_response_token(self, response, access_token):
            print('response modified')
            response.set_cookie(key='access_token', value=access_token, httponly=True, secure=True, expires=datetime.now() + timedelta(minutes=5), samesite='Lax') 
            response['Access-Control-Expose-Headers'] = 'access_token'
            return response
    
    def __call__(self,request):
        # print(request.headers.get('Cookie'))
        tokens_in_cookie = request.headers.get('Cookie')
        if tokens_in_cookie:
            tokens_dictionary = dict(tuple(token.split('=')) for token in tokens_in_cookie.split(';'))
            # print('token in dictionary :',tokens_dictionary)
            if 'access_token' in tokens_dictionary:
                # print('access in request :',tokens_dictionary['access_token'])
                access_token = tokens_dictionary['access_token']
                token = AccessToken(access_token)
                print("token expiry ",jwt.decode(access_token, settings.SECRET_KEY, algorithms=['HS256'])['exp']- time.time() < 600)
                # print('token ',token.payload) #get user data and token info
                token.verify()
                print('token time remaining :',jwt.decode(access_token, settings.SECRET_KEY, algorithms=['HS256'])['exp']- time.time())
                try:
                    token = AccessToken(access_token)
                    token.verify()
                    exp_time = jwt.decode(access_token, settings.SECRET_KEY, algorithms=['HS256'])['exp']
                    if exp_time - time.time() < 600:
                        print('expired time')
                        refresh_token = tokens_dictionary[' refresh_token']
                        print('new refresh', refresh_token)
                        token = RefreshToken(refresh_token)
                        token.verify()
                        print('new access created')
                        response = self.get_response(request)
                        modified_res = self.set_response_token(response, token.access_token)
                        return modified_res
                except :
                    #access token is not valid
                    #get new access token by using refresh token
                    refresh_token = tokens_dictionary[' refresh_token']
                    try:
                        print('access is invalid ')
                        refresh_token = tokens_dictionary[' refresh_token']
                        token = RefreshToken(refresh_token)
                        token.verify()
                        print('new  acces',token.access_token)
                        response = self.get_response(request)
                        modified_res = self.set_response_token(response, token.access_token)
                        return modified_res 
                    except Exception as e:
                        return Response({'message':'Token Expired Please Login Again'}, status=status.HTTP_401_UNAUTHORIZED)
            
        else:
            print('No tokens in cookie')
        response = self.get_response(request)
       

        return response