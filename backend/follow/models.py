from django.db import models

from auth_app.models import CustomUser


class Follow(models.Model):
    follower = models.ForeignKey(CustomUser, related_name='follower', on_delete=models.CASCADE)
    followee = models.ForeignKey(CustomUser, related_name='followee', on_delete=models.CASCADE)
    is_accepted = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.followee.username}  follows  {self.follower.username} : {self.is_accepted}"