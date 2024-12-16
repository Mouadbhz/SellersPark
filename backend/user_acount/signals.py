# user_account/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import UserAccount
from sellerspark.models import Client

@receiver(post_save, sender=UserAccount)
def create_client_profile(sender, instance, created, **kwargs):
    """
    A signal receiver which creates a Client profile when a new UserAccount is created.
    """
    if created:
        Client.objects.create(
            user=instance,
            email=instance.email,
            first_name=instance.first_name,
            last_name=instance.last_name,
            # birth_day='1900-01-01',
        )
