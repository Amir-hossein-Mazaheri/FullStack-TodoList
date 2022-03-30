from rest_framework import serializers

from .models import Todo, TodoType, SubTodo, TodoItem


class SubTodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubTodo
        fields = ['id', 'title', 'is_done']


class SubTodoGroupAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubTodo
        fields = ['sub_todos']

    sub_todos = serializers.ListField(write_only=True)

    def create(self, validated_data):
        todo_id = self.context['todo_id']
        todo_instance = Todo.objects.get(pk=int(todo_id))
        todos_count = len(validated_data['sub_todos'])
        for sub_todo in validated_data['sub_todos']:
            SubTodo.objects.create(**sub_todo, todo=todo_instance)
        return SubTodo.objects.all().reverse()[:todos_count]


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
