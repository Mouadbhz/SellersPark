from django.utils.html import format_html
from django.contrib import admin
from sellerspark.models import Product , Category , Vendor ,Client , Order , Payment , Wishlist , ProductReview ,  Notification , Favorite , OrderItem
# from import_export.admin 

class ClientAdmin(admin.ModelAdmin):
  list_display = ['user' , 'first_name' , 'email' ]

class ProductAdmin(admin.ModelAdmin):
  list_display = ['vendor' , 'title' , 'product_image' , 'price' ]

class CategoryAdmin(admin.ModelAdmin):
  list_display = ['category_name' ]

class VendorAdmin(admin.ModelAdmin):
  list_display = ['first_name' , 'vendor_image' , 'is_active' ]

class OrderAdmin(admin.ModelAdmin):
  list_display = ['client' , 'total' , 'order_date' ]

class OrderItemAdmin(admin.ModelAdmin):
  list_display = ['order' , 'product' , 'qty' , 'price' ]

class PaymentAdmin(admin.ModelAdmin):
  list_display = ['order' , 'card_number']

class ProductReviewAdmin(admin.ModelAdmin):
  list_display = ['client' , 'product' , 'review' , 'rating' ]

class WishlistAdmin(admin.ModelAdmin):
  list_display = ['client' , 'product' , 'date' ]

class FavoriteAdmin(admin.ModelAdmin):
  list_display = ['client' , 'product' ]

class NotificationAdmin(admin.ModelAdmin):
  list_display = ['notification_type' , 'first_name' , 'last_name' , 'is_read' , 'date' ]


admin.site.register(Client, ClientAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Vendor, VendorAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem, OrderItemAdmin)
admin.site.register(Payment, PaymentAdmin)
admin.site.register(ProductReview, ProductReviewAdmin)
admin.site.register(Wishlist, WishlistAdmin)
admin.site.register(Notification, NotificationAdmin)
admin.site.register(Favorite, FavoriteAdmin)



