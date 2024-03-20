from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.views import APIView

from auth_app.models import CustomUser
from .models import Status

# Create your views here.
class UserStatus(APIView):
    def post(self,request):
        data = request.data
        media = data['media']
        description = data['media']
        user = CustomUser.objects.get(user_id=data['user_id'])
        try:
                status = Status(user=user,media=media,description=description)
                status.save()
                print('status saved')
                return JsonResponse({'statuses':[status],'statusCreationSuccess':True})
        except:
                return JsonResponse({'statuses':[],'statusCreationSuccess':False})