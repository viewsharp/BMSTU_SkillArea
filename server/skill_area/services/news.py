from skill_area.base import Service
from skill_area.models import News
from django.core.mail import send_mail


class NewsService(Service):
    def create(self, _, title, text):
        news = News(
            title=title,
            text=text
        )
        news.save()

        # send_mail(
        #     'Add news [{}]: {}'.format(news.id, news.title),
        #     news.text,
        #     'info@skillarea.ru',
        #     ['viewsharp@yandex.ru'],
        #     fail_silently=False,
        # )

        return {
            'id': news.id,
            'title': news.title,
            'text': news.text,
            'created_at': news.created_at
        }

    def get(self, session, id=None):
        news = News.objects.get(id=id)

        return {
            'id': news.id,
            'title': news.title,
            'text': news.text,
            'created_at': news.created_at
        }

    def get_list(self, _):
        newss = News.objects.all().order_by('-created_at')
        return [{
            'id': news.id,
            'title': news.title,
            'text': news.text,
            'created_at': news.created_at
        } for news in newss]

    def remove(self, id):
        news = News.objects.get(id=id)
        news.delete()
