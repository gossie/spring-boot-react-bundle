package com.example.demo.model.user;

import com.example.demo.model.security.GithubUser;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class OutOfBrainUser {
    @Id
    private String id;
    private long githubUserId;
    private String username;
    private String password;
    private List<String> roles = new ArrayList<>();

    public OutOfBrainUser(String username, String password) {
        this.username = username;
        this.password = password;
        roles.add("user");
    }

    public OutOfBrainUser(GithubUser githubUser){
        githubUserId = githubUser.getId();
        username = githubUser.getLogin();
        roles = List.of("user");
    }
}
