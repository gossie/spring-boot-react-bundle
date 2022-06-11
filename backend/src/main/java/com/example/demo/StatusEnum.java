package com.example.demo;

public enum StatusEnum {

    OPEN,
    IN_PROGRESS,
    DONE;

    public StatusEnum next() {
        switch (this) {
            case OPEN -> {
                return StatusEnum.IN_PROGRESS;
            }
            case IN_PROGRESS -> {
                return StatusEnum.DONE;
            }
            default -> {
                return this;
            }
        }
    }

    public StatusEnum prev() {
        switch (this) {
            case IN_PROGRESS -> {
                return StatusEnum.OPEN;
            }
            case DONE -> {
                return StatusEnum.IN_PROGRESS;
            }
            default -> {
                return this;
            }
        }
    }
}
