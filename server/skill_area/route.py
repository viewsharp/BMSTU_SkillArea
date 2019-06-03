from skill_area.services import MarkService, ActivityService, NewsService, DisciplineService, GroupService, \
    SessionService, UserService
from jsonrpc.backend.django import api

services = [
    ('marks', MarkService.as_dict()),
    ('activities', ActivityService.as_dict()),
    ('news', NewsService.as_dict()),
    ('disciplines', DisciplineService.as_dict()),
    ('groups', GroupService.as_dict()),
    ('sessions', SessionService.as_dict()),
    ('users', UserService.as_dict()),
]

for prefix, service in services:
    api.dispatcher.add_dict(service, prefix=prefix)
