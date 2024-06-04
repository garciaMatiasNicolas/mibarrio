from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models
from neighborhoods.prop_model import Properties
from users.models import Users


class Fines(models.Model):
    title = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    property = models.ForeignKey(Properties, on_delete=models.CASCADE, related_name='fines')
    file_url = models.URLField(max_length=200, blank=True, null=True)
    description = models.TextField()
    penalty = models.CharField(max_length=255)
    term = models.CharField(max_length=255)
    creator = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='fines')
    due_date = models.DateTimeField()
    image = models.ImageField(upload_to='media/assets/fines/', blank=True, null=True)
    observations = models.TextField()
    status = models.CharField(max_length=255, default="pending")
    type = models.CharField(max_length=250, default="fine1")
    
    # Relation to notification or fine
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, null=True, blank=True)
    object_id = models.PositiveIntegerField(null=True, blank=True)
    related_to = GenericForeignKey('content_type', 'object_id')

    def __str__(self):
        return f"Fine for Property {self.property.property_number}"
