from django.db import models
from django.contrib.auth.models import User

class Topic(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.name

class Resource(models.Model):
    topic = models.ForeignKey(Topic, related_name='resources', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    url = models.URLField()
    description = models.TextField()

    def __str__(self):
        return self.title
