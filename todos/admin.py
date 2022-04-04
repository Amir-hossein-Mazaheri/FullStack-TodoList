from django.contrib import admin

from .models import TodoType


@admin.register(TodoType)
class TodoTypeAdmin(admin.ModelAdmin):
    pass
