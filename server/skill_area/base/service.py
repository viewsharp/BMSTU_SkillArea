import json

from skill_area.models import Session


def get_handler(method):
    def handler(request, **_kwargs):
        body = json.loads(request.body)

        try:
            session = Session.objects.get(access_key=body['id'])
        except Session.DoesNotExist:
            session = None

        return method(session, **_kwargs)

    return handler


class Service:
    def __init__(self, **kwargs):
        self.kwargs = kwargs

    @classmethod
    def as_dict(cls, **kwargs):
        self = cls(**kwargs)

        result = {}
        for method_name, method in ((prop, getattr(self, prop)) for prop in dir(self)):
            if not callable(method) or hasattr(Service, method_name):
                continue

            result[method_name] = get_handler(method)

        return result
