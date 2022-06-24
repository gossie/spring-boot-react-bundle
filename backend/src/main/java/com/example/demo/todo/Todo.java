package com.example.demo.todo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "tasks")
public class Todo {
    @Id
    private String id;
    private String description;
    private String task;
    private TodoStatus status;

    public Todo setStatus(TodoStatus todoStatus){
        this.status = todoStatus;
        return this;
    }
}
