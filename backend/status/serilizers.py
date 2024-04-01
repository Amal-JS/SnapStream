from rest_framework import serializers
from . models import Memories, Status

class StatusSerilizer(serializers.ModelSerializer):
    authorId = serializers.PrimaryKeyRelatedField(source='user.user_id', read_only=True)
    class Meta:
        model = Status
        fields = ['id','description','media','authorId']

class MemoriesSerilizer(serializers.ModelSerializer):
    class Meta:
        model = Memories
        fields = ['name','status']


class MemoriesWithStatusSerializer(serializers.ModelSerializer):
    description = serializers.CharField(source='status.description', read_only=True)
    media = serializers.ImageField(source='status.media', read_only=True)

    class Meta:
        model = Memories
        fields = ['id', 'name', 'description', 'media']