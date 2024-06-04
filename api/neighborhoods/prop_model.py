from django.db import models
from .models import Neighborhoods
from users.models import Users


class Properties(models.Model):
    property_number = models.IntegerField()
    neighborhood = models.ForeignKey(Neighborhoods, on_delete=models.CASCADE, related_name='properties')
    owner = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='properties')

    def __str__(self):
        return f"Property {self.property_number} - {self.neighborhood.name}"