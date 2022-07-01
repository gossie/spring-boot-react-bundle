package com.example.demo.user;


import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class MyUserController {


    private final MyUserService myUserService;
    private final PasswordEncoder encoder;

    @PostMapping
    public void postNewUser(@RequestBody MyUser newMyUser){
        String password = encoder.encode(newMyUser.getPassword());
        newMyUser.setPassword(password);
        myUserService.addNewUser(newMyUser);
    }

}
