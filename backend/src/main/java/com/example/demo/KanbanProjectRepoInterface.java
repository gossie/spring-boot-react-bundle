package com.example.demo;

import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KanbanProjectRepoInterface extends MongoRepository<Item, String> {


}
