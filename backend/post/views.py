import json
from django.http import JsonResponse
from rest_framework.views import APIView
from auth_app.models import CustomUser
from post.models import Comment
from .serilizers import SavedSerilizer
from post.models import Like, Saved
from post.serilizers import UserHomePostSerilizer

from post.models import Post

# Create your views here.
class PostView(APIView):
    def get(self,request):
        user_id = request.GET.get('userId')
        user = CustomUser.objects.get(user_id = user_id)
        posts = Post.objects.filter(user=user)
        serilizer = UserHomePostSerilizer(posts,many=True)
        serilizer_data = serilizer.data
        for key in serilizer_data:
            key['isUserCommentedOnPost'] = True if Comment.objects.filter(user=user,post=Post.objects.get(id=key['id'])).exists() else False
            key['isUserSavedThePost'] = True if Saved.objects.filter(user=user,post=Post.objects.get(id=key['id'])).exists() else False
            key['isUserLikedThePost'] = True if Like.objects.filter(user=user,post=Post.objects.get(id=key['id']),user_liked=True).exists() else False
            key['totalCommentsCount'] = Comment.objects.filter(post=Post.objects.get(id=key['id'])).count()
            key['totalLikesCount'] = Like.objects.filter(post=Post.objects.get(id=key['id']),user_liked=True).count() 
            print('likecount',Like.objects.filter(post=Post.objects.get(id=key['id']),user_liked=True))
        return JsonResponse({'posts':serilizer_data},status=200)
    
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
    


class CommentView(APIView):
    def get(self,request):
        user_id = request.GET.get('userId')
        user = CustomUser.objects.get(user_id = user_id)
        posts = Post.objects.filter(user=user)
        serilizer = UserHomePostSerilizer(posts,many=True)
        return JsonResponse({'posts':serilizer.data})
    def post(self,request):
        try:
            new_comment_data = request.data
            user = CustomUser.objects.get(user_id = new_comment_data['user'])
            post = Post(user=user,media=request.FILES.get('media'),location=new_comment_data['location'],description=new_comment_data['description'])
            post.save()
            return JsonResponse({'commentCreated':True})
        except Exception as e:
            print('Exception on comment creation :',e)
        return JsonResponse({'commentCreated':False})
    def patch(self,request):
        try:
            new_comment_data = request.data
            print(new_comment_data)
            return JsonResponse({'commentUpdated':True})
        except Exception as e:
            print('Exception on comment updation :',e)
        return JsonResponse({'commentUpdated':False})
    



class LikeView(APIView):
    def post(self,request):
        try:
            new_saved_data = request.data
            user = CustomUser.objects.get(user_id = new_saved_data['user_id'])
            post = Post.objects.get(id=new_saved_data['post_id'])
            is_user_already_liked_the_post =  Like.objects.filter(post=post,user=user).exists()
            
            if(is_user_already_liked_the_post):
                like = Like.objects.filter(user=user,post=post).first()
                like.user_liked = not like.user_liked
                print('like updation :',user.username,' ',like.user_liked)
                like.save()
                return JsonResponse({'postStatus':like.user_liked if True else False,'totalLikesCount':Like.objects.filter(post=post,user_liked=True).count() })
            else:
                like = Like(post=post,user=user,user_liked=True)
                print('like creation :',user.username,' ',like.user_liked)
                like.save()
            return JsonResponse({'postLiked':True})
        except Exception as e:
            print('Exception on post liking :',e)
        return JsonResponse({'postLiked':False})
   


   
class SavedView(APIView):
    def get(self,request):
        user_id = request.GET.get('user_id')
        user  = CustomUser.objects.get(user_id = user_id)
        saved_posts = Saved.objects.filter(user=user)
        serializer = SavedSerilizer(saved_posts,many=True)
        return JsonResponse({'savedPosts':serializer.data})
    def post(self,request):
        try:
            new_saved_data = request.data
            user = CustomUser.objects.get(user_id = new_saved_data['user_id'])
            post = Post.objects.get(id=new_saved_data['post_id'])
            saved = Saved(user=user,post=post)
            print('created the saved object :')
            saved.save()
            return JsonResponse({'postSaved':True})
        except Exception as e:
            print('Exception on post saving :',e)
        return JsonResponse({'postSaved':False})
    def delete(self,request):
        try:
            user_id = request.data['user_id']
            post_id = request.data['post_id']
            saved = Saved.objects.filter(user=CustomUser.objects.get(user_id=user_id,post=Post.objects.get(id=post_id)))
            saved.delete()
            print('deleted the saved object :')
            return JsonResponse({'savedDeleted':True})
        except Exception as e:
            print(e)
            return JsonResponse({'savedDeleted':False})