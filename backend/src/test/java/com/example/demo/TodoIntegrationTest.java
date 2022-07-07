package com.example.demo;

import com.example.demo.model.security.LoginData;
import com.example.demo.model.security.LoginResponse;
import com.example.demo.model.task.TodoCreationData;
import com.example.demo.model.user.UserCreationDTO;
import com.example.demo.model.task.Todo;
import com.example.demo.model.task.TodoStatus;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class TodoIntegrationTest {
    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void integrationTest(){
        ResponseEntity<Todo[]> todoArrayResponse;
        ResponseEntity<Todo> todoResponse;

        ResponseEntity<Void> userCreationResponse = restTemplate.postForEntity("/api/user", new UserCreationDTO("user", "pw", "pw"), Void.class);
        assertThat(userCreationResponse.getStatusCode()).isEqualTo(HttpStatus.CREATED);

        ResponseEntity<LoginResponse> loginResponse = restTemplate.postForEntity("/api/login", new LoginData("user", "pw"), LoginResponse.class);
        String jwt = loginResponse.getBody().getToken();

        todoArrayResponse = standardGetAllTasks(jwt);

        // initial get todos via api should be empty
        assertThat(todoArrayResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(todoArrayResponse.getBody()).isEmpty();

        // add 3 todos via api
        TodoCreationData todo1 = new TodoCreationData("todo 1", "desc todo 1");
        TodoCreationData todo2 = new TodoCreationData("todo 2", "desc todo 2");
        TodoCreationData todo3 = new TodoCreationData("todo 3", "desc todo 3");
        for(TodoCreationData t: List.of(todo1, todo2, todo3)){
            todoResponse = restTemplate.postForEntity("/api/kanban", new HttpEntity<>(t, createHeaders(jwt)), Todo.class);
            assertThat(todoResponse.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        }

        // add bad todo
        TodoCreationData todoForBadRequest = new TodoCreationData(null, null);
        todoResponse = restTemplate.postForEntity("/api/kanban", new HttpEntity<>(todoForBadRequest, createHeaders(jwt)), Todo.class);
        assertThat(todoResponse.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);

        todoForBadRequest = new TodoCreationData("", "");
        todoResponse = restTemplate.postForEntity("/api/kanban", new HttpEntity<>(todoForBadRequest, createHeaders(jwt)), Todo.class);
        assertThat(todoResponse.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);

        // find those todos again via api
        todoArrayResponse = standardGetAllTasks(jwt);
        assertThat(todoArrayResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(todoArrayResponse.getBody()).extracting(Todo::getTask)
                .containsExactlyInAnyOrderElementsOf(List.of(todo1.getTask(), todo2.getTask(), todo3.getTask()));

        String task3id = Arrays.stream(todoArrayResponse.getBody()).filter(todo -> todo.getTask().equals("todo 3")).map(Todo::getId).findFirst().get();
        // delete one todo
        ResponseEntity emptyResponse = restTemplate.exchange(
                "/api/kanban/" + task3id,
                HttpMethod.DELETE,
                new HttpEntity<>(createHeaders(jwt)),
                Void.class
        );
        // check if deleted
        todoArrayResponse = standardGetAllTasks(jwt);
        assertThat(todoArrayResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
//        assertThat(todoArrayResponse.getBody()).containsExactlyInAnyOrderElementsOf(List.of(new Todo(todo1), new Todo(todo2)));
        assertThat(todoArrayResponse.getBody()).extracting(Todo::getTask)
                .containsExactlyInAnyOrderElementsOf(List.of(todo1.getTask(), todo2.getTask()));

//        // try to delete not existent todo
        var tmp = restTemplate.exchange(
                "/api/kanban/" + task3id,
                HttpMethod.DELETE,
                new HttpEntity<>(createHeaders(jwt)),
                Void.class
        );
        emptyResponse = restTemplate.exchange(
                "/api/kanban/" + task3id,
                HttpMethod.DELETE,
                new HttpEntity<>(createHeaders(jwt)),
                Void.class
        );
        assertThat(emptyResponse.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);

        Todo task2 = Arrays.stream(todoArrayResponse.getBody()).filter(todo -> todo.getTask().equals("todo 2")).findFirst().get();

        // move task to next status
        todoResponse = restTemplate.exchange("/api/kanban/next", HttpMethod.PUT, new HttpEntity<>(task2,createHeaders(jwt)), Todo.class);
        assertThat(todoResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        // using getTodoById api here
        todoResponse = restTemplate.exchange(
                "/api/kanban/" + task2.getId(),
                HttpMethod.GET,
                new HttpEntity<>(createHeaders(jwt)),
                Todo.class
        );
        assertThat(todoResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(todoResponse.getBody().getStatus()).isEqualTo(TodoStatus.IN_PROGRESS);

        // move task to prev status
        todoResponse = restTemplate.exchange("/api/kanban/prev", HttpMethod.PUT, new HttpEntity<>(task2,createHeaders(jwt)), Todo.class);
        assertThat(todoResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        // using getTodoById api here
        todoResponse = restTemplate.exchange(
                "/api/kanban/" + task2.getId(),
                HttpMethod.GET,
                new HttpEntity<>(createHeaders(jwt)),
                Todo.class
        );
        assertThat(todoResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(todoResponse.getBody().getStatus()).isEqualTo(TodoStatus.OPEN);



        // same but for todo not in db
        todoResponse = restTemplate.exchange("/api/kanban/next", HttpMethod.PUT, new HttpEntity<>(new Todo(),createHeaders(jwt)), Todo.class);
        assertThat(todoResponse.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);

        // getTodoById for not existent
        todoResponse = restTemplate.exchange(
                "/api/kanban/" + "notvalidid",
                HttpMethod.GET,
                new HttpEntity<>(createHeaders(jwt)),
                Todo.class
        );
        assertThat(todoResponse.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
        assertThat(todoResponse.getBody()).isNull();

        // change todo1 and save to db
        task2.setTask("the new task");
        todoResponse = restTemplate.exchange("/api/kanban", HttpMethod.PUT, new HttpEntity<>(task2, createHeaders(jwt)), Todo.class);
        assertThat(todoResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(todoResponse.getBody().getId()).isEqualTo(task2.getId());
        todoResponse = restTemplate.exchange(
                "/api/kanban/" + task2.getId(),
                HttpMethod.GET,
                new HttpEntity<>(createHeaders(jwt)),
                Todo.class
        );        assertThat(todoResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(todoResponse.getBody().getTask()).isEqualTo("the new task");


        // try to save task changes not in db
        Todo testTodo = Todo.builder().id("test").task("test task").build();
        todoResponse = restTemplate.exchange("/api/kanban", HttpMethod.PUT, new HttpEntity<>(testTodo, createHeaders(jwt)), Todo.class);
        assertThat(todoResponse.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
        assertThat(todoResponse.getBody()).isNull();

        // get new jwt for new user and tasks should be empty now
        userCreationResponse = restTemplate.postForEntity("/api/user", new UserCreationDTO("user2", "pw", "pw"), Void.class);
        assertThat(userCreationResponse.getStatusCode()).isEqualTo(HttpStatus.CREATED);

        loginResponse = restTemplate.postForEntity("/api/login", new LoginData("user2", "pw"), LoginResponse.class);
        jwt = loginResponse.getBody().getToken();

        todoArrayResponse = standardGetAllTasks(jwt);

        assertThat(todoArrayResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(todoArrayResponse.getBody()).isEmpty();

    }

    private ResponseEntity<Todo[]> standardGetAllTasks(String jwt){
        return restTemplate.exchange(
                "/api/kanban",
                HttpMethod.GET,
                new HttpEntity<>(createHeaders(jwt)),
                Todo[].class
        );
    }
    private HttpHeaders createHeaders(String jwt) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + jwt);
        return headers;
    }
}
