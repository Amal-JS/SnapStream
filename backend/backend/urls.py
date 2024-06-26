
from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/',include('auth_app.urls')),
    path('status/',include('status.urls')),
    path('post/',include('post.urls')),
    path('search/',include('search.urls')),
    path('follow/',include('follow.urls')),
    
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
