from rest_framework import serializers
from .models import Comment, Saved
from .models import Post

#for showing in home page
class UserHomePostSerilizer(serializers.ModelSerializer):
    userId = serializers.PrimaryKeyRelatedField(source='user.user_id',read_only=True)
    username = serializers.CharField(source='user.username',read_only=True)
    profilePictureUrl = serializers.CharField(source = 'user.profile_picture.url',read_only=True)
    class Meta:
        model = Post
        fields = ['id','description','media','location','userId','profilePictureUrl','username']


#for profile 
class PostSerilizer(serializers.ModelSerializer):
    userId = serializers.PrimaryKeyRelatedField(source='user.user_id',read_only=True)
    class Meta:
        model = Post
        fields = ['id','description','media','location','userId']

class SavedSerilizer(serializers.ModelSerializer):
    savedId = serializers.PrimaryKeyRelatedField(source='id',read_only=True)
    post = PostSerilizer()
    class Meta:
        model = Saved
        fields = ['savedId','post']

class CommentSerilizer(serializers.ModelSerializer):
    authorId = serializers.PrimaryKeyRelatedField(source='user.user_id',read_only=True)
    authorName = serializers.CharField(source ='user.username',read_only=True)
    class Meta:
        model = Comment
        fields = ['id','description','authorName','authorId','comment']