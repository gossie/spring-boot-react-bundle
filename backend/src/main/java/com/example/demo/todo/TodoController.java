package com.example.demo.todo;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/kanban")
public class TodoController {

    private final TodoService todoService;

    @GetMapping
    public List<Todo> getTodos(){
        return todoService.getAllTodos();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void addTodo(@RequestBody Todo todo){
        // TODO add checks for missing fields?
        todoService.addTodo(todo);
    }

    @DeleteMapping("/{id}")
    public Optional<Todo> deleteTodo(@PathVariable String id){
        // TODO check for not existent
        return todoService.deleteTodo(id);
    }

}
