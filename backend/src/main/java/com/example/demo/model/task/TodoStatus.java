package com.example.demo.model.task;

public enum TodoStatus {
OPEN, IN_PROGRESS, DONE;

    public TodoStatus toggleStatus(){
        if(this==OPEN){
            return TodoStatus.IN_PROGRESS;
        }
        if(this==IN_PROGRESS){
            return TodoStatus.DONE;
        }
        if(this==DONE){
            return TodoStatus.OPEN;
        }
        throw new RuntimeException("enum toggleStatus failed");
    }
}
