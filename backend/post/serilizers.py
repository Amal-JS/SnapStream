from rest_framework import serializers
from .models import Saved
from .models import Post

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