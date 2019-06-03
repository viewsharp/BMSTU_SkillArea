from skill_area.base import Service
from skill_area.models import StudentGroup, User, Discipline


class GroupService(Service):
    def create(self, _, name):
        group = StudentGroup(
            name=name
        )
        group.save()

        return {
            'id': group.id,
            'name': group.name
        }

    def get(self, session, id=None):
        if id:
            group = StudentGroup.objects.get(id=id)
        else:
            group = session.user.student_group

        if not group:
            return None

        return {
            'id': group.id,
            'name': group.name,
            'students_count': len(User.objects.filter(student_group=group)),
            'disciplines_count': len(Discipline.objects.filter(student_group=group))
        }

    def get_list(self, _):
        groups = StudentGroup.objects.all()
        return [{
            'id': group.id,
            'name': group.name,
            'students_count': len(User.objects.filter(student_group=group)),
            'disciplines_count': len(Discipline.objects.filter(student_group=group))
        } for group in groups]

    def remove(self, id):
        group = StudentGroup.objects.get(id=id)
        group.delete()
