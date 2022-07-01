package com.example.demo;


import com.example.demo.user.MyUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


import java.util.ArrayList;

@Repository
public interface RepoDB extends MongoRepository<Task, String> {


    ArrayList<Task> findAllByUserId(String username);


}
