# signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Order, Notification

@receiver(post_save, sender=Order)
def notify_vendor_on_order_creation(sender, instance, created, **kwargs):
    if created:
        # Accessing products through OrderItem instances
        order_items = instance.items.all()
        for order_item in order_items:
            product = order_item.product
            vendor = product.vendor  # Assuming product has a vendor field
            client = instance.client
            message = f'New order {instance.id_order} placed by {client.first_name} {client.last_name} for {product.title}.'
            
            Notification.objects.create(
                notification_type='ORDER_PLACED',
                vendor=vendor,
                client=client,
                message=message,
                first_name=client.first_name,
                last_name=client.last_name
            )


