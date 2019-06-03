from skill_area.base import Service
from skill_area.models import Activity, Discipline


class ActivityService(Service):
    def create(self, _, title, text, date, place, discipline_id):
        activity = Activity(
            title=title,
            text=text,
            date=date,
            place=place,
            discipline_id=discipline_id
        )
        activity.save()

        return {
            'id': activity.id,
            'title': activity.title,
            'text': activity.text,
            'date': activity.date,
            'place': activity.place,
            'discipline_id': activity.discipline_id,
        }

    def get(self, _, id):
        activity = Activity.objects.get(id=id)

        return {
            'id': activity.id,
            'title': activity.title,
            'text': activity.text,
            'date': activity.date,
            'place': activity.place,
            'discipline_id': activity.discipline_id,
        }

    def get_list(self, session, discipline_id=None):
        user = session.user

        if discipline_id:
            activities = Activity.objects.filter(discipline_id=discipline_id)
        elif user.category == 'student':
            discipline_id_set = Discipline.objects.filter(student_group_id=user.student_group_id)
            activities = Activity.objects.filter(discipline_id__in=discipline_id_set).order_by('-date')
        else:
            activities = Activity.objects.order_by('-date')

        return [{
            'id': activity.id,
            'title': activity.title,
            'text': activity.text,
            'date': activity.date,
            'place': activity.place,
            'discipline_id': activity.discipline_id,
        } for activity in activities]

    def remove(self, id):
        activity = Activity.objects.get(id=id)
        activity.delete()
