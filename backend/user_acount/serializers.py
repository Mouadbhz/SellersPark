from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'password')  # Add or remove fields as needed

    def validate(self, attrs):
        # Perform additional validation if needed
        return attrs


# -------------------------------------------------------------------------
# -----------------------------------------------------------------------
# from djoser.serializers import UserCreateSerializer
# from django.contrib.auth import get_user_model

# User = get_user_model()

# class UserCreateSerializer(UserCreateSerializer):
#     class Meta(UserCreateSerializer.Meta):
#         model = User
#         fields = ('id', 'email', 'first_name', 'last_name')  # Add or remove fields as needed
#         # fields = ('id', 'email', 'first_name', 'last_name', 'image', 'address', 'birth_day')  # Add or remove fields as needed
        
#     def update(self, instance, validated_data):
#         # Implement update method if needed
#         instance = super().update(instance, validated_data)
#         return instance
    
#     def validate(self, attrs):
#         # Perform additional validation if needed
#         return attrs