from rest_framework import routers
from .views import FinesViewSet

router_fines = routers.DefaultRouter()
router_fines.register(r'fines', FinesViewSet, basename='fines')
