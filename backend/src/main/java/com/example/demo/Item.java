package com.example.demo;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.UUID;

@Document(collection = "tasks")
@Data
@NoArgsConstructor
public class Item {
    @Id
    private String id;
    private String task;
    private String description;
    private StatusEnum status;

    public Item(String task, String description, StatusEnum status) {
        this.task = task;
        this.description = description;
        this.status = status;
    }
}
