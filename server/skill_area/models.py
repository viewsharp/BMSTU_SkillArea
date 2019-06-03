import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser


class News(models.Model):
    title = models.TextField()
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True, null=True)


class StudentGroup(models.Model):
    name = models.TextField(unique=True)


class Discipline(models.Model):
    name = models.TextField()
    student_group = models.ForeignKey(StudentGroup, on_delete=models.CASCADE, null=True)


class Activity(models.Model):
    title = models.TextField()
    text = models.TextField()
    discipline = models.ForeignKey(Discipline, on_delete=models.CASCADE, null=True)
    date = models.TextField(null=True)
    place = models.TextField(null=True)


class User(AbstractUser):
    student_group = models.ForeignKey(StudentGroup, on_delete=models.CASCADE, null=True)
    category = models.TextField(default='student')


class Session(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    access_key = models.UUIDField(default=uuid.uuid4)

    class Meta:
        unique_together = (("user", "access_key"),)


class Mark(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE)
    value = models.IntegerField(null=True)

    class Meta:
        unique_together = (("student", "activity"),)
