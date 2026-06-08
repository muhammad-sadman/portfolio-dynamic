# D:\portfolio\portfolio\views.py
from django.shortcuts import render
from rest_framework import generics
from .models import Skill, Project, ContactMessage
from .serializers import SkillSerializer, ProjectSerializer, ContactMessageSerializer
from rest_framework import generics
from .models import Experience
from .serializers import ExperienceSerializer

class SkillListAPIView(generics.ListAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

class ProjectListAPIView(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class ContactMessageCreateAPIView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

class ExperienceListAPIView(generics.ListAPIView):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer