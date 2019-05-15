from skill_area.base import Service, utils
from skill_area.models import User


class UserService(Service):
    def create(self, _, username, email, password, first_name, last_name):
        user = User(
            username=username,
            email=email,
            password=utils.encode_password(password),
            first_name=first_name,
            last_name=last_name
        )
        user.save()

        return {
            'username': user.username,
            'email': user.email
        }

    def get(self, session, id=None):
        if id:
            user = User.objects.get(id=id)
        else:
            user = session.user

        return {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'category': user.category,
            'first_name': user.first_name,
            'last_name': user.last_name
        }

    def update(self, session, id=None, email=None, password=None, category=None, first_name=None, last_name=None):
        if id:
            user = User.objects.get(id=id)
        else:
            user = session.user

        user.email = email or user.email
        user.password = utils.encode_password(password) if password else user.password
        user.category = category or user.category
        user.first_name = first_name or user.first_name
        user.last_name = last_name or user.last_name

        user.save()

    def get_list(self, _):
        users = User.objects.all()
        return [{
            'id': user.id,
            'category': user.category,
            'username': user.username,
            'first_name': user.first_name,
            'last_name': user.last_name
        } for user in users]
