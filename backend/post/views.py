from django.http import JsonResponse
from rest_framework.views import APIView
from auth_app.models import CustomUser
from post.serilizers import PostSerilizer

from post.models import Post

# Create your views here.
class PostView(APIView):
    def get(self,request):
        user_id = request.GET.get('userId')
        user = CustomUser.objects.get(user_id = user_id)
        posts = Post.objects.filter(user=user)
        serilizer = PostSerilizer(posts,many=True)
        return JsonResponse({'posts':serilizer.data})
    def post(self,request):
        try:
            new_post_data = request.data
            user = CustomUser.objects.get(user_id = new_post_data['user'])
            post = Post(user=user,media=request.FILES.get('media'),location=new_post_data['location'],description=new_post_data['description'])
            post.save()
            return JsonResponse({'postCreated':True})
        except Exception as e:
            print('Exception on post creation :',e)
        return JsonResponse({'postCreated':False})
    def patch(self,request):
        try:
            new_post_data = request.data
            print(new_post_data)
            return JsonResponse({'postUpdated':True})
        except Exception as e:
            print('Exception on post updation :',e)
        return JsonResponse({'postUpdated':False})
    