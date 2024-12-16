from pyexpat import model 
from django.db import models, IntegrityError
from shortuuid.django_fields import ShortUUIDField
from django.utils.html import mark_safe 
from django.conf import settings
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver


UserAccount = get_user_model()


STATUS_CHOICE = (
   ("processing", "Processing"),
   ("vendor cancel", "Vendor Cancel"),
   ("delivered", "Delivered"),
   ("client cancel", "Client Cancel"),
)


RATING = (
   (1, "★✰✰✰✰"),
   (2, "★★✰✰✰"),
   (3, "★★★✰✰"),
   (4, "★★★★✰"),
   (5, "★★★★★"),
)


class Client(models.Model):
  user = models.ForeignKey(UserAccount , on_delete=models.CASCADE , null=True) 
  id_client = ShortUUIDField(unique=True , length=10 , max_length=20 , prefix='cl' , alphabet="abcdefgh12345")
  email = models.EmailField(max_length=100, unique=True)
  first_name = models.CharField(max_length=100)
  last_name = models.CharField(max_length=100)
  image = models.ImageField(upload_to="clients-image" , default="client.png")
  birth_day = models.DateField(blank=True, null=True)
  address = models.CharField(max_length=255)
  contact = models.CharField(max_length=100 , default="+213 58591645")

  class Meta:
    verbose_name_plural = "Clients"

  def category_image(self):
    return mark_safe('<img src="%s" width="50" height="50" />' % (self.image.url))
  
  def __str__(self):
    return self.first_name

class Category(models.Model):
  id_category = ShortUUIDField(unique=True , length=10 , max_length=20 , prefix='cat' , alphabet="abcdefgh12345")
  category_name = models.CharField(max_length=100  , default="shoes")

  class Meta:
    verbose_name_plural = "Categories"
  
  def __str__(self):
    return self.category_name
  
class Vendor(models.Model):
  id_vendor = ShortUUIDField(unique=True , length=10 , max_length=20 , prefix="ven" , alphabet="abcdefgh12345")
  first_name = models.CharField(max_length=255, null=True, blank=True)
  last_name = models.CharField(max_length=255, null=True, blank=True)
  email = models.EmailField(max_length=100, unique=True, blank=True, null=True)
  image = models.ImageField(upload_to="vendors-image" , default="vendor.png")
  description = models.TextField(null=True , blank=True , default="amazing vendor")
  address = models.CharField(max_length=100 , default="123 Main Street")
  contact = models.CharField(max_length=100 , default="+213 58591645")
  birth_day = models.DateField()
  is_active = models.BooleanField(default=False)
  client = models.ForeignKey(Client , on_delete=models.CASCADE , null=True )

  def save(self, *args, **kwargs):
    if self.client:
        if not self.first_name:
            self.first_name = self.client.first_name
        if not self.last_name:
            self.last_name = self.client.last_name
        if not self.email:
            self.email = self.client.email
        if not self.address:
            self.address = self.client.address
        if not self.birth_day:
            self.birth_day = self.client.birth_day
    super().save(*args, **kwargs)

  class Meta:
    verbose_name_plural = "Vendors"

  def vendor_image(self):
    return mark_safe('<img src="%s" width="50" height="50" />' % (self.image.url))
  
  def __str__(self):
    return self.first_name

class Product(models.Model):
   id_product = ShortUUIDField(unique=True , length=10 , max_length=20  , alphabet="abcdefgh12345")
   title = models.CharField(max_length=100 , default="fresh pear")
   imageCard = models.ImageField(upload_to="product-images" , default="product.png")
   image1 = models.ImageField(upload_to="product-images" , null=True , blank=True )
   image2 = models.ImageField(upload_to="product-images" , null=True , blank=True )
   image3 = models.ImageField(upload_to="product-images" , null=True , blank=True )
   image4 = models.ImageField(upload_to="product-images" , null=True , blank=True )
   description = models.TextField(null=True , blank=True , default="this is my awsome product")
   
   vendor = models.ForeignKey(Vendor , on_delete=models.SET_NULL , null=True )
   category = models.ForeignKey(Category , on_delete=models.SET_NULL , null=True )

   price = models.DecimalField(max_digits=12, decimal_places=2 , default=25.99)
   old_price = models.DecimalField(max_digits=12, decimal_places=2 , default=30.99)
   
   is_published = models.BooleanField(default=True)
   in_stock = models.BooleanField(default=True)
   date = models.DateTimeField(auto_now_add=True)

   class Meta: 
    verbose_name_plural = "Products"

  #  def product_image(self):
  #   return mark_safe('<img src="%s" width="50" height="50" />' % (self.image.url))

   def product_image(self):
        if self.imageCard:
            image_url = self.imageCard.url
            if image_url.startswith('/media/'):
                image_url = image_url[len('/media/'):]
            return mark_safe('<img src="{}{}" width="50" height="50" />'.format(settings.MEDIA_URL, image_url))
        else:
            return "No Image"
  
   def __str__(self):
    return self.title
   
   def get_percentage(self):
     new_price= (self.price / self.old_price) * 100 
     return new_price 


###################################CArt , Order , OrderItems and Address ###############################
###################################CArt , Order , OrderItems and Address ###############################
###################################CArt , Order , OrderItems and Address ###############################

class Order(models.Model):
    id_order = ShortUUIDField(unique=True, length=10, max_length=20, prefix='ord', alphabet="abcdefgh12345")
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    total = models.DecimalField(max_digits=12, decimal_places=2, default=25.99)
    order_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Orders"

class OrderItem(models.Model):
    id_orderItem = ShortUUIDField(unique=True , length=10 , max_length=20 , prefix='ordIt' , alphabet="abcdefgh12345")
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    qty = models.IntegerField(blank=True, default=1)
    total = models.DecimalField(max_digits=12, decimal_places=2, default=25.99)
    price = models.DecimalField(max_digits=12, decimal_places=2) # Store the price at the time of order
    product_status = models.CharField(choices=STATUS_CHOICE, max_length=30, default="processing")

    @property
    def total_price(self):
        return self.qty * self.price

    class Meta:
        verbose_name_plural = "Order Items"

class Notification(models.Model):
    id_notification = ShortUUIDField(unique=True , length=10 , max_length=20 , prefix='rev' , alphabet="abcdefgh12345")
    NOTIFICATION_TYPES = (
        ('ORDER_PLACED', 'Order Placed'),
        ('VENDOR_CREATION', 'Vendor Creation'),
        ('CLIENT_REPORT', 'Client Report'),
    )
    notification_type = models.CharField(max_length=20, choices=NOTIFICATION_TYPES)
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE, blank=True, null=True)
    client = models.ForeignKey(Client, on_delete=models.CASCADE, blank=True, null=True)
    message = models.TextField()
    first_name = models.CharField(max_length=255, null=True, blank=True)
    last_name = models.CharField(max_length=255, null=True, blank=True) 
    is_read = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if self.client or self.vendor:
            if not self.first_name:
                self.first_name = self.client.first_name if self.client else self.vendor.first_name
            if not self.last_name:
                self.last_name = self.client.last_name if self.client else self.vendor.last_name
        super().save(*args, **kwargs)

    def __str__(self):
        return self.message

class Payment(models.Model):
    id_payment = ShortUUIDField(unique=True , length=10 , max_length=20 , prefix='pay' , alphabet="abcdefgh12345")
    client = models.ForeignKey(Client , on_delete=models.CASCADE)
    order = models.ForeignKey(Order , on_delete=models.CASCADE)
    card_number = models.CharField(max_length=200)

    class Meta:
     verbose_name_plural = "Payment"



 ################################### Product review , wish list , address  ###############################
################################### Product review , wish list , address  ###############################
################################### Product review , wish list , address  ###############################

class ProductReview(models.Model):
  id_review = ShortUUIDField(unique=True , length=10 , max_length=20 , prefix='rev' , alphabet="abcdefgh12345")
  client = models.ForeignKey(Client , on_delete=models.SET_NULL , null=True)
  product = models.ForeignKey(Product , on_delete=models.SET_NULL , null=True)
  review = models.TextField()
  rating = models.IntegerField(choices=RATING , default=None)
  date = models.DateTimeField(auto_now_add=True)

  class Meta: 
    verbose_name_plural = "Products Reviews"
  
  def __str__(self):
    return self.product.title
   
  def get_rating(self):
     return self.rating

class Wishlist(models.Model):
  id_wishlist = ShortUUIDField(unique=True , length=10 , max_length=20 , prefix='wish' , alphabet="abcde12345")
  client = models.ForeignKey(Client , on_delete=models.SET_NULL , null=True)
  product = models.ForeignKey(Product , on_delete=models.SET_NULL , null=True)
  qty = models.IntegerField(blank=True, default=1)
  date = models.DateTimeField(auto_now_add=True)

  class Meta: 
    verbose_name_plural = "Wishlists"

  
class Favorite(models.Model):
  id_favorite = ShortUUIDField(unique=True , length=10 , max_length=20 , prefix='fav' , alphabet="abcdefgh12345")
  client = models.ForeignKey(Client , on_delete=models.SET_NULL , null=True)
  product = models.ForeignKey(Product , on_delete=models.SET_NULL , null=True)
  
  class Meta: 
    verbose_name_plural = "Favorites"
  

@receiver(post_save, sender=Client)
def create_wishlist_and_favorite(sender, instance, created, **kwargs):
    if created:
        Wishlist.objects.create(client=instance)
        Favorite.objects.create(client=instance)   


