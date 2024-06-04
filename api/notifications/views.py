from rest_framework import viewsets
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status
from .models import Notifications
from .serializer import NotificationsSerializer
from files.File import File
import os


class NotificationsViewSet(viewsets.ModelViewSet):
    queryset = Notifications.objects.all()
    serializer_class = NotificationsSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            notification = serializer.save()
            pk = notification.id

            file = File(object_type="notification", pk=pk)
            pdf_path = file.generate_pdf()

            relative_path = os.path.relpath(pdf_path, settings.MEDIA_ROOT)
            notification.file_url = os.path.join(settings.MEDIA_URL, relative_path)
            notification.save()

            return Response(data={"message": "noti_created", "data": serializer.data}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

