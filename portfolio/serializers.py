from rest_framework import serializers
from .models import Skill, Project, ContactMessage
from rest_framework import serializers
from .models import Experience

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    tag_list = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'image', 'tags', 'tag_list', 'category', 'live_link', 'github_link']

    def get_tag_list(self, obj):
        return [tag.strip() for tag in obj.tags.split(',') if tag.strip()]

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'