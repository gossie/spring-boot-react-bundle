package com.example.demo.todo;

import com.example.demo.model.task.Todo;
import com.example.demo.model.task.TodoCreationData;
import com.example.demo.model.user.OutOfBrainUser;
import com.example.demo.usermanagement.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/kanban")
public class TodoController {

    private final UserService userService;
    private final TodoService todoService;

    @GetMapping
    public List<Todo> getTodos(Principal principal){
        OutOfBrainUser user = userService.findByUsername(principal.getName()).orElseThrow();
        return todoService.getAllTodos(user.getId());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Todo> getTodoById(@PathVariable String id, Principal principal){
        OutOfBrainUser user = userService.findByUsername(principal.getName()).orElseThrow();
        return ResponseEntity.of(todoService.getTodoById(id, user.getId()));
    }


    /**
     * @param todo as RequestBody
     * @return ResponseEntity body is the previously saved version
     */
    @PutMapping
    public ResponseEntity<Todo> saveTodoChanges(@RequestBody Todo todo, Principal principal){
        OutOfBrainUser user = userService.findByUsername(principal.getName()).orElseThrow();
        if(todo.getTask()==null || todo.getTask().equals("")){
            return ResponseEntity.badRequest().body(todo);
        }
        return ResponseEntity.of(Optional.ofNullable(todoService.saveTodoChanges(todo, user.getId())));
    }

    @PostMapping
    public ResponseEntity<Void> addTodo(@RequestBody TodoCreationData todo, Principal principal){
        OutOfBrainUser user = userService.findByUsername(principal.getName()).orElseThrow();
        if(todo.getTask()==null || todo.getTask().equals("")){
            return ResponseEntity.badRequest().build();
        }
        todoService.addTodo(todo, user.getId());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable String id, Principal principal){
        OutOfBrainUser user = userService.findByUsername(principal.getName()).orElseThrow();
        if(todoService.deleteTodo(id, user.getId())){
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/next")
    public ResponseEntity<Todo> moveTodoToNextStatus(@RequestBody Todo todo, Principal principal){
        OutOfBrainUser user = userService.findByUsername(principal.getName()).orElseThrow();
        try {
            return ResponseEntity.of(todoService.nextTodoStatus(todo, user.getId()));
        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
    }
    @PutMapping("/prev")
    public ResponseEntity<Todo> moveTodoToPrevStatus(@RequestBody Todo todo, Principal principal){
        OutOfBrainUser user = userService.findByUsername(principal.getName()).orElseThrow();
        return ResponseEntity.of(todoService.prevTodoStatus(todo, user.getId()));
    }

}
