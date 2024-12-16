from django.shortcuts import render
from djoser.views import UserCreateView
from .serializers import UserCreateSerializer

class CustomUserCreateView(UserCreateView):
    serializer_class = UserCreateSerializer


# Create your views here.
# from rest_framework import status
# from rest_framework.response import Response
# # from rest_framework.views import APIView
# from .serializers import UserCreateSerializer
# # from rest_framework.exceptions import ValidationError

# # Import the logging module
# import logging

# # Define logging configurations in settings.py

# LOGGING = {
#     'version': 1,
#     'disable_existing_loggers': False,
#     'handlers': {
#         'console': {
#             'level': 'DEBUG',
#             'class': 'logging.StreamHandler',
#         },
#         'file': {
#             'level': 'ERROR',
#             'class': 'logging.FileHandler',
#             'filename': '/path/to/django_errors.log',  # Specify the path to the log file
#         },
#     },
#     'loggers': {
#         'django': {
#             'handlers': ['console', 'file'],
#             'level': 'DEBUG',
#             'propagate': True,
#         },
#         'your_app_name': {  # Replace 'your_app_name' with the name of your Django app
#             'handlers': ['console', 'file'],
#             'level': 'DEBUG',
#             'propagate': True,
#         },
#     },
# }


# logger = logging.getLogger(__name__)

# def post(self, request):
#     try:
    
#         serializer = UserCreateSerializer(data=request.data)
#         print(request.data)
#         if serializer.is_valid():
#             serializer.save()
#             logger.info('User created successfully')  # Log successful user creation
#             return Response(data={'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
#         else:
#             logger.error('Validation error: %s', serializer.errors)  # Log validation errors
#             return Response(data={'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
#     except Exception as e:
#         logger.exception('Error during user creation: %s', e)  # Log unexpected errors
#         return Response(data={'error': 'An unexpected error occurred'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

