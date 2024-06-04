from rest_framework import routers
from .views import NotificationsViewSet

router_notification = routers.DefaultRouter()
router_notification.register(r'notification', NotificationsViewSet, basename='notification')