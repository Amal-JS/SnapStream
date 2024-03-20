import datetime
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.views import APIView
from django.db.models import Q
from auth_app.models import CustomUser
from status.serilizers import StatusSerilizer
from .models import Status
from django.core.exceptions import ValidationError

class UserStatus(APIView):
    def post(self, request):
        try:
            user_id = request.data.get('user_id')
            user = CustomUser.objects.get(user_id=user_id)
            description = request.data.get('description')
            # Get media file from request.FILES
            media = request.FILES.get('media')
            try:
                # Save the status with media
                status = Status.objects.create(user=user, description=description, media=media)
                 # Get current active statuses within the last 24 hours
                now = datetime.datetime.now()
                twenty_four_hours_ago = now - datetime.timedelta(hours=24)
                user_current_active_statuses = Status.objects.filter(
                    Q(user=user) & Q(created_at__gte=twenty_four_hours_ago)
                )
                serializer = StatusSerilizer(user_current_active_statuses,many=True)
                return JsonResponse({'status': [serializer.data], 'statusCreationSuccess': True})
            except ValidationError as e:
                print(e)
                return JsonResponse({'error': str(e)}, status=400)
        except Exception as e:
            print(e)
            return JsonResponse({'statusCreationSuccess': False}, status=500)
