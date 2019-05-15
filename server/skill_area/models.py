import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser


class Course(models.Model):
    pass


class Discipline(models.Model):
    name = models.TextField()


class Period(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    disciplines = models.ManyToManyField(Discipline)


class Activity(models.Model):
    pass


class Lesson(Activity):
    pass


class Task(Activity):
    pass


class StudentGroup(models.Model):
    name = models.TextField()


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
