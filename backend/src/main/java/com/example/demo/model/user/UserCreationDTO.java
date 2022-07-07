package com.example.demo.model.user;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserCreationDTO {
    private String username;
    private String password;
    private String passwordAgain;
}
