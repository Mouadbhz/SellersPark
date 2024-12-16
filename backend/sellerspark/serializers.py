# serializers.py
from rest_framework import serializers
from .models import Category, Product , Vendor , Client , Order , Payment ,ProductReview , Wishlist , Favorite , OrderItem , Notification

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = '__all__'

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['client', 'total']

class Order2Serializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'

class ProductReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductReview
        fields = '__all__'

class WishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wishlist
        fields = '__all__'

class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = '__all__'

# order for vendor display 

class ClientOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['id', 'first_name', 'last_name', 'image', 'address' , 'contact']

class ProductOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'title', 'imageCard']

class OrderItemOrderSerializer(serializers.ModelSerializer):
    client_id = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = '__all__'  # or specify the fields explicitly

    def get_client_id(self, obj):
        return obj.order.client_id

class OrderOrderSerializer(serializers.ModelSerializer):
    items = OrderItemOrderSerializer(many=True)
    client = ClientOrderSerializer()

    class Meta:
        model = Order
        fields = ['id', 'id_order', 'total', 'order_date', 'client', 'items']