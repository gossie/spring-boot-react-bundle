package com.example.demo;


import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepo taskRepo;

    public TaskService(TaskRepo taskRepo) {
        this.taskRepo = taskRepo;
    }

    public void addOneTaskToDo(Task taskToAdd){
        taskRepo.save(taskToAdd);
    }

    public List<Task> listAllTasks(){
        return taskRepo.list();
    }


    public void deleteOneTaskById(String id) {
        taskRepo.delte(id);
    }

    public Task getOneTask(String id) {
        return taskRepo.get(id);
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
