import json
from django.http import JsonResponse
from rest_framework.views import APIView
from auth_app.models import CustomUser
from post.models import Comment
from .serilizers import CommentSerilizer, SavedSerilizer
from post.models import Like, Saved
from post.serilizers import UserHomePostSerilizer

from post.models import Post

# Create your views here.
class PostView(APIView):
    def get(self,request):
        user_id = request.GET.get('userId')
        post_id = request.GET.get('post_id')
        user = None
        print('1')
        if user_id:
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
            user = post.user
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
            new_post_data = request.data
            print(new_post_data)
            return JsonResponse({'postUpdated':True})
        except Exception as e:
            print('Exception on post updation :',e)
        return JsonResponse({'postUpdated':False})
    


class CommentView(APIView):
    def get(self,request):
        post_id = request.GET.get('post_id')
        if post_id:
            post = Post.objects.get(id=post_id)
            comments = Comment.objects.filter(post=post)
            serilizer = CommentSerilizer(comments,many=True)
       
        return JsonResponse({'comments':serilizer.data})
    def post(self,request):
        try:
            new_comment_data = request.data
            user = CustomUser.objects.get(user_id = new_comment_data['user_id'])
            post = Post.objects.get(id=new_comment_data['post_id'])
            print(request.data)
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