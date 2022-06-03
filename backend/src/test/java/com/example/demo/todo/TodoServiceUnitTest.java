package com.example.demo.todo;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class TodoServiceUnitTest {

    @Test
    void getAllTodos() {

        TodoRepository mockedTodoRepository = Mockito.mock(TodoRepository.class);
        var todo1 = new Todo("test todo 1", "todo 1", TodoStatus.OPEN);
        var todo2 = new Todo("test todo 2", "todo 2", TodoStatus.IN_PROGRESS);
        var todo3 = new Todo("test todo 3", "todo 3", TodoStatus.DONE);
        var todos = List.of(todo1, todo2, todo3);
        when(mockedTodoRepository.findAll()).thenReturn(todos);
        TodoService todoService = new TodoService(mockedTodoRepository);

        var actual = todoService.getAllTodos();

        assertThat(actual).isEqualTo(todos);
    }

    @Test
    void addTodo() {
        TodoRepository mockedTodoRepository = Mockito.mock(TodoRepository.class);
        TodoService todoService = new TodoService(mockedTodoRepository);
        Todo todo1 = new Todo("test todo 1", "todo 1", TodoStatus.OPEN);

        todoService.addTodo(todo1);

        Mockito.verify(mockedTodoRepository).save(todo1);
    }
    @Test
    void deleteTodo() {
        TodoRepository mockedTodoRepository = Mockito.mock(TodoRepository.class);
        TodoService todoService = new TodoService(mockedTodoRepository);
        Todo todo1 = new Todo("test todo 1", "todo 1", TodoStatus.OPEN);

        todoService.deleteTodo(todo1.getId());

        Mockito.verify(mockedTodoRepository).delete(todo1.getId());
    }
}