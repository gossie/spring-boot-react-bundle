package com.example.demo;

public enum StatusEnum {

    OPEN("OPEN"),
    IN_PROGRESS("IN_PROGRESS"),
    DONE("DONE");

    private String status;

    StatusEnum(String status) {
        this.status = status;
    }

    public StatusEnum next() {
        switch (status) {
            case "OPEN" -> {
                return StatusEnum.IN_PROGRESS;
            }
            case "IN_PROGRESS" -> {
                return StatusEnum.DONE;
            }
            default -> {
                return this;
            }
        }
    }

    public StatusEnum prev() {
        switch (status) {
            case "IN_PROGRESS" -> {
                return StatusEnum.OPEN;
            }
            case "DONE" -> {
                return StatusEnum.IN_PROGRESS;
            }
            default -> {
                return this;
            }
        }
    }
}
