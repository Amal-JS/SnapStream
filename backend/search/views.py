from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from auth_app.models import CustomUser
from .serializers import SearchUserSerializer

class SearchUser(APIView):
    def post(self,request):
        search_value = request.data['search_data']
        users = CustomUser.objects.filter(username__startswith=search_value)
        serializer = SearchUserSerializer(users,many=True)
        return JsonResponse({'users':serializer.data})