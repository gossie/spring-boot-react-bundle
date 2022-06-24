package com.example.demo.todo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoMongoRepository extends MongoRepository<Todo, String> {

}