from skill_area.base import Service
from skill_area.models import Mark, Activity, User, Discipline


class MarkService(Service):
    def create(self, _, user_id, activity_id, value):
        mark = Mark(
            student_id=user_id,
            activity_id=activity_id,
            value=value
        )
        mark.save()

        return {
            'id': mark.id,
            'user_id': mark.student_id,
            'activity_id': mark.activity_id,
            'value': mark.value,
        }

    def get(self, session, activity_id, user_id=None):
        if user_id:
            mark = Mark.objects.get(
                student_id=user_id,
                activity_id=activity_id
            )
        else:
            mark = Mark.objects.get(
                student_id=session.user_id,
                activity_id=activity_id
            )

        return {
            'id': mark.id,
            'user_id': mark.student_id,
            'activity_id': mark.activity_id,
            'value': mark.value,
        }

    def get_list(self, session, user_id=None):
        if user_id:
            marks = Mark.objects.filter(student_id=user_id)
        else:
            marks = Mark.objects.get(student_id=session.user_id, )

        return [{
            'id': mark.id,
            'user_id': mark.student_id,
            'activity_id': mark.activity_id,
            'value': mark.value,
        } for mark in marks]

    def remove(self, id):
        mark = Mark.objects.get(id=id)
        mark.delete()

    def get_users_activity_marks_list(self, session):
        user = session.user

        disciplines = []
        for discipline in Discipline.objects.filter(student_group_id=user.student_group_id):
            activities = []
            for activity in Activity.objects.filter(discipline=discipline):
                try:
                    activities.append({
                        'name': activity.title,
                        'date': activity.date,
                        'mark': Mark.objects.get(student=user, activity=activity).value,
                    })
                except Mark.DoesNotExist:
                    pass

            disciplines.append({
                'discipline': discipline.name,
                'activities': activities
            })

        return disciplines

    def get_activity_users_marks_list(self, _, activity_id):
        activity = Activity.objects.get(id=activity_id)
        discipline = activity.discipline

        users_marks = []
        for user in User.objects.filter(student_group_id=discipline.student_group_id):
            try:
                mark = Mark.objects.get(student=user, activity_id=activity_id).value
            except Mark.DoesNotExist:
                mark = None

            users_marks.append({
                'id': user.id,
                'category': user.category,
                'username': user.username,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'group_id': user.student_group_id,
                'mark': mark
            })

        return users_marks

    def set_activity_users_marks_list(self, _, activity_id, users_marks):
        for user_mark in users_marks:
            mark, _ = Mark.objects.get_or_create(activity_id=activity_id, student_id=user_mark.id)

            mark.value = user_mark.value
            mark.save()
