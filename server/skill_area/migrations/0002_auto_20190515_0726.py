# Generated by Django 2.2 on 2019-05-15 07:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('skill_area', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='student_group',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='skill_area.StudentGroup'),
        ),
    ]
