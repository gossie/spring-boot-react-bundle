package com.example.demo.todo;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class TodoIntegrationTest {
    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void integrationTest(){
        // initial get todos via api should be empty
        ResponseEntity<Todo[]> responseEntity = restTemplate.getForEntity("/api/kanban", Todo[].class);
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseEntity.getBody()).isEmpty();

        // add 3 todos via api
        Todo todo1 = new Todo("test todo 1", "todo 1", TodoStatus.OPEN);
        Todo todo2 = new Todo("test todo 2", "todo 2", TodoStatus.IN_PROGRESS);
        Todo todo3 = new Todo("test todo 3", "todo 3", TodoStatus.DONE);
        var todos = new Todo[]{todo1, todo2, todo3};
        for(Todo t: todos){
            ResponseEntity<Todo> responseEntityPost = restTemplate.postForEntity("/api/kanban", t, Todo.class);
            assertThat(responseEntityPost.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        }

        // find those todos again via api
        responseEntity = restTemplate.getForEntity("/api/kanban", Todo[].class);
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseEntity.getBody()).containsExactlyInAnyOrderElementsOf(Arrays.asList(todos));

        // delete one todo
        restTemplate.delete("/api/kanban/" + todo3.getId());

        // check if deleted
        responseEntity = restTemplate.getForEntity("/api/kanban", Todo[].class);
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseEntity.getBody()).containsExactlyInAnyOrderElementsOf(List.of(todo1, todo2));

        // delete todo2 with restTemplate.exchange for statusCode etc
        var deleteResponse = restTemplate.exchange("/api/kanban/{id}", HttpMethod.DELETE, new HttpEntity<>(todo2), Todo.class, todo2.getId());
        assertThat(deleteResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(deleteResponse.getBody()).isEqualTo(todo2);

        // check if deleted
        responseEntity = restTemplate.getForEntity("/api/kanban", Todo[].class);
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseEntity.getBody()).containsExactlyInAnyOrderElementsOf(List.of(todo1));

        // try to delete not existent todo
        deleteResponse = restTemplate.exchange("/api/kanban/{id}", HttpMethod.DELETE, new HttpEntity<>(todo2), Todo.class, todo2.getId());
        assertThat(deleteResponse.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
        assertThat(deleteResponse.getBody()).isNull();

    }
}
