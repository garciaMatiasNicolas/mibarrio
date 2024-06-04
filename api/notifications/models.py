from django.db import models
from users.models import Users
from neighborhoods.prop_model import Properties


class Notifications(models.Model):
    title = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    description = models.TextField(blank=True, null=True)
    property = models.ForeignKey(Properties, on_delete=models.CASCADE, related_name='notifications')
    file_url = models.URLField(max_length=200)
    penalty = models.CharField(max_length=255)
    term = models.CharField(max_length=255)
    creator = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='notifications')
    due_date = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='media/assets/notifications/', blank=True, null=True)
    observations = models.TextField()
    status = models.CharField(max_length=255, default="pending")

    def __str__(self):
        return f"Notification for Property {self.property.property_number}"
