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
            
        else:
            print('No tokens in cookie')
        response = self.get_response(request)
       

        return response
    

    