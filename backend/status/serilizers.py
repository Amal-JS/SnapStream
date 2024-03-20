from rest_framework.serializers import ModelSerializer
from . models import Status

class StatusSerilizer(ModelSerializer):
    class Meta:
        model = Status
        fields = ['id','description','media']