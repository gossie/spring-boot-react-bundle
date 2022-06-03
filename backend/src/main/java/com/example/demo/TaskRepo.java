package com.example.demo;

import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

@Repository
public class TaskRepo {

    private HashMap<String, Task> allMyTasks = new HashMap<>();

    public TaskRepo(List<Task> tasks) {
        for (Task currentTask : tasks){
            allMyTasks.put(currentTask.getId(), currentTask);
        }
    }

    public void save(Task taskToAdd){
        allMyTasks.put(taskToAdd.getId(), taskToAdd);
    }
    public List<Task> list(){
        return allMyTasks.values().stream().toList();
    }

    public void delte(String id) {
        allMyTasks.remove(id);
    }

    public Task get(String id) {
        return allMyTasks.get(id);
    }
}






