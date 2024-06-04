from rest_framework.serializers import ModelSerializer
from neighborhoods.models import Neighborhoods
from neighborhoods.prop_model import Properties

class NeighborhoodSerializer(ModelSerializer):

    class Meta:
        model = Neighborhoods
        exclude = ('architects', 'administrators', 'owners')


class PropertiesSerializer(ModelSerializer):

    class Meta:
        model = Properties
        fields = '__all__'