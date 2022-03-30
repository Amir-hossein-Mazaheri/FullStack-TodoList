from django.urls import path
from rest_framework_nested import routers

from . import views

router = routers.DefaultRouter()
router.register('todos', views.TodoViewSet)
router.register('todo-type', views.TodoTypeViewSet)
router.register('todo-item', views.TodoItemViewSet)

todo_router = routers.NestedDefaultRouter(router, 'todos', lookup='todo')
todo_router.register('sub-todos', views.SubTodoViewSet, basename='todo-sub')

# urlpatterns = [
#     path('todo/', views.TodoList.as_view()),
#     path('todo/<int:pk>', views.TodoDetail.as_view()),
#     path('todo-type/', views.TodoTypeList.as_view()),
#     path('todo-type/<int:pk>', views.TodoTypeDetail.as_view()),
# ]

urlpatterns = router.urls + todo_router.urls
