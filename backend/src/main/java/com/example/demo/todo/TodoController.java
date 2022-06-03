package com.example.demo.todo;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
