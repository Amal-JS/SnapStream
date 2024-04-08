from rest_framework import serializers
from post.models import Post

class PostSerilizer(serializers.ModelSerializer):
    userId = serializers.PrimaryKeyRelatedField(source='user.user_id',read_only=True)
    class Meta:
        model = Post
        fields = ['id','description','media','location','userId']