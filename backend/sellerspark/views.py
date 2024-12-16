from rest_framework import generics
from .models import Category, Product , Vendor , Client , Wishlist , Favorite , Order , OrderItem ,Notification , ProductReview 
from user_acount.models import UserAccount
from .serializers import (
    CategorySerializer, 
    ProductSerializer ,
    VendorSerializer , 
    ClientSerializer ,
    WishlistSerializer , 
    FavoriteSerializer , 
    OrderSerializer , 
    OrderItemSerializer,
    PaymentSerializer,
    Order2Serializer,
    OrderOrderSerializer,
    ClientOrderSerializer,
    ProductOrderSerializer,
    OrderItemOrderSerializer,
    ProductReviewSerializer
    )
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http.response import JsonResponse
from rest_framework.permissions import AllowAny
from rest_framework import viewsets
from django.db.models import Prefetch
from rest_framework.decorators import action
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import ListModelMixin
from django.views.decorators.http import require_http_methods
from django.shortcuts import get_object_or_404
# get the list of ...
class ProductList(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

class CategoryList(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]  # Allow unauthenticated access

class VendorList(generics.ListAPIView):
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer

class ProductListByCategory(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]  # Allow unauthenticated access

    def get_queryset(self):
        category_id = self.kwargs['category_id']
        return Product.objects.filter(category_id=category_id)

class ProductListByVendor(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        vendor_id = self.kwargs['vendor_id']  # Assuming 'vendor_id' is passed in URL kwargs
        return Product.objects.filter(vendor=vendor_id)

class CategoryByCategoryId(generics.RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'id'  # Set the lookup field to 'id'

    # Optionally, you can override the default behavior to return JsonResponse
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return JsonResponse(serializer.data)
    
class ProductById(generics.RetrieveAPIView):
    permission_classes = [AllowAny]  # Allow unauthenticated access
    """
    Retrieve product details by ID.
    """
    def get(self, request, product_id):
        try:
            product = Product.objects.get(pk=product_id)
            serializer = ProductSerializer(product)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Product.DoesNotExist:
            return Response({"message": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
    
class VendorByClientId(generics.RetrieveAPIView):
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer
    lookup_field = 'client_id'  # Set the lookup field to 'id'

    # Optionally, you can override the default behavior to return JsonResponse
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return JsonResponse(serializer.data)

class VendorByVendorId(generics.RetrieveAPIView):
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer
    permission_classes = [AllowAny]  # Allow unauthenticated access
    lookup_field = 'id'  # Set the lookup field to 'id'

    # Optionally, you can override the default behavior to return JsonResponse
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return JsonResponse(serializer.data)

class ClientByUserId(generics.RetrieveAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    lookup_field = 'user_id'  # Set the lookup field to 'id_client'

    # Optionally, you can override the default behavior to return JsonResponse
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return JsonResponse(serializer.data)

class ClientByClientId(generics.RetrieveAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    lookup_field = 'id'  # Set the lookup field to 'id_client'

    # Optionally, you can override the default behavior to return JsonResponse
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return JsonResponse(serializer.data)

class WishlistByClientId(generics.ListAPIView):
    serializer_class = WishlistSerializer

    def get_queryset(self):
        client_id = self.kwargs['client_id']
        return Wishlist.objects.filter(client_id=client_id)

class FavoriteByClientId(generics.ListAPIView):
    serializer_class = FavoriteSerializer

    def get_queryset(self):
        client_id = self.kwargs['client_id']
        return Favorite.objects.filter(client_id=client_id)

# View to fetch orders by client ID
class OrderByClientView(generics.ListAPIView):
    serializer_class = Order2Serializer

    def get_queryset(self):
        client_id = self.kwargs['client_id']
        return Order.objects.filter(client_id=client_id)

# View to fetch order items by order ID
class OrderItemByOrderView(generics.ListAPIView):
    serializer_class = OrderItemSerializer

    def get_queryset(self):
        order_id = self.kwargs['order_id']
        return OrderItem.objects.filter(order_id=order_id)
    
@require_http_methods(["GET"])
def get_reviews_by_product_id(request, product_id):
    try:
        reviews = ProductReview.objects.filter(product_id=product_id)
        serialized_reviews = []
        for review in reviews:
            serialized_review = {
                'id': review.id,
                'id_review': review.id_review,
                'review': review.review,
                'rating': review.rating,
                'date': review.date.strftime('%Y-%m-%d %H:%M:%S'),
                'client_id': review.client_id,
                'product_id': review.product_id
            }
            serialized_reviews.append(serialized_review)
        return JsonResponse(serialized_reviews, safe=False)
    except ProductReview.DoesNotExist:
        return JsonResponse({"error": "No reviews found for the given product ID"}, status=404)
    

# create ...
class ProductCreate(generics.CreateAPIView):  
    queryset = Product.objects.all()
    serializer_class = ProductSerializer  

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            
            # # Create a notification for the admin
            # admin_user = UserAccount.objects.filter(is_superuser=True).first()  # Assuming admin is a superuser
            # if admin_user:
            #     product = serializer.instance
            #     message = f"New product {product.title} by {product.client.first_name} {product.client.last_name} needs approval"
                
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VendorCreate(generics.CreateAPIView):  
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer  

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            
            # Create a notification for the admin
            admin_user = UserAccount.objects.filter(is_superuser=True).first()  # Assuming admin is a superuser
            if admin_user:
                vendor = serializer.instance
                message = f"New vendor {vendor.first_name} {vendor.last_name} needs approval"
                Notification.objects.create(notification_type='VENDOR_CREATION', vendor=vendor, message=message)
                
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AddToWishlist(generics.CreateAPIView):
    """
    Add or update a product in the wishlist.
    """
    serializer_class = WishlistSerializer

    def create(self, request, *args, **kwargs):
        client_id = self.kwargs.get('client_id')
        product_id = self.kwargs.get('product_id')
        qty = request.data.get('qty', 1)  # Default to 1 if not provided

        if not client_id or not product_id:
            return Response({'message': 'Client ID and Product ID are required'}, status=status.HTTP_400_BAD_REQUEST)

        # Retrieve the client and product instances
        try:
            client = Client.objects.get(id=client_id)
            product = Product.objects.get(id=product_id)
        except Client.DoesNotExist:
            return Response({'message': 'Client not found'}, status=status.HTTP_404_NOT_FOUND)
        except Product.DoesNotExist:
            return Response({'message': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

        # Check if the combination of client ID and product ID already exists in the wishlist
        existing_wishlist_item = Wishlist.objects.filter(client=client, product=product).first()
        if existing_wishlist_item:
            # Update the quantity of the existing wishlist item
            existing_wishlist_item.qty = qty
            existing_wishlist_item.save()
            return Response({'message': 'Wishlist item updated successfully'}, status=status.HTTP_200_OK)
        else:
            # Create a new wishlist item
            serializer = self.get_serializer(data={'client': client.id, 'product': product.id, 'qty': qty})
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AddToFavorite(generics.CreateAPIView):
    """
    Add a product to the favorites list.
    """
    serializer_class = FavoriteSerializer

    def create(self, request, *args, **kwargs):
        client_id = self.kwargs.get('client_id')
        product_id = self.kwargs.get('product_id')

        if not client_id or not product_id:
            return Response({'message': 'Client ID and Product ID are required'}, status=status.HTTP_400_BAD_REQUEST)

        # Retrieve the client and product instances
        try:
            client = Client.objects.get(id=client_id)
            product = Product.objects.get(id=product_id)
        except Client.DoesNotExist:
            return Response({'message': 'Client not found'}, status=status.HTTP_404_NOT_FOUND)
        except Product.DoesNotExist:
            return Response({'message': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

        # Check if the combination of client ID and product ID already exists in the favorites
        existing_favorite_item = Favorite.objects.filter(client=client, product=product).first()
        if existing_favorite_item:
            return Response({'message': 'Product already exists in the favorites'}, status=status.HTTP_400_BAD_REQUEST)

        # Create the favorite item
        serializer = self.get_serializer(data={'client': client.id, 'product': product.id})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProductReviewAPIView(generics.CreateAPIView):
    def post(self, request):
        client_id = request.data.get('client_id')
        product_id = request.data.get('product_id')
        review = request.data.get('review')
        rating = request.data.get('rating')
        
        # Check if all required fields are provided
        if not all([client_id, product_id, review, rating]):
            return Response({"error": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Check if the client and product exist
            client = Client.objects.get(pk=client_id)
            product = Product.objects.get(pk=product_id)
            
            # Create the review
            new_review = ProductReview.objects.create(
                client=client,
                product=product,
                review=review,
                rating=rating
            )
            
            # Serialize the review data
            serializer = ProductReviewSerializer(new_review)
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        except Client.DoesNotExist:
            return Response({"error": "Client does not exist"}, status=status.HTTP_404_NOT_FOUND)
        
        except Product.DoesNotExist:
            return Response({"error": "Product does not exist"}, status=status.HTTP_404_NOT_FOUND)

class ReportSellerView(generics.CreateAPIView):
    def post(self, request, *args, **kwargs):
        # Get data from request body
        client_id = request.user.id
        vendor_id = request.data.get('vendor_id')
        message = request.data.get('message')
        notification_type = request.data.get('notification_type', 'CLIENT_REPORT')  # Default to CLIENT_REPORT if not provided

        # Validate data
        if not vendor_id:
            return Response({"error": "Vendor ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        # Save notification
        vendor = get_object_or_404(Vendor, id=vendor_id)
        client = get_object_or_404(Client, id=client_id)
        notification = Notification.objects.create(
            notification_type=notification_type,
            vendor=vendor,
            client=client,
            message=message
        )

        # Send response
        return Response({"message": "Report submitted successfully."}, status=status.HTTP_200_OK)
    


#----------------------------------------------------------------------------------------


class CreateOrderView(generics.CreateAPIView):
    def post(self, request):
        order_data = request.data.copy()  
        items_data = order_data.pop('items', [])
        card_number = order_data.pop('card_number')  
        
        order_serializer = OrderSerializer(data=order_data)
        if order_serializer.is_valid():
            order = order_serializer.save()  
            
            payment_data = {
                'client': order.client_id,
                'order': order.id,
                'card_number': card_number,
            }
            payment_serializer = PaymentSerializer(data=payment_data)
            if payment_serializer.is_valid():
                payment = payment_serializer.save() 
            else:
                order.delete()
                return Response(payment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            item_errors = []
            for item_data in items_data:
                item_data['order'] = order.id 
                item_serializer = OrderItemSerializer(data=item_data)
                if item_serializer.is_valid():
                    order_item = item_serializer.save()

                    vendor = order_item.product.vendor 
                    notification_message = f"New order placed for {order_item.product.title}."
                    Notification.objects.create(
                        notification_type='ORDER_PLACED',
                        vendor=vendor,
                        message=notification_message
                    )
                else:
                    item_errors.append(item_serializer.errors)

            if item_errors:
                order.delete()  
                return Response({"items": item_errors}, status=status.HTTP_400_BAD_REQUEST)

            return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)
        
        return Response(order_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# delete ... 

class WishlistItemDeleteView(generics.RetrieveDestroyAPIView):
    """
    Retrieve and delete a wishlist item by client_id and product_id.
    """
    serializer_class = WishlistSerializer
    lookup_field = 'client_id'  # Set the lookup field to 'client_id'

    def get_queryset(self):
        client_id = self.kwargs['client_id']
        product_id = self.kwargs['product_id']
        return Wishlist.objects.filter(client_id=client_id, product_id=product_id)

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
            return Response({'message': 'Wishlist item deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except Wishlist.DoesNotExist:
            return Response({'message': 'Wishlist item not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class FavoriteItemDeleteView(generics.RetrieveDestroyAPIView):
    """
    Retrieve and delete a favorite item by client_id and product_id.
    """
    serializer_class = FavoriteSerializer
    lookup_field = 'client_id'  # Set the lookup field to 'client_id'

    def get_queryset(self):
        client_id = self.kwargs['client_id']
        product_id = self.kwargs['product_id']
        return Favorite.objects.filter(client_id=client_id, product_id=product_id)

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
            return Response({'message': 'Favorite item deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except Favorite.DoesNotExist:
            return Response({'message': 'Favorite item not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['DELETE'])
def delete_product(request, product_id):
    try:
        product = Product.objects.get(id=product_id)
        product.delete()
        return Response({"message": "Product deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    except Product.DoesNotExist:
        return Response({"message": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
    

# update ...

@api_view(['PUT'])
def update_order_item_status(request, id_orderItem):
    try:
        order_item = OrderItem.objects.get(id_orderItem=id_orderItem)
    except OrderItem.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        data = request.data
        serializer = OrderItemSerializer(order_item, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


class ProductsByVendorWithOrderItems(generics.ListAPIView):
    serializer_class = OrderItemSerializer

    def get(self, request, vendor_id):
        # Get OrderItems related to products of the given vendor
        order_items = OrderItem.objects.filter(product__vendor_id=vendor_id)
        
        # Serialize the order items
        serializer = OrderItemSerializer(order_items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



class ProductsByVendorWithOrderItemsAndClient(generics.ListAPIView):
    serializer_class = OrderItemOrderSerializer

    def get(self, request, vendor_id):
        # Get OrderItems related to products of the given vendor
        order_items = OrderItem.objects.filter(product__vendor_id=vendor_id)
        
        # Serialize the order items
        serializer = OrderItemOrderSerializer(order_items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    


class ProductUpdate(generics.UpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_object(self):
        product_id = self.kwargs.get("id")
        return generics.get_object_or_404(Product, id=product_id)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        # Handle file uploads
        if 'imageCard' in request.FILES:
            instance.imageCard = request.FILES['imageCard']
        if 'image1' in request.FILES:
            instance.image1 = request.FILES['image1']
        if 'image2' in request.FILES:
            instance.image2 = request.FILES['image2']
        if 'image3' in request.FILES:
            instance.image3 = request.FILES['image3']
        if 'image4' in request.FILES:
            instance.image4 = request.FILES['image4']
        
        instance.save()

        return Response(serializer.data, status=status.HTTP_200_OK)
    

class VendorOrdersViewSet(viewsets.ViewSet):

    @action(detail=False, methods=['get'])
    def vendor_orders(self, request, pk=None):
        vendor_id = pk
        orders = Order.objects.filter(orderitem__product__vendor_id=vendor_id).distinct()
        
        data = []
        for order in orders:
            order_items = order.orderitem_set.filter(product__vendor_id=vendor_id)
            for item in order_items:
                data.append({
                    "order_id": order.id,
                    "id_order": order.id_order,
                    "order_total": order.total,
                    "order_date": order.order_date,
                    "client_id": order.client.id,
                    "client_first_name": order.client.first_name,
                    "client_last_name": order.client.last_name,
                    "client_contact": order.client.contact,
                    "orderitem_id": item.id,
                    "id_orderItem": item.id_orderItem,
                    "qty": item.qty,
                    "orderitem_total": item.total,
                    "price": item.price,
                    "product_status": item.product_status,
                    "product_id": item.product.id,
                    "product_title": item.product.title,
                    "product_image": item.product.imageCard,
                    "product_description": item.product.description,
                    "product_price": item.product.price,
                    "vendor_id": item.product.vendor_id,
                })
        
        return JsonResponse(data)


