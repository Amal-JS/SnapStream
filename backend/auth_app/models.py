import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
#methods to hash and check password when user tries to login
from django.contrib.auth.hashers import make_password,check_password

class CustomUser(AbstractUser):
    
    user_id =  models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    phone = models.CharField(unique=True,null=True,max_length=10)
    bio = models.CharField(null=True,max_length=200)
    profile_picture = models.ImageField(null=True,upload_to='user_profile_pictures/')
    birth_date = models.DateField(null=True)
    dark_theme = models.BooleanField(default=False)
    full_name= models.CharField(null=True,max_length=100)
    is_active = models.BooleanField(default=True)
    account_created_at = models.DateTimeField(auto_now_add=True)
    is_google_auth = models.BooleanField(default=False)
    access_token = models.CharField(max_length=500)
    refresh_token = models.CharField(max_length = 500)


    def save(self, *args, **kwargs):
        #hashes password only one time
        if not self.pk:
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def check_password(self, raw_password: str) -> bool:
        return check_password(raw_password,self.password)

