from django.contrib import admin

from .models import Session, User, StudentGroup

admin.site.register(Session)
admin.site.register(User)
admin.site.register(StudentGroup)
