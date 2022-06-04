package com.example.demo;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
public class Item {
    private final String id = UUID.randomUUID().toString();
    private String task;
    private String description;
    private StatusEnum status;
}
