import uuid
from django.db import models

from auth_app.models import CustomUser

# Create your models here.
class Status(models.Model):
    id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True,primary_key=True)
    user = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    description = models.CharField(max_length=200,null=True,blank=True)
    media = models.ImageField(upload_to='user_statuses/',null=True,blank=True)
    is_blocked = models.BooleanField(default=False)
    is_reported  = models.BooleanField(default=False)


class StatusSeen(models.Model):
    status = models.ForeignKey(Status,on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    user_seen = models.BooleanField(default=True)


class Memories(models.Model):
    id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True,primary_key=True)
    name= models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.ForeignKey(Status,on_delete=models.CASCADE)