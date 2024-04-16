import json
from django.http import JsonResponse
from rest_framework.views import APIView
from auth_app.models import CustomUser
from post.models import Comment
from .serilizers import CommentSerilizer, SavedSerilizer, UserSavedSerilizer
from post.models import Like, Saved
from post.serilizers import UserHomePostSerilizer

from post.models import Post

# Create your views here.
class PostView(APIView):
    def get(self,request):
        user_id = request.GET.get('userId',None)
        post_id = request.GET.get('post_id',None)
        print(request.data)
        user = None
        if user_id and not post_id:
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
            return JsonResponse({'posts':serilizer_data},status=200)
        if post_id:
            post = Post.objects.get(id=post_id)
            
            serilizer = UserHomePostSerilizer(post)
            if user_id:
                user = CustomUser.objects.get(user_id=user_id)
            user = user if user else post.user
            serilizer_data_copy = dict(serilizer.data.copy())
            serilizer_data_copy['isUserCommentedOnPost'] = True if Comment.objects.filter(user=user,post=post).exists() else False
            serilizer_data_copy['isUserSavedThePost'] = True if Saved.objects.filter(user=user,post=post).exists() else False
            serilizer_data_copy['isUserLikedThePost'] = True if Like.objects.filter(user=user,post=post,user_liked=True).exists() else False
            serilizer_data_copy['totalCommentsCount'] = Comment.objects.filter(post=post).count()
            serilizer_data_copy['totalLikesCount'] = Like.objects.filter(post=post,user_liked=True).count() 
            return JsonResponse({'posts':serilizer_data_copy},status=200)
    
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
            updated_post_data = request.data
            post_id = updated_post_data['id']
            description = updated_post_data['description']
            location = updated_post_data['location']
            media = request.FILES.get('media',None)
            post = Post.objects.get(id=post_id)
            post.description = description
            post.location = location
            if media:
                post.media = media
            post.save()
            return JsonResponse({'postUpdated':True})
        except Exception as e:
            print('Exception on post updation :',e)
        return JsonResponse({'postUpdated':False})
    def delete(self,request):
        try:
            post_id = request.data['post_id']
            post = Post.objects.get(id=post_id)
            post.delete()
            return JsonResponse({'postDeleted':True})
        except Exception as e:
            print(e)
            return JsonResponse({'postDeleted':False})
    


class CommentView(APIView):
    def get(self,request):
        post_id = request.GET.get('post_id')
        if post_id:
            post = Post.objects.get(id=post_id)
            comments = Comment.objects.filter(post=post)
            if comments :
                serilizer = CommentSerilizer(comments,many=True)
                return JsonResponse({'comments':serilizer.data})
            else :
                return JsonResponse({'comments':[]})
            
        return JsonResponse({'comments':[]})
    def post(self,request):
        try:
            new_comment_data = request.data
            user = CustomUser.objects.get(user_id = new_comment_data['user_id'])
            post_id = new_comment_data.get('post_id',None)
            post = None
            if post_id:
                post = Post.objects.get(id=post_id)
            else:
                post = Comment.objects.get(id=new_comment_data['comment']).post
                print(post.user.username)
            if 'comment' in new_comment_data:
                comment = Comment(post=post,user=user,description=new_comment_data['description'],comment=Comment.objects.get(id=new_comment_data['comment']))
            else:
                comment = Comment(post=post,user=user,description=new_comment_data['description'])
            comment.save()
            return JsonResponse({'commentCreated':True})
        except Exception as e:
            print('Exception on comment creation :',e)
        return JsonResponse({'commentCreated':False})
    def patch(self,request):
        try:
            updated_comment_data = request.data
            print(updated_comment_data)
            comment = Comment.objects.get(id=updated_comment_data['comment_id'])
            comment.description = updated_comment_data['description']
            comment.save()
            return JsonResponse({'commentUpdated':True})
        except Exception as e:
            print('Exception on comment updation :',e)
        return JsonResponse({'commentUpdated':False})
    def delete(self,request):
        try:
            comment_id = request.data['comment_id']
            print(request.data)
            comment = Comment.objects.get(id=comment_id)
            comment.delete()
            return JsonResponse({'commentDeleted':True})
        except Exception as e :
            print(e)
            return JsonResponse({'commentDeleted':False})




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
        serializer = UserSavedSerilizer(saved_posts,many=True)
        return JsonResponse({'posts':serializer.data})
    def post(self,request):
        try:
            new_saved_data = request.data
            user = CustomUser.objects.get(user_id = new_saved_data['user_id'])
            post = Post.objects.get(id=new_saved_data['post_id'])
            is_saved_object_exist = Saved.objects.filter(user=user,post=post).exists()
            if is_saved_object_exist:
                saved = Saved.objects.filter(user=user,post=post)
                saved.delete()
                print('deleted the saved object :')
                return JsonResponse({'savedDeleted':True})
            else:
                saved = Saved(user=user,post=post)
                saved.save()
                print('created the saved object :')
                return JsonResponse({'savedPost':True})
        except Exception as e:
            print('Exception on post saving :',e)
        return JsonResponse({'postSaved':False})
    