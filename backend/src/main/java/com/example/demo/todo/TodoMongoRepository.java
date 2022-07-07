package com.example.demo.todo;

import com.example.demo.model.task.Todo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TodoMongoRepository extends MongoRepository<Todo, String> {
    List<Todo> findAllByCreatorId(String creatorId);
    Optional<Todo> findByIdAndCreatorId(String id, String creatorId);

    boolean existsByIdAndCreatorId(String id, String creatorId);
}