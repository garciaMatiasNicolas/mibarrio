from rest_framework import serializers
from .models import Notifications


class NotificationsSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(read_only=True)
    file_url = serializers.URLField(read_only=True)
    image = serializers.ImageField(read_only=True)
    due_date = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Notifications
        fields = ['id', 'title', 'created_at', 'property', 'file_url', 'penalty', 'term', 'creator', 'due_date', 'image',
                  'observations', 'status', 'description']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.property:
            owner = instance.property.owner
            neighborhood = instance.property.neighborhood
            representation['property'] = {
                "id": instance.property.id,
                "number": instance.property.property_number,
                "owner": f"{owner.first_name} {owner.last_name}",
                "email": owner.email, 
                "neighborhood": neighborhood.name,
                "address": f"{neighborhood.address_street} {neighborhood.address_number}, {neighborhood.state}"
            } if owner else None
        else:
            representation['property'] = None
        return representation


