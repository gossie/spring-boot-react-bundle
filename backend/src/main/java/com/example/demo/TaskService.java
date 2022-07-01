package com.example.demo;


import org.springframework.stereotype.Service;

import java.awt.*;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Optional;

@Service
public class TaskService {

    private final RepoDB taskRepo;

    public TaskService(RepoDB taskRepo) {
        this.taskRepo = taskRepo;
    }

    public void addOneTaskToDo(Task taskToAdd, Principal principal){
        taskToAdd.setUserId(principal.getName());
        taskRepo.save(taskToAdd);
    }

    public ArrayList<Task> listAllTasksById(Principal principal){
        return taskRepo.findAllByUserId(principal.getName());
    }


    public void deleteOneTaskById(String id) {
        taskRepo.deleteById(id);
    }

    public Optional<Task> getOneTask(String id) {
        return taskRepo.findById(id);
    }

    public void editOneTask(Task task) {
        taskRepo.save(task);
    }

    public void nextStatusOfTask(Task task) {
        task.setStatus(task.getStatus().next());
        taskRepo.save(task);
    }

    public void prevStatusOfTask(Task task) {
        task.setStatus(task.getStatus().prev());
        taskRepo.save(task);
    }
}
