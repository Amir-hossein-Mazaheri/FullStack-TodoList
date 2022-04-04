from django.urls import path
from rest_framework_nested import routers

from . import views

router = routers.DefaultRouter()
router.register('todos', views.TodoViewSet)
router.register('todo-type', views.TodoTypeViewSet)

todo_router = routers.NestedDefaultRouter(router, 'todos', lookup='todo')
todo_router.register('sub-todos', views.SubTodoViewSet, basename='todo-sub')

urlpatterns = router.urls + todo_router.urls
