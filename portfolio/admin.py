from django.contrib import admin
from .models import Skill, Project, ContactMessage, Experience

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['name', 'icon', 'category']
    list_filter = ['category']
    search_fields = ['name']

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'category']
    list_filter = ['category']
    search_fields = ['title']

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'created_at']
    readonly_fields = ['created_at']

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ['role', 'company', 'year_range', 'order']
    list_editable = ['order']
    ordering = ['order']
