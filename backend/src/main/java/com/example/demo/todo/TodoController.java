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


    /**
     * @param todo as RequestBody
     * @return ResponseEntity body is the previously saved version
     */
    @PutMapping
    public ResponseEntity<Todo> saveTodoChanges(@RequestBody Todo todo){
        return ResponseEntity.of(Optional.ofNullable(todoService.saveTodoChanges(todo)));
    }

    @PostMapping
    public ResponseEntity<Todo> addTodo(@RequestBody Todo todo){
        if(todo.getTask()==null || todo.getTask().equals("")){
            return ResponseEntity.badRequest().body(todo);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(todoService.addTodo(todo));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Todo> deleteTodo(@PathVariable String id){
        // TODO check for not existent

        return ResponseEntity.of(todoService.deleteTodo(id));
    }

    @PutMapping("/next")
    public ResponseEntity<Todo> moveTodoToNextStatus(@RequestBody Todo todo){

        return ResponseEntity.of(todoService.nextTodoStatus(todo));
    }
    @PutMapping("/prev")
    public ResponseEntity<Todo> moveTodoToPrevStatus(@RequestBody Todo todo){

        return ResponseEntity.of(todoService.prevTodoStatus(todo));
    }

}
