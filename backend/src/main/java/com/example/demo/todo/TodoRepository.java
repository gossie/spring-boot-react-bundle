package com.example.demo.todo;

import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public class TodoRepository {

    private final Map<String, Todo> todos = new HashMap<>();

    public TodoRepository(){
        var todo1 = new Todo("test todo 1", "todo 1", TodoStatus.OPEN);
        var todo11 = new Todo("test todo 11", "todo 11", TodoStatus.OPEN);
        var todo2 = new Todo("test todo 2", "todo 2", TodoStatus.IN_PROGRESS);
        var todo3 = new Todo("test todo 3", "todo 3", TodoStatus.DONE);
        save(todo1);
        save(todo2);
        save(todo3);

        save(todo11);
    }

    public List<Todo> findAll(){
        return todos.values().stream().toList();
    }

    public Todo save(Todo todo) {
        return todos.put(todo.getId(), todo);
    }

    public Optional<Todo> delete(String id) {
        return Optional.ofNullable(todos.remove(id));
    }

    public Optional<Todo> findById(String id) {
        return Optional.ofNullable(todos.get(id));
    }
}
