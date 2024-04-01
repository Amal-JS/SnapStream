import datetime
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.views import APIView
from django.db.models import Q
from auth_app.models import CustomUser
from status.serilizers import MemoriesSerilizer
from status.serilizers import StatusSerilizer
from .models import Memories, Status
from django.core.exceptions import ValidationError


def get_user_active_statues(user):
     # Get current active statuses within the last 24 hours
                now = datetime.datetime.now()
                twenty_four_hours_ago = now - datetime.timedelta(hours=24)
                user_current_active_statuses = Status.objects.filter(
                    Q(user=user) & Q(created_at__gte=twenty_four_hours_ago)
                )
                serializer = StatusSerilizer(user_current_active_statuses,many=True)
                return serializer.data


class UserStatus(APIView):
    def get(self,request):
          try:
            user_id = request.GET.get('user_id',None)
            print(user_id)
            if user_id:
                user = CustomUser.objects.get(user_id= user_id)
                if user:
                    user_statuses = Status.objects.filter(user=user).order_by('-created_at')
                    serializer = StatusSerilizer(user_statuses,many=True)
                    return JsonResponse({'userStories':serializer.data})
          except Exception as e:
               print('Exception on user get statuses :',e)
               return JsonResponse({'userStories':[[]]})
                
    def post(self, request):
        try:
            user_id = request.data.get('user_id')
            user = CustomUser.objects.get(user_id=user_id)
            description = request.data.get('description')
            # Get media file from request.FILES
            media = request.FILES.get('media')
            try:
                # Save the status with media
                if description or media :
                    status = Status.objects.create(user=user, description=description, media=media)
                    print(status.media,status.description)
                # get the active statues
                response = get_user_active_statues(user)
                return JsonResponse({'statuses': [response], 'statusCreationSuccess': True})
            except ValidationError as e:
                print(e)
                return JsonResponse({'error': str(e)}, status=400)
        except Exception as e:
            print(e)
            response = get_user_active_statues(user)
            return JsonResponse({'statusCreationSuccess': False,'statuses':response}, status=500)

    def delete(self,request):
          status_id = request.data['status_id']
          if status_id:
                try:
                      print('before count :',Status.objects.all().count())
                      status = Status.objects.get(id=status_id)
                      status.delete()
                      print('updated count :',Status.objects.all().count())
                      print(status)
                      return JsonResponse({'statusDeleted':True})
                except Exception as e:
                      
                      return JsonResponse({'statusDeleted':False})
          
          return JsonResponse({'statusDeleted':False})


class UserMemories(APIView):
     def post(self,request):
          serializer = MemoriesSerilizer(data=request.data)
          if serializer.is_valid():
              serializer.save()
              return JsonResponse({'isMemoryCreated':True}) 
          else :
               print('memory creation failed')
               return JsonResponse({'isMemoryCreated':False}) 
          