package com.example.demo;

public enum EnumStatus {

    OPEN("OPEN"),
    IN_PROGRESS("IN_PROGRESS"),
    DONE("DONE");

    private String status;

    EnumStatus(String status) {
        this.status = status;
    }

    public EnumStatus next(){
        if (this.status.equals("OPEN")){
            return IN_PROGRESS;
        } else {
            return DONE;
        }
    }
    public EnumStatus prev(){
        if (this.status.equals("DONE")){
            return IN_PROGRESS;
        } else {
            return OPEN;
        }
    }

}
