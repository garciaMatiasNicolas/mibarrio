from django.contrib import admin
from django.urls import path, include
from users.router import router_users
from fines.router import router_fines
from neighborhoods.router import router_neighborhood, router_props
from notifications.router import router_notification


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router_users.urls)), # USERS URLS #
    path('api/authentication/', include('users.auth_urls')), # AUTH URLS #
    path('api/', include(router_fines.urls)), # FINES URLS #
    path('api/', include(router_neighborhood.urls)), # NEIGHBORHOODS URLS #
    path('api/', include(router_notification.urls)), # NOTIFICATION URLS #
    path('api/', include(router_props.urls)), # PROPERTIES URLS #
]
