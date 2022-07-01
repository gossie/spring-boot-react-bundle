package com.example.demo.user;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class MyUser {

    @Id
    private String id;
    private String username;
    private String password;

}
