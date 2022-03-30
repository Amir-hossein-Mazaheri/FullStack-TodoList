from rest_framework import serializers

from .models import Todo, TodoType, SubTodo, TodoItem


class SubTodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubTodo
        fields = ['id', 'title', 'is_done']

    def create(self, validated_data):
        todo_id = self.context['todo_id']
        return SubTodo.objects.create(todo_id=todo_id, **validated_data)


class SubTodoGroupAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubTodo
        fields = ['sub_todo_ids']
    sub_todo_ids = serializers.ListField()


class TodoSerializer(serializers.ModelSerializer):
    sub_todos = serializers.IntegerField(read_only=True)

    class Meta:
        model = Todo
        fields = ['id', 'title', 'description', 'created_at',
                  'deadline', 'is_finished_before_deadline', 'status', 'is_removed', 'todo_type', 'sub_todos']


class TodoTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoType
        fields = ['id', 'label', 'is_removed']

    is_removed = serializers.BooleanField(write_only=True)


class TodoItemListSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoItem
        fields = ['id', 'todo', 'sub_todos', 'todo_type']

    todo = TodoSerializer(read_only=True)
    todo_type = TodoTypeSerializer(read_only=True)
    sub_todos = SubTodoSerializer(many=True, read_only=True)


class TodoItemCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoItem
        fields = ['id', 'todo', 'sub_todos', 'todo_type']
