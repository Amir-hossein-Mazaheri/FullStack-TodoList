from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status

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
    queryset = Todo.objects.filter(is_removed=False).all()
    serializer_class = TodoSerializer

    def destroy(self, request, pk):
        return destroyWithIsRemoved(Todo, pk)


class TodoTypeViewSet(ModelViewSet):
    queryset = TodoType.objects.filter(
        is_removed=False).all()
    serializer_class = TodoTypeSerializer

    def destroy(self, request, pk):
        return destroyWithIsRemoved(TodoType, pk)


class SubTodoViewSet(ModelViewSet):
    serializer_class = SubTodoSerializer

    def get_queryset(self):
        return SubTodo.objects.filter(todo=self.kwargs['todo_pk'])

    def get_serializer_context(self):
        return {"todo_id": self.kwargs['todo_pk'], "request": self.request}
