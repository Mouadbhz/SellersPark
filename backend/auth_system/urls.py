from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
# --
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('api/', include('sellerspark.urls')),
    path('admin/', admin.site.urls),  
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


# Serve React frontend for all other URLs
urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]

# Serve static files during development
if settings.DEBUG:
  urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
  urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Serve media files regardless of DEBUG mode



