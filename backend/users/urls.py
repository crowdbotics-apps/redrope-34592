from django.urls import path, include
from rest_framework.routers import DefaultRouter
from users.viewsets import UserViewset, MyEventViewset, NotificationViewset

router = DefaultRouter()

router.register("my-events", MyEventViewset, basename="my_events")
router.register("notifications", NotificationViewset, basename="notifications")
router.register("", UserViewset, basename="users")

from users.viewsets import (
    user_redirect_view,
    user_update_view,
    user_detail_view,
)

app_name = "users"

urlpatterns = [
    path("", include(router.urls)),
    path("~redirect/", view=user_redirect_view, name="redirect"),
    path("~update/", view=user_update_view, name="update"),
    path("<str:username>/", view=user_detail_view, name="detail"),
]
