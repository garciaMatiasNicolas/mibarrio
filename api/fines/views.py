from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from fines.serializer import FineSerializer
from fines.models import Fines
from rest_framework.response import Response
from django.contrib.contenttypes.models import ContentType
from django.core.exceptions import ObjectDoesNotExist

class FinesViewSet(ModelViewSet): 
    serializer_class = FineSerializer
    queryset = Fines.objects.all()

    def list(self, request, *args, **kwargs):
        # user_id = request.user.id

        queryset = self.get_queryset()
        fines = self.get_serializer(queryset, many=True)
        return Response(data=fines.data, status=status.HTTP_200_OK)
    
    def create(self, request, *args, **kwargs):
        data_of_new_fine = self.get_serializer(data=request.data)

        if data_of_new_fine.is_valid():
            content_type = request.data.get('content_type')
            object_id = request.data.get('object_id')
            if content_type and object_id:
                try:
                    content_type_obj = ContentType.objects.get(model=content_type.lower())
                    related_object = content_type_obj.get_object_for_this_type(id=object_id)
                    
                    data_of_new_fine.save()
                    new_fine = data_of_new_fine.instance
                    new_fine.content_type = content_type_obj
                    new_fine.object_id = related_object.id
                    new_fine.save()
                except ContentType.DoesNotExist:
                    return Response(data={'error': 'content_type_invalid'}, status=status.HTTP_400_BAD_REQUEST)
                except ObjectDoesNotExist:
                    return Response(data={'error': 'object_id_invalid'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                data_of_new_fine.save()
            return Response(data={'message': 'fine_saved'}, status=status.HTTP_201_CREATED)
    
        return Response(data={'error': 'fine_data_invalid', 'logs': data_of_new_fine.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)
    
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)
    
    
