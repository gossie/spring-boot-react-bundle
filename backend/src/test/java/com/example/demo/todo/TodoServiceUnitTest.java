package com.example.demo.todo;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

class TodoServiceUnitTest {

    @Test
    void getAllTodos() {

        TodoMongoRepository mockedTodoRepository = Mockito.mock(TodoMongoRepository.class);
        var todo1 = new Todo("1", "test todo 1", "todo 1", TodoStatus.OPEN);
        var todo2 = new Todo("2", "test todo 2", "todo 2", TodoStatus.IN_PROGRESS);
        var todo3 = new Todo("3", "test todo 3", "todo 3", TodoStatus.DONE);
        var todos = List.of(todo1, todo2, todo3);
        when(mockedTodoRepository.findAll()).thenReturn(todos);
        TodoService todoService = new TodoService(mockedTodoRepository);

        var actual = todoService.getAllTodos();

        assertThat(actual).isEqualTo(todos);
    }

    @Test
    void addTodo() {
        TodoMongoRepository mockedTodoRepository = Mockito.mock(TodoMongoRepository.class);
        TodoService todoService = new TodoService(mockedTodoRepository);
        Todo todo1 = new Todo("1", "test todo 1", "todo 1", TodoStatus.OPEN);

        todoService.addTodo(todo1);

        Mockito.verify(mockedTodoRepository).save(todo1);
    }
    @Test
    void deleteTodo() {// TODO delete has now return -> test this
        TodoMongoRepository mockedTodoRepository = Mockito.mock(TodoMongoRepository.class);
        TodoService todoService = new TodoService(mockedTodoRepository);
        Todo todo1 = new Todo("1", "test todo 1", "todo 1", TodoStatus.OPEN);
        when(mockedTodoRepository.existsById(todo1.getId())).thenReturn(true);

        todoService.deleteTodo(todo1.getId());

        Mockito.verify(mockedTodoRepository).deleteById(todo1.getId());
    }

    @Test
    void nextTodoStatus() {

        TodoMongoRepository mockedTodoRepository = Mockito.mock(TodoMongoRepository.class);
        TodoService todoService = new TodoService(mockedTodoRepository);
        Todo todo1 = new Todo("1", "test todo 1", "todo 1", TodoStatus.OPEN);
        when(mockedTodoRepository.findById(todo1.getId())).thenReturn(Optional.of(todo1));
        when(mockedTodoRepository.save(todo1)).thenReturn(todo1);

        Optional<Todo> todoReturn = todoService.nextTodoStatus(todo1);

        assertThat(todoReturn.get()).extracting(Todo::getId).isEqualTo(todo1.getId());
        assertThat(todoReturn.get()).extracting(Todo::getStatus).isEqualTo(TodoStatus.IN_PROGRESS);

        todoReturn = todoService.nextTodoStatus(todo1);

        assertThat(todoReturn.get()).extracting(Todo::getId).isEqualTo(todo1.getId());
        assertThat(todoReturn.get()).extracting(Todo::getStatus).isEqualTo(TodoStatus.DONE);

        todoReturn = todoService.nextTodoStatus(todo1);

        assertThat(todoReturn.get()).extracting(Todo::getId).isEqualTo(todo1.getId());
        assertThat(todoReturn.get()).extracting(Todo::getStatus).isEqualTo(TodoStatus.OPEN);

    }

    @Test
    void prevTodoStatus() {

        TodoMongoRepository mockedTodoRepository = Mockito.mock(TodoMongoRepository.class);
        TodoService todoService = new TodoService(mockedTodoRepository);
        Todo todo1 = new Todo("1", "test todo 1", "todo 1", TodoStatus.OPEN);
        when(mockedTodoRepository.findById(todo1.getId())).thenReturn(Optional.of(todo1));
        when(mockedTodoRepository.save(todo1)).thenReturn(todo1);

        Optional<Todo> todoReturn = todoService.prevTodoStatus(todo1);

        assertThat(todoReturn.get()).extracting(Todo::getId).isEqualTo(todo1.getId());
        assertThat(todoReturn.get()).extracting(Todo::getStatus).isEqualTo(TodoStatus.DONE);
    }

    @Test
    void getTodoById() {
        TodoMongoRepository mockedTodoRepository = Mockito.mock(TodoMongoRepository.class);
        TodoService todoService = new TodoService(mockedTodoRepository);
        Todo todo1 = new Todo("1", "test todo 1", "todo 1", TodoStatus.OPEN);

        when(mockedTodoRepository.findById(todo1.getId())).thenReturn(Optional.ofNullable(todo1));

        var actual = todoService.getTodoById(todo1.getId());

        assertThat(actual.get()).isEqualTo(todo1);
    }

    @Test // not really useful because todo1 is the same object the whole time ;)
    void saveTodoChanges() {
        TodoMongoRepository mockedTodoRepository = Mockito.mock(TodoMongoRepository.class);
        TodoService todoService = new TodoService(mockedTodoRepository);
        Todo todo1 = new Todo("1", "test todo 1", "todo 1", TodoStatus.OPEN);

        when(mockedTodoRepository.findById(todo1.getId())).thenReturn(Optional.ofNullable(todo1));
        when(mockedTodoRepository.save(todo1)).thenReturn(todo1);

        var actual = todoService.saveTodoChanges(todo1);

        assertThat(actual).isEqualTo(todo1);
        verify(mockedTodoRepository).findById(todo1.getId());
        verify(mockedTodoRepository).save(todo1);
    }
}