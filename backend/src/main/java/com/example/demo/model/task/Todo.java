package com.example.demo.model.task;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "tasks")
public class Todo {
    @Id
    private String id;
    private String description;
    private String task;
    private TodoStatus status;
    private String creatorId;

    public Todo(TodoCreationData todo, String creatorId){
        this.task = todo.getTask();
        this.description = todo.getDescription();
        this.status = TodoStatus.OPEN;
        this.creatorId = creatorId;
    }

    public Todo setStatus(TodoStatus todoStatus){
        this.status = todoStatus;
        return this;
    }
}
