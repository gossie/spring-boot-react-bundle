package com.example.demo;


import com.example.demo.user.LoginData;
import com.example.demo.user.LoginResponse;
import com.example.demo.user.MyUser;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;

import static com.example.demo.EnumStatus.IN_PROGRESS;
import static com.example.demo.EnumStatus.OPEN;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class TaskControllerIT {

    @Autowired
    private TestRestTemplate testRestTemplate;

    @Test
    void shouldTestTheController(){

        //addUser
        MyUser user1 = new MyUser();
        user1.setUsername("Hans");
        user1.setPassword("123");
        ResponseEntity<Void> loginResponse = testRestTemplate.postForEntity("/api/user", user1, Void.class);
        Assertions.assertThat(loginResponse.getStatusCode()).isEqualTo(HttpStatus.OK);

        //loginUser
        LoginData loginData = new LoginData();
        loginData.setUsername("Hans");
        loginData.setPassword("123");
        ResponseEntity<LoginResponse> loginResponseResponseEntity = testRestTemplate.postForEntity("/api/login", loginData, LoginResponse.class);
        Assertions.assertThat(loginResponseResponseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        Assertions.assertThat(loginResponseResponseEntity.getBody().getToken()).isNotBlank();

        //addTasks
        var token = loginResponseResponseEntity.getBody().getToken();
        Task t1 = new Task("essen","viel", "Hans");
        Task t2 = new Task("einkaufen","bisschen","Hans");
        Task t3 = new Task("putzen","bad","Hans");
        ResponseEntity<Void> postResponse1 = testRestTemplate.exchange("/api/kanban", HttpMethod.POST, new HttpEntity<>(t1, createHeader(token)), Void.class);
        ResponseEntity<Void> postResponse2 = testRestTemplate.exchange("/api/kanban", HttpMethod.POST, new HttpEntity<>(t2, createHeader(token)), Void.class);
        ResponseEntity<Void> postResponse3 = testRestTemplate.exchange("/api/kanban", HttpMethod.POST, new HttpEntity<>(t3, createHeader(token)), Void.class);
        Assertions.assertThat(postResponse1.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        Assertions.assertThat(postResponse2.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        Assertions.assertThat(postResponse3.getStatusCode()).isEqualTo(HttpStatus.CREATED);

        //getAllTaskById
        ResponseEntity<Task[]> getResponse = testRestTemplate.exchange("/api/kanban", HttpMethod.GET, new HttpEntity<>(createHeader(token)), Task[].class);
        Assertions.assertThat(getResponse.getBody()).hasSize(3);

        //getOneById
        ResponseEntity<Task> getOneResponse = testRestTemplate.exchange("/api/kanban/" + t1.getId(), HttpMethod.GET, new HttpEntity<>(createHeader(token)), Task.class);
        Assertions.assertThat(getOneResponse.getBody()).isEqualTo(t1);

        //promoteTask
        testRestTemplate.exchange("/api/kanban/next", HttpMethod.PUT, new HttpEntity<>(t1, createHeader(token)), Void.class);
        ResponseEntity<Task> getNextResponse = testRestTemplate.exchange("/api/kanban/" + t1.getId(), HttpMethod.GET, new HttpEntity<>(createHeader(token)), Task.class);
        Assertions.assertThat(getNextResponse.getBody().getStatus()).isEqualTo(IN_PROGRESS);

        //demoteTask
        testRestTemplate.exchange("/api/kanban/prev", HttpMethod.PUT, new HttpEntity<>(t1, createHeader(token)), Void.class);
        ResponseEntity<Task> getPrevResponse = testRestTemplate.exchange("/api/kanban/" + t1.getId(), HttpMethod.GET, new HttpEntity<>(createHeader(token)), Task.class);
        Assertions.assertThat(getPrevResponse.getBody().getStatus()).isEqualTo(OPEN);

        //editTask
        ResponseEntity<Void> editResponse = testRestTemplate.exchange("/api/kanban", HttpMethod.PUT, new HttpEntity<>(t1, createHeader(token)), Void.class);
    }

    private HttpHeaders createHeader(String token){
        String headerValue = "Bearer " + token;
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set("Authorization", headerValue);
        return httpHeaders;
    }

}
