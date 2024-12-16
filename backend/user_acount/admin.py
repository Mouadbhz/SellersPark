from django.contrib import admin
from user_acount.models import UserAccount 
# from import_export.admin import ImportExportModelAdmin 

class UserAdmin(admin.ModelAdmin):
  list_display = ['first_name','email', 'is_active'] # to show the list by the first_name and email and is_active 


admin.site.register(UserAccount , UserAdmin)
# Register your models here.
