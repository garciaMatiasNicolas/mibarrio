from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from users.models import Users
from users.serializer import UserSerializer

class UsersModelViewSet(ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UserSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        users = self.get_serializer(queryset, many=True)
        return Response(users.data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        user_data = self.get_serializer(data=request.data)

        if user_data.is_valid():
            user_data.save()
            return Response({"message": "user_created"}, status=status.HTTP_201_CREATED)
        
        else:
            return Response(user_data.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs) 