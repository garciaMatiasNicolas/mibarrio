from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from neighborhoods.models import Neighborhoods
from neighborhoods.serializer import NeighborhoodSerializer, PropertiesSerializer
from neighborhoods.prop_model import Properties


class NeighborhoodlViewSet(ModelViewSet):
    queryset = Neighborhoods.objects.all()
    serializer_class = NeighborhoodSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        users = self.get_serializer(queryset, many=True)
        return Response(users.data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        user_data = self.get_serializer(data=request.data)

        if user_data.is_valid():
            user_data.save()
            return Response(user_data.data, status=status.HTTP_201_CREATED)
        
        else:
            return Response(user_data.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs) 
    

class PropertieslViewSet(ModelViewSet):
    queryset = Properties.objects.all()
    serializer_class = PropertiesSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        users = self.get_serializer(queryset, many=True)
        return Response(users.data, status=status.HTTP_200_OK)
