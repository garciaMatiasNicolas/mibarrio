from rest_framework import serializers
from users.models import Users
from neighborhoods.models import Neighborhoods
from neighborhoods.prop_model import Properties

class UserSerializer(serializers.ModelSerializer):
    neighborhood = serializers.PrimaryKeyRelatedField(queryset=Neighborhoods.objects.all(), required=False, allow_null=True)
    property_number = serializers.IntegerField(write_only=True, required=False, allow_null=True) 
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = Users
        fields = ['id', 'email', 'first_name', 'last_name', 'dni', 'user_type', 'profile_photo', 'neighborhood', 'property_number', 'created_at', 'email_is_confirmed', 'is_admin', 'password']
        read_only_fields = ['id', 'created_at', 'is_admin']

    def create(self, validated_data):
        password = validated_data.pop('password')
        neighborhood = validated_data.pop('neighborhood', None)
        property_number = validated_data.pop('property_number', None)
        
        user = Users.objects.create_user(password=password, **validated_data)

        # Asociar usuario a un barrio y crear propiedad si se proporciona
        if neighborhood:
            if user.user_type == 'owner':
                # Crear propiedad para el propietario
                if property_number is not None:
                    property = Properties.objects.create(property_number=property_number, neighborhood=neighborhood, owner=user)
                    property.save()
                
                neighborhood.owners.add(user)
            elif user.user_type == 'architect':
                neighborhood.architects.add(user)
            elif user.user_type == 'administrator':
                neighborhood.administrators.add(user)

        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        if password:
            instance.set_password(password)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance