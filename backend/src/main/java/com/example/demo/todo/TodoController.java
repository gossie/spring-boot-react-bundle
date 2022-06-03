package com.example.demo.todo;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/{id}")
    public ResponseEntity<Todo> getTodoById(@PathVariable String id){
        return ResponseEntity.of(todoService.getTodoById(id));
    }

    @PutMapping
    public ResponseEntity<Todo> saveTodoChanges(@RequestBody Todo todo){
        return ResponseEntity.of(Optional.ofNullable(todoService.saveTodoChanges(todo)));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void addTodo(@RequestBody Todo todo){
        // TODO add checks for missing fields?
        todoService.addTodo(todo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Todo> deleteTodo(@PathVariable String id){
        // TODO check for not existent

        return ResponseEntity.of(todoService.deleteTodo(id));
    }

    @PutMapping("/next")
    public ResponseEntity<Todo> moveTodoToNextStatus(@RequestBody Todo todo){

        return ResponseEntity.of(todoService.toggleTodoStatus(todo));
    }

}
