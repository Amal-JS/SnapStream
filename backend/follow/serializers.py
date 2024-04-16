from rest_framework import serializers

from follow.models import Follow


class FollowerSerializer(serializers.ModelSerializer):
    userId = serializers.PrimaryKeyRelatedField(source='follower.user_id',read_only=True)
    username = serializers.CharField(source='follower.username',read_only=True)
    fullName = serializers.CharField(source='follower.full_name',read_only=True)
    profilePictureUrl = serializers.CharField(source='follower.profile_picture.url',read_only=True)
    class Meta:
        model = Follow
        fields = ['userId','profilePictureUrl','fullName','username']



class FollowingSerializer(serializers.ModelSerializer):
    userId = serializers.PrimaryKeyRelatedField(source='followee.user_id',read_only=True)
    username = serializers.CharField(source='followee.username',read_only=True)
    fullName = serializers.CharField(source='followee.full_name',read_only=True)
    profilePictureUrl = serializers.CharField(source='followee.profile_picture.url',read_only=True)
    class Meta:
        model = Follow
        fields = ['userId','profilePictureUrl','fullName','username']
