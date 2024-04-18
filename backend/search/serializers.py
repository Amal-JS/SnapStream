from rest_framework import serializers

from auth_app.models import CustomUser


class SearchUserSerializer(serializers.ModelSerializer):
    userId = serializers.CharField(source ='user_id',read_only=True)
    profilePictureUrl = profilePictureUrl = serializers.ImageField(source='profile_picture', read_only=True, allow_null=True)
    fullName = serializers.CharField(source ='full_name',read_only=True)
    class Meta:
        model = CustomUser
        fields = ['userId','username','profilePictureUrl','fullName']