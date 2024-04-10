import uuid 
from django.db import models

from auth_app.models import CustomUser

class Post(models.Model):
    id = models.UUIDField(unique=True,primary_key=True,default=uuid.uuid4)
    description = models.CharField(max_length=500,default='.....')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    media = models.ImageField(upload_to='user_posts/')
    user = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    is_blocked = models.BooleanField(default=False)
    is_reported = models.BooleanField(default=False)
    location = models.CharField(max_length=200,null=True)
    is_taken_action = models.BooleanField(default=False)

class Like(models.Model):
    id = models.UUIDField(unique=True,default=uuid.uuid4,primary_key=True)
    post = models.ForeignKey(Post,on_delete=models.CASCADE)
    user_liked = models.BooleanField(default=False)
    user = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    
class Comment(models.Model):
    id = models.UUIDField(default = uuid.uuid4,primary_key=True,unique=True)
    post = models.ForeignKey(Post,on_delete=models.CASCADE)
    description = models.CharField(max_length=200)
    comment = models.ForeignKey('self',blank=True,on_delete=models.CASCADE,related_name='replies')
    user = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)


class Saved(models.Model):
    id = models.UUIDField(default=uuid.uuid4,unique=True,primary_key=True)
    post = models.ForeignKey(Post,on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)