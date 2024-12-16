from django.apps import AppConfig


class UserAcountConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'user_acount'

    def ready(self):
        import user_acount.signals  # noqa