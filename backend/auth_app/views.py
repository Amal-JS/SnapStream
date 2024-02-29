from django.shortcuts import render
from django.views import View
from . models import CustomUser
from django.http import JsonResponse


#check if a username exist in the database
class CheckUserValues(View):
    def get(self,request,*args,**kwargs):
        field = request.GET.get('field')
        value = request.GET.get('value')
        value_exist = False
        if field == 'userName':
            
            value_exist = CustomUser.objects.filter(username=value).exists()
        elif field == 'email':
            value_exist = CustomUser.objects.filter(email=value).exists()
        else:
            value_exist = CustomUser.objects.filter(phone=value).exists()
        
        return JsonResponse({'valueExist':value_exist})