from rest_framework import routers
from .views import NeighborhoodlViewSet, PropertieslViewSet

router_neighborhood = routers.DefaultRouter()
router_neighborhood.register(r'neighborhood', NeighborhoodlViewSet, basename='neighborhood')

router_props = routers.DefaultRouter()
router_props.register(r'properties', PropertieslViewSet, basename='properties')