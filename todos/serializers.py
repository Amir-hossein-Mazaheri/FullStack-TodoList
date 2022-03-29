from rest_framework import serializers
from .models import Todo, TodoType, SubTodo


class SubTodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubTodo
        fields = ['id', 'title', 'is_done']

    def create(self, validated_data):
        todo_id = self.context['todo_id']
        return SubTodo.objects.create(todo_id=todo_id, **validated_data)


class TodoSerializer(serializers.ModelSerializer):
    sub_todos = serializers.IntegerField(read_only=True)

    class Meta:
        model = Todo
        fields = ['id', 'title', 'description', 'created_at',
                  'deadline', 'is_finished_before_deadline', 'status', 'is_removed', 'todo_type', 'sub_todos']

    def create(self, validated_data):
        print("\n validated data : ", validated_data, "\n")
        print(validated_data['todo_type'], type(validated_data['todo_type']))
        return Todo.objects.create(**validated_data)


class TodoTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoType
        fields = ['id', 'label', 'is_removed']
