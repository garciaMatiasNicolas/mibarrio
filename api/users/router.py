from rest_framework import routers
from .views import UsersModelViewSet

router_users = routers.DefaultRouter()
router_users.register(r'users', UsersModelViewSet, basename='users')
