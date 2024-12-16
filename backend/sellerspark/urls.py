# urls.py
from django.urls import path , include
from rest_framework.routers import SimpleRouter , DefaultRouter
from rest_framework.urlpatterns import format_suffix_patterns
from .views import (
    ProductList,
    CategoryList,
    VendorList,
    ProductListByCategory,
    VendorCreate,
    VendorByClientId,
    CategoryByCategoryId,
    ClientByUserId,
    ClientByClientId,
    VendorByVendorId,
    WishlistByClientId, 
    FavoriteByClientId,  
    ProductCreate,
    ProductListByVendor,
    ProductById,
    WishlistItemDeleteView,
    FavoriteItemDeleteView,
    AddToWishlist,
    AddToFavorite,
    CreateOrderView,
    OrderByClientView,
    OrderItemByOrderView,
    update_order_item_status,
    ProductsByVendorWithOrderItems,
    ProductsByVendorWithOrderItemsAndClient,
    VendorOrdersViewSet,
    ProductUpdate,
    delete_product,
    ProductReviewAPIView,
    get_reviews_by_product_id,
    ReportSellerView
)

# router = DefaultRouter()
# router.register(r'vendor-orders', VendorOrdersViewSet, basename='vendor-orders')

urlpatterns = [
    path('vendors/', VendorList.as_view(), name='vendor-list'),
    path('categories/', CategoryList.as_view(), name='category-list'),
    path('products/', ProductList.as_view(), name='product-list'),
    path('product/<int:product_id>/', ProductById.as_view(), name='product_by_id'),
    path('category/<int:id>/', CategoryByCategoryId.as_view(), name='category_by_id'),
    path('categories/<int:category_id>/products/', ProductListByCategory.as_view(), name='product-list-by-category'),
    path('create/vendor/', VendorCreate.as_view(), name='vendor-create'),  # URL for creating new vendor
    path('vendor/<int:client_id>/client/', VendorByClientId.as_view(), name='vendor-detail'),
    path('vendor/<int:id>/vendor/', VendorByVendorId.as_view(), name='vendor-detail'),
    path('client/<int:user_id>/user/', ClientByUserId.as_view(), name='client-detail'),
    path('client/<int:id>/client/', ClientByClientId.as_view(), name='client-detail'),
    path('wishlist/<int:client_id>/', WishlistByClientId.as_view(), name='wishlist_by_client'),
    path('favorite/<int:client_id>/', FavoriteByClientId.as_view(), name='favorite_by_client'),
    path('create/product/', ProductCreate.as_view(), name='product-create'),
    path('products/by_vendor/<int:vendor_id>/', ProductListByVendor.as_view(), name='product-list-by-vendor'),
    path('wishlist/delete/<client_id>/<product_id>/', WishlistItemDeleteView.as_view(), name='wishlist_item_delete'),
    path('favorite/delete/<client_id>/<product_id>/', FavoriteItemDeleteView.as_view(), name='favorite_item_delete'),
    path('wishlist/add/<client_id>/<product_id>/', AddToWishlist.as_view(), name='wishlist_item_add'),
    path('favorite/add/<client_id>/<product_id>/', AddToFavorite.as_view(), name='favorite_item_add'),
    path('create-order/', CreateOrderView.as_view(), name='create-order'),
    path('order/client/<int:client_id>/', OrderByClientView.as_view(), name='orders-by-client'),
    path('orderitems/order/<int:order_id>/', OrderItemByOrderView.as_view(), name='orderitems-by-order'),
    path('orderitems/<str:id_orderItem>/', update_order_item_status, name='update_order_item_status'),
    path('products/by_vendor_with_orderitems/<int:vendor_id>/', ProductsByVendorWithOrderItems.as_view(), name='products-by-vendor-with-orderitems'),
    path('products/by_vendor_with_orderitems_and_client/<int:vendor_id>/', ProductsByVendorWithOrderItemsAndClient.as_view(), name='products-by-vendor-with-orderitems-and-client'),
    path('vendor-orders/<int:pk>/', VendorOrdersViewSet.as_view({'get': 'vendor_orders'}), name='vendor_orders'),  # Use as list route
    path('update-product/<int:id>/', ProductUpdate.as_view(), name='update-product'),
    path('delete-product/<int:product_id>/', delete_product, name='delete_product'),
    path('send-review/', ProductReviewAPIView.as_view(), name='send_review'),
    path('reviews/<int:product_id>/', get_reviews_by_product_id, name='get_reviews_by_product_id'),
    path('report-seller/', ReportSellerView.as_view(), name='report_seller'),
]
 

