package com.example.demo.user;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MyUserService {

    public final MyUserRepo myUserRepo;
    public void addNewUser(MyUser newMyUser) {
        myUserRepo.save(newMyUser);
    }
}
