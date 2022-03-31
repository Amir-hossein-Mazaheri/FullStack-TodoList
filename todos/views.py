from django.db.models import F, Q
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status

from .serializers import TodoSerializer, TodoTypeSerializer, SubTodoSerializer, \
    TodoItemCreateSerializer, TodoItemListSerializer

from .models import Todo, TodoType, SubTodo, TodoItem


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


class TodoItemViewSet(ModelViewSet):
    queryset = TodoItem.objects.all()
    serializer_class = TodoItemCreateSerializer

    def list(self, request):
        serializer = TodoItemListSerializer(self.queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = TodoItemCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, *args, **kwargs):
        queryset = TodoItem.objects.get(pk=kwargs['pk'])
        serializer = TodoItemListSerializer(queryset)
        return Response(serializer.data, status=status.HTTP_200_OK)
