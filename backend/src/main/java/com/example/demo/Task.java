package com.example.demo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.UUID;

@Data
@Document(collection = "tasks")
public class Task {

    private  String id;
    private  String task;
    private  String description;
    private  EnumStatus status = EnumStatus.OPEN;

    public Task(@JsonProperty String task, String discription) {
        this.task = task;
        this.description = discription;
        id = UUID.randomUUID().toString();
    }
}


