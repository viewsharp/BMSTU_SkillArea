from skill_area.base import Service
from skill_area.models import StudentGroup, User, Discipline


class DisciplineService(Service):
    def create(self, _, name, group_id):
        discipline = Discipline(
            name=name,
            student_group_id=group_id
        )
        discipline.save()

        return {
            'id': discipline.id,
            'name': discipline.name,
            'group_id': discipline.student_group_id,
        }

    def get(self, _, id):
        discipline = Discipline.objects.get(id=id)

        return {
            'id': discipline.id,
            'name': discipline.name,
            'group_id': discipline.student_group_id,
        }

    def get_list(self, _, group_id=None):
        if group_id:
            disciplines = Discipline.objects.filter(student_group_id=group_id)
        else:
            disciplines = Discipline.objects.all()
        return [{
            'id': discipline.id,
            'name': discipline.name,
            'group_id': discipline.student_group_id,
        } for discipline in disciplines]

    def remove(self, id):
        discipline = Discipline.objects.get(id=id)
        discipline.delete()
