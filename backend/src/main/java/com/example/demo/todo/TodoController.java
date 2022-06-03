package com.example.demo.todo;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public void addTodo(@RequestBody Todo todo){
        todoService.addTodo(todo);
    }

}
