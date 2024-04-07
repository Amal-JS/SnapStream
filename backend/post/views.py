from django.http import JsonResponse
from rest_framework.views import APIView

# Create your views here.
class PostView(APIView):
    def post(self,request):
        try:
            new_post_data = request.data
            JsonResponse({'postCreated':True})
        except Exception as e:
            print('Exception on post creation :',e)
        return JsonResponse({'postCreated':False})