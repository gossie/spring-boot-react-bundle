package com.example.demo;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping("/kanban")
    @ResponseStatus(HttpStatus.CREATED)
    public void postTask(@RequestBody Task task){
        taskService.addOneTaskToDo(task);
    }
    @GetMapping("/kanban")
    public List<Task> getAllTasks(){
        return taskService.listAllTasks();
    }
    @DeleteMapping("/kanban/{id}")
    public void deleteTask(@PathVariable String id){
        taskService.deleteOneTaskById(id);
    }
    @GetMapping("/kanban/{id}")
    public Optional<Task> getTask(@PathVariable String id){
        return taskService.getOneTask(id);
    }

    @PutMapping("/kanban")
    public void editTask(@RequestBody Task task){
        taskService.editOneTask(task);
    }
    @PutMapping("/kanban/next")
    public void nextStatus(@RequestBody Task task){
        taskService.nextStatusOfTask(task);
    }
    @PutMapping("/kanban/prev")
    public void prevStatus(@RequestBody Task task){
        taskService.prevStatusOfTask(task);
    }

}
