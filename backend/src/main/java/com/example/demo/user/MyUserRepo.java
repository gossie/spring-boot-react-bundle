package com.example.demo.user;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface MyUserRepo extends MongoRepository<MyUser, String> {

    Optional<MyUser> findByUsername(String username);
}
