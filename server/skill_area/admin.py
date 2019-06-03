from django.contrib import admin

from .models import Session, User, StudentGroup, Mark, News, Discipline, Activity

admin.site.register(Session)
admin.site.register(User)
admin.site.register(StudentGroup)
admin.site.register(Mark)
admin.site.register(News)
admin.site.register(Discipline)
admin.site.register(Activity)
