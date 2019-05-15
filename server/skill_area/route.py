from skill_area.services import SessionService, UserService
from jsonrpc.backend.django import api

services = [
    ('sessions', SessionService.as_dict()),
    ('users', UserService.as_dict()),
]

for prefix, service in services:
    api.dispatcher.add_dict(service, prefix=prefix)