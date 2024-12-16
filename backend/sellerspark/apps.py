from django.apps import AppConfig


class SellersparkConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'sellerspark'

    def ready(self):
        import sellerspark.signals  # Import the signals module
