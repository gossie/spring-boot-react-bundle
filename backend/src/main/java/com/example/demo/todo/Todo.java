package com.example.demo.todo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Todo {
    private final String id = UUID.randomUUID().toString();
    private String description;
    private String task;
    private TodoStatus status;

}
