from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.views import APIView

from auth_app.models import CustomUser
from follow.serializers import FollowingSerializer
from follow.serializers import FollowerSerializer
from follow.models import Follow



class FollowOrUnfollow(APIView):
    def get(self,request):
        user_id = request.GET.get('user_id',None)
        user = CustomUser.objects.get(user_id=user_id)
        if request.GET.get('followee',None):
            followers= Follow.objects.filter( follower=user)
            serializer = FollowingSerializer(followers,many=True)
        else:
            followee = Follow.objects.filter(followee=user)
            serializer= FollowerSerializer(followee,many=True)
        return JsonResponse({'followersData':serializer.data})
    def post(self,request):
        try:
            
            follower_id = request.data['follower_id']
            followee_id = request.data['followee_id']
            follower = CustomUser.objects.get(user_id=follower_id)
            followee = CustomUser.objects.get(user_id=followee_id)
            is_follower_already_following_followee = Follow.objects.filter(followee=followee,follower=follower).exists()
            if is_follower_already_following_followee:
                follow =  Follow.objects.filter(followee=followee,follower=follower).first()
                follow.delete()
                return JsonResponse({'followeeUnFollowedSuccessfull':True})
            else:
                follow = Follow(follower=follower,followee=followee,is_accepted=True)
                follow.save()
            return JsonResponse({'followRequestSendSuccessfull':True})
        except Exception as e:
            print(e)
            return JsonResponse({'followRequestSendSuccessfull':False})
        

# class FollowAcceptView(APIView):
#     def post(self,request):
#         try:
#             follower_id = request.data['follower']
#             followee_id = request.data['followee']
#             is_user_accepting_the_request = request.data['request_accept']
#             follower = CustomUser.objects.get(user_id=follower_id)
#             followee = CustomUser.objects.get(user_id=followee_id)
#             follow = Follow.objects.filter(follower=follower,followee=followee).first()
#             follow.is_accepted = is_user_accepting_the_request
#             follow.save()
#             return JsonResponse({'followRequestAccepted':True})
#         except Exception as e:
#             print(e)
#             return JsonResponse({'followRequestAccepted':False})
        
