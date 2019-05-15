from jsonrpc.exceptions import JSONRPCDispatchException

from skill_area.base import Service, utils
from skill_area.models import User, Session

UserNotExistsException = JSONRPCDispatchException(code=0, message='The email or password is incorrect.')
SessionNotExistsException = JSONRPCDispatchException(code=1, message='The not exists.')


class SessionService(Service):
    def create(self, _, username, password):
        try:
            user = User.objects.get(username=username, password=utils.encode_password(password))
        except User.DoesNotExist:
            raise UserNotExistsException

        try:
            session = Session.objects.get(user=user)
        except Session.DoesNotExist:
            session = Session.objects.create(user=user)

        return {
            'access_key': str(session.access_key),
            'category': user.category
        }

    def get(self, session):
        if not session:
            raise SessionNotExistsException

        return {
            'access_key': str(session.access_key),
            'category': session.user.category
        }
