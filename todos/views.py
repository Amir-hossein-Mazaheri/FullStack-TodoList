from asyncio.windows_events import NULL
from django.db.models import Q
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .serializers import TodoSerializer, TodoTypeSerializer, SubTodoSerializer
from .models import Todo, TodoType, SubTodo


# only changes is_removed property to True and not delete the data from database
def destroyWithIsRemoved(model, pk):
    model_copy = model.objects.get(pk=pk)
    if model_copy.is_removed:
        return Response({"message": f"item with id {pk} is already removed"},
                        status=status.HTTP_208_ALREADY_REPORTED)

    model_copy.is_removed = True
    model_copy.save()
    return Response({"message": f"item with id {pk} is removed"}, status=status.HTTP_200_OK)


class TodoViewSet(ModelViewSet):
    serializer_class = TodoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Todo.objects.filter(is_removed=False, user=self.request.user).all()

    # sends user object to serializer
    def get_serializer_context(self):
        inherited_return_dic = super().get_serializer_context()
        return {**inherited_return_dic, "user": self.request.user}

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def destroy(self, request, pk):
        return destroyWithIsRemoved(Todo, pk)


class TodoTypeViewSet(ModelViewSet):
    serializer_class = TodoTypeSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return TodoType.objects.filter(is_removed=False).\
            filter(Q(user=None) | Q(user=self.request.user)).all()

    def get_serializer_context(self):
        inherited_return_dic = super().get_serializer_context()
        return {**inherited_return_dic, "user": self.request.user}

    def destroy(self, request, pk):
        return destroyWithIsRemoved(TodoType, pk)


class SubTodoViewSet(ModelViewSet):
    serializer_class = SubTodoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return SubTodo.objects.filter(todo=self.kwargs['todo_pk'])

    def get_serializer_context(self):
        return {"todo_id": self.kwargs['todo_pk'], "request": self.request}
