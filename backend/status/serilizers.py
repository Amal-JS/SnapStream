from rest_framework import serializers
from . models import Status

class StatusSerilizer(serializers.ModelSerializer):
    authorId = serializers.PrimaryKeyRelatedField(source='user.user_id', read_only=True)
    class Meta:
        model = Status
        fields = ['id','description','media','authorId']