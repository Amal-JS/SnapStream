from rest_framework import serializers

from auth_app.models import CustomUser


class SearchUserSerializer(serializers.ModelSerializer):
    userId = serializers.CharField(source ='user_id',read_only=True)
    profilePictureUrl = serializers.CharField(source ='profile_picture.url',read_only=True)
    fullName = serializers.CharField(source ='full_name',read_only=True)
    class Meta:
        model = CustomUser
        fields = ['userId','username','profilePictureUrl','fullName']