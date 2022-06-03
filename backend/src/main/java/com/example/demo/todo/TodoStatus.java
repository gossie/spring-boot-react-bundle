package com.example.demo.todo;

public enum TodoStatus {
OPEN, IN_PROGRESS, DONE;

    public TodoStatus toggleStatus(){
        if(this.toString().equals("OPEN")){
            return TodoStatus.IN_PROGRESS;
        }
        if(this.toString().equals("IN_PROGRESS")){
            return TodoStatus.DONE;
        }
        if(this.toString().equals("DONE")){
            return TodoStatus.OPEN;
        }
        throw new RuntimeException("enum toggleStatus failed");
    }
}
