from django.db import models


class Skill(models.Model):
    name = models.CharField(max_length=50)
    icon = models.CharField(max_length=10, help_text="Emoji or icon class name")
    category = models.CharField(max_length=50, default="Frontend")

    def __str__(self):
        return self.name

class Project(models.Model):
    CATEGORY_CHOICES = [
        ('web', 'Web App'),
        ('ml', 'ML / AI'),
        ('api', 'API'),
    ]
    title = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    tags = models.CharField(max_length=200, help_text="Comma-separated tags (e.g. React, Django)")
    category = models.CharField(max_length=10, choices=CATEGORY_CHOICES)
    live_link = models.URLField(blank=True, null=True)
    github_link = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.title

class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200, blank=True, null=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name} - {self.subject}"

class Experience(models.Model):
    year_range = models.CharField(max_length=50) 
    role = models.CharField(max_length=100)       
    company = models.CharField(max_length=100)    
    description = models.TextField()              
    order = models.IntegerField(default=0)        

    class Meta:
        ordering = ['order']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def __str__(self):
        return f"{self.role} at {self.company}"