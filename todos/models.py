from django.db import models


class TodoType(models.Model):
    label = models.CharField(max_length=255)
    is_removed = models.BooleanField(default=False)

    def __str__(self):
        return self.label


class Todo(models.Model):
    STATUS_FINSHED = 'F'
    STATUS_DOING = 'D'
    STATUS_UNDONE = 'U'
    status_choices = [
        (STATUS_FINSHED, 'Finished'),
        (STATUS_DOING, 'Doing'),
        (STATUS_UNDONE, 'Undone'),
    ]
    title = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    deadline = models.DateTimeField()
    is_finished_before_deadline = models.BooleanField(default=False)
    status = models.CharField(max_length=1, choices=status_choices)
    is_removed = models.BooleanField(default=False)
    todo_type = models.ForeignKey(TodoType, on_delete=models.PROTECT)


class SubTodo(models.Model):
    todo = models.ForeignKey(
        Todo, on_delete=models.CASCADE, related_name='sub_todo')
    title = models.CharField(max_length=255)
    is_done = models.BooleanField(default=False)
