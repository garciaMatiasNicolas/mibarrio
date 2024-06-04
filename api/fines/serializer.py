from rest_framework import serializers
from fines.models import Fines
from django.contrib.contenttypes.models import ContentType
from notifications.models import Notifications


class GenericRelatedField(serializers.RelatedField):
    def to_representation(self, value):
        if isinstance(value, Notifications):
            return f"notification related: {value.id} - {value.title}"
        elif isinstance(value, Fines):
            return f"fine related: {value.id} - {value.title}"
        return "Unknown object"


class FineSerializer(serializers.ModelSerializer):
    related_to = GenericRelatedField(read_only=True)
    content_type = serializers.SlugRelatedField(slug_field='model', queryset=ContentType.objects.all())
    type = serializers.SerializerMethodField()
    
    class Meta:
        model = Fines
        exclude = ('file_url', 'created_at')
            
    def validate(self, data):
        content_type = data.get('content_type')
        object_id = data.get('object_id')
        if content_type and object_id:
            try:
                model = ContentType.objects.get(model=content_type.model).model_class()
                if not model.objects.filter(id=object_id).exists():
                    raise serializers.ValidationError("Object with this ID does not exist.")
            except ContentType.DoesNotExist:
                raise serializers.ValidationError("Invalid content type.")
        return data

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['property'] = {
            "id": instance.property.id,
            "number": instance.property.property_number,
            "owner": f"{instance.property.owner.first_name} {instance.property.owner.last_name}",
            "email": instance.property.owner.email,
            "neighborhood": instance.property.neighborhood.name,
            "address": f"{instance.property.neighborhood.address_street} {instance.property.neighborhood.address_number}, {instance.property.neighborhood.state}"
        } if instance.property else None
        return representation

    def get_related_to(self, obj):
        if obj.content_type and obj.object_id:
            model = obj.content_type.model_class()
            try:
                instance = model.objects.get(id=obj.object_id)
                if isinstance(instance, Notifications):
                    return "type1"
                elif isinstance(instance, Fines):
                    return "type2"
            except model.DoesNotExist:
                return None
        return None


    


