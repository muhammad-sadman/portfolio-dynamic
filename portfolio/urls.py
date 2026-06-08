from django.urls import path
from .views import SkillListAPIView, ProjectListAPIView, ContactMessageCreateAPIView
from .views import ExperienceListAPIView

urlpatterns = [

    path('skills/', SkillListAPIView.as_view(), name='skills-list'),
    path('projects/', ProjectListAPIView.as_view(), name='projects-list'),
    path('contact/', ContactMessageCreateAPIView.as_view(), name='contact-create'),
    path('experience/', ExperienceListAPIView.as_view(), name='experience-list'),

    
]