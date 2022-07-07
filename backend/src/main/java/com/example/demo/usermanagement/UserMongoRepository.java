package com.example.demo.usermanagement;

import com.example.demo.model.user.OutOfBrainUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserMongoRepository extends MongoRepository<OutOfBrainUser, String> {
    Optional<OutOfBrainUser> findByUsername(String username);

    Optional<OutOfBrainUser> findByGithubUserId(long githubUserId);
}
