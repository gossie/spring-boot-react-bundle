package com.example.demo.todo;

import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public class TodoRepository {

    private final Map<String, Todo> todos = new HashMap<>();

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
