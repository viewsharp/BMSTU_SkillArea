from django.contrib import admin
from django.urls import path, include

from skill_area.route import api


urlpatterns = [
    path('admin/', admin.site.urls),
    path('rpc/', include(api.urls))
]
