package com.example.demo.todo;

import static org.assertj.core.api.Assertions.*;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import static org.mockito.Mockito.when;

import java.util.List;

class TodoControllerUnitTest {

    @Test
    void getTodos() {
        TodoService mockedTodoService = Mockito.mock(TodoService.class);
        var todo1 = new Todo("test todo 1", "todo 1", TodoStatus.OPEN);
        var todo2 = new Todo("test todo 2", "todo 2", TodoStatus.IN_PROGRESS);
        var todo3 = new Todo("test todo 3", "todo 3", TodoStatus.DONE);
        var todos = List.of(todo1, todo2, todo3);
        when(mockedTodoService.getAllTodos()).thenReturn(todos);
        TodoController todoController = new TodoController(mockedTodoService);

        var actual = todoController.getTodos();

        assertThat(actual).isEqualTo(todos);
    }

    @Test
    void addTodo() {
        TodoService mockedTodoService = Mockito.mock(TodoService.class);
        TodoController todoController = new TodoController(mockedTodoService);
        Todo todo1 = new Todo("test todo 1", "todo 1", TodoStatus.OPEN);
        todoController.addTodo(todo1);

        Mockito.verify(mockedTodoService).addTodo(todo1);
    }
}
