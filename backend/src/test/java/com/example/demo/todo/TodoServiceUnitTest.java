package com.example.demo.todo;

import com.example.demo.model.task.Todo;
import com.example.demo.model.task.TodoCreationData;
import com.example.demo.model.task.TodoStatus;
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
        var todo1 = new Todo("1", "test todo 1", "todo 1", TodoStatus.OPEN, "1");
        var todo2 = new Todo("2", "test todo 2", "todo 2", TodoStatus.IN_PROGRESS, "1");
        var todo3 = new Todo("3", "test todo 3", "todo 3", TodoStatus.DONE, "1");
        var todos = List.of(todo1, todo2, todo3);
        when(mockedTodoRepository.findAllByCreatorId("1")).thenReturn(todos);
        TodoService todoService = new TodoService(mockedTodoRepository);

        var actual = todoService.getAllTodos("1");

        assertThat(actual).isEqualTo(todos);
    }

    @Test
    void addTodo() {
        TodoMongoRepository mockedTodoRepository = Mockito.mock(TodoMongoRepository.class);
        TodoService todoService = new TodoService(mockedTodoRepository);
        TodoCreationData todo1 = new TodoCreationData("test todo 1", "todo 1");

        todoService.addTodo(todo1, "1");

        Mockito.verify(mockedTodoRepository).save(new Todo(todo1, "1"));
    }
    @Test
    void deleteTodo() {// TODO delete has now return -> test this
        TodoMongoRepository mockedTodoRepository = Mockito.mock(TodoMongoRepository.class);
        TodoService todoService = new TodoService(mockedTodoRepository);
        Todo todo1 = new Todo("1", "test todo 1", "todo 1", TodoStatus.OPEN, "1");
        when(mockedTodoRepository.existsByIdAndCreatorId(todo1.getId(), "1")).thenReturn(true);

        todoService.deleteTodo(todo1.getId(), "1");

        Mockito.verify(mockedTodoRepository).deleteById(todo1.getId());
    }

    @Test
    void nextTodoStatus() {

        TodoMongoRepository mockedTodoRepository = Mockito.mock(TodoMongoRepository.class);
        TodoService todoService = new TodoService(mockedTodoRepository);
        Todo todo1 = new Todo("1", "test todo 1", "todo 1", TodoStatus.OPEN, "1");
        when(mockedTodoRepository.findByIdAndCreatorId(todo1.getId(), "1")).thenReturn(Optional.of(todo1));
        when(mockedTodoRepository.save(todo1)).thenReturn(todo1);

        Optional<Todo> todoReturn = todoService.nextTodoStatus(todo1, "1");

        assertThat(todoReturn.get()).extracting(Todo::getId).isEqualTo(todo1.getId());
        assertThat(todoReturn.get()).extracting(Todo::getStatus).isEqualTo(TodoStatus.IN_PROGRESS);

        todoReturn = todoService.nextTodoStatus(todo1, "1");

        assertThat(todoReturn.get()).extracting(Todo::getId).isEqualTo(todo1.getId());
        assertThat(todoReturn.get()).extracting(Todo::getStatus).isEqualTo(TodoStatus.DONE);

        todoReturn = todoService.nextTodoStatus(todo1, "1");

        assertThat(todoReturn.get()).extracting(Todo::getId).isEqualTo(todo1.getId());
        assertThat(todoReturn.get()).extracting(Todo::getStatus).isEqualTo(TodoStatus.OPEN);

    }

    @Test
    void prevTodoStatus() {

        TodoMongoRepository mockedTodoRepository = Mockito.mock(TodoMongoRepository.class);
        TodoService todoService = new TodoService(mockedTodoRepository);
        Todo todo1 = new Todo("1", "test todo 1", "todo 1", TodoStatus.OPEN, "1");
        when(mockedTodoRepository.findByIdAndCreatorId(todo1.getId(), "1")).thenReturn(Optional.of(todo1));
        when(mockedTodoRepository.save(todo1)).thenReturn(todo1);

        Optional<Todo> todoReturn = todoService.prevTodoStatus(todo1, "1");

        assertThat(todoReturn.get()).extracting(Todo::getId).isEqualTo(todo1.getId());
        assertThat(todoReturn.get()).extracting(Todo::getStatus).isEqualTo(TodoStatus.DONE);
    }

    @Test
    void getTodoById() {
        TodoMongoRepository mockedTodoRepository = Mockito.mock(TodoMongoRepository.class);
        TodoService todoService = new TodoService(mockedTodoRepository);
        Todo todo1 = new Todo("1", "test todo 1", "todo 1", TodoStatus.OPEN, "1");

        when(mockedTodoRepository.findByIdAndCreatorId(todo1.getId(), "1")).thenReturn(Optional.ofNullable(todo1));

        var actual = todoService.getTodoById(todo1.getId(), "1");

        assertThat(actual.get()).isEqualTo(todo1);
    }

    @Test // not really useful because todo1 is the same object the whole time ;)
    void saveTodoChanges() {
        TodoMongoRepository mockedTodoRepository = Mockito.mock(TodoMongoRepository.class);
        TodoService todoService = new TodoService(mockedTodoRepository);
        Todo todo1 = new Todo("1", "test todo 1", "todo 1", TodoStatus.OPEN, "1");

        when(mockedTodoRepository.findByIdAndCreatorId(todo1.getId(), "1")).thenReturn(Optional.ofNullable(todo1));
        when(mockedTodoRepository.save(todo1)).thenReturn(todo1);

        var actual = todoService.saveTodoChanges(todo1, "1");

        assertThat(actual).isEqualTo(todo1);
        verify(mockedTodoRepository).findByIdAndCreatorId(todo1.getId(), "1");
        verify(mockedTodoRepository).save(todo1);
    }
}