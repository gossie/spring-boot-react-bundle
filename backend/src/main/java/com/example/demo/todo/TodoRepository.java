package com.example.demo.todo;

import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class TodoRepository {

    private final Map<String, Todo> todos = new HashMap<>();

    public TodoRepository(){

//        var todo1 = new Todo("test todo 1", "todo 1", TodoStatus.OPEN);
//        var todo2 = new Todo("test todo 2", "todo 2", TodoStatus.IN_PROGRESS);
//        var todo3 = new Todo("test todo 3", "todo 3", TodoStatus.DONE);
//
//        todos.put(todo1.getId(), todo1);
//        todos.put(todo2.getId(), todo2);
//        todos.put(todo3.getId(), todo3);

    }

    public List<Todo> findAll(){
        return todos.values().stream().toList();
    }

    public void save(Todo todo) {
        todos.put(todo.getId(), todo);
    }
}
