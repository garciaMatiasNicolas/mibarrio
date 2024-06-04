from django.db import models
from users.models import Users


class Neighborhoods(models.Model):
    name = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    address_street = models.CharField(max_length=255)
    address_number = models.IntegerField()
    owners = models.ManyToManyField(Users, related_name='neighborhoods_as_owner', limit_choices_to={'user_type': 'owner'})
    architects = models.ManyToManyField(Users, related_name='neighborhoods_as_architect', limit_choices_to={'user_type': 'architect'})
    administrators = models.ManyToManyField(Users, related_name='neighborhoods_as_admin', limit_choices_to={'user_type': 'administrator'})
    logo = models.ImageField(upload_to="media/assets/logos/", blank=True, null=True)

    def __str__(self):
        return self.name
