package com.example.demo;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Objects;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class KanbanControllerIT {

    @Autowired
    TestRestTemplate restTemplate;

    @Test
    void shouldAddItemsAndReturnListOfAllItems() {
        Item item1 = new Item("Project1", "Project1 description", StatusEnum.OPEN);
        Item item2 = new Item("Project2", "Project2 description", StatusEnum.OPEN);
        ResponseEntity<Void> response1 = restTemplate.postForEntity("/api/kanban", item1, Void.class);
        Assertions.assertThat(response1.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        ResponseEntity<Void> response2 = restTemplate.postForEntity("/api/kanban", item2, Void.class);
        Assertions.assertThat(response2.getStatusCode()).isEqualTo(HttpStatus.CREATED);

        ResponseEntity<Item[]> resultList = restTemplate.getForEntity("/api/kanban", Item[].class);

        Assertions.assertThat(resultList.getStatusCode()).isEqualTo(HttpStatus.OK);
        Assertions.assertThat(resultList.getBody()).contains(item1, item2);
    }

    @Test
    void shouldChangeStatusOfItemAndReturnCorrectNewStatusNext() {
        Item item1 = new Item("Project1", "Project1 description", StatusEnum.OPEN);
        ResponseEntity<Void> response1 = restTemplate.postForEntity("/api/kanban", item1, Void.class);
        Assertions.assertThat(response1.getStatusCode()).isEqualTo(HttpStatus.CREATED);

        restTemplate.put("/api/kanban/next", item1, Void.class);

        ResponseEntity<Item[]> resultListProgress = restTemplate.getForEntity("/api/kanban", Item[].class);
        Assertions.assertThat(resultListProgress.getStatusCode()).isEqualTo(HttpStatus.OK);
        Assertions.assertThat(Objects.requireNonNull(resultListProgress.getBody())[0].getStatus()).isEqualTo(StatusEnum.IN_PROGRESS);

        Item changedItem = Objects.requireNonNull(restTemplate.getForEntity("/api/kanban", Item[].class).getBody())[0];
        restTemplate.put("/api/kanban/next", changedItem, Void.class);

        ResponseEntity<Item[]> resultListDone = restTemplate.getForEntity("/api/kanban", Item[].class);
        Assertions.assertThat(resultListDone.getStatusCode()).isEqualTo(HttpStatus.OK);
        Assertions.assertThat(Objects.requireNonNull(resultListDone.getBody())[0].getStatus()).isEqualTo(StatusEnum.DONE);
    }

    @Test
    void shouldChangeStatusOfItemAndReturnCorrectNewStatusPrev() {
        Item item1 = new Item("Project1", "Project1 description", StatusEnum.OPEN);
        ResponseEntity<Void> response1 = restTemplate.postForEntity("/api/kanban", item1, Void.class);
        Assertions.assertThat(response1.getStatusCode()).isEqualTo(HttpStatus.CREATED);

        restTemplate.put("/api/kanban/next", item1, Void.class);

        ResponseEntity<Item[]> resultListProgress = restTemplate.getForEntity("/api/kanban", Item[].class);
        Assertions.assertThat(resultListProgress.getStatusCode()).isEqualTo(HttpStatus.OK);
        Assertions.assertThat(Objects.requireNonNull(resultListProgress.getBody())[0].getStatus()).isEqualTo(StatusEnum.IN_PROGRESS);

        Item changedItem = Objects.requireNonNull(restTemplate.getForEntity("/api/kanban", Item[].class).getBody())[0];
        restTemplate.put("/api/kanban/prev", changedItem, Void.class);

        ResponseEntity<Item[]> resultListDone = restTemplate.getForEntity("/api/kanban", Item[].class);
        Assertions.assertThat(resultListDone.getStatusCode()).isEqualTo(HttpStatus.OK);
        Assertions.assertThat(Objects.requireNonNull(resultListDone.getBody())[0].getStatus()).isEqualTo(StatusEnum.OPEN);
    }

    @Test
    void shouldAddItemsReturnCorrectItemByIdAndEditThisItem() {
        Item item1 = new Item("Project1", "Project1 description", StatusEnum.OPEN);
        Item item2 = new Item("Project2", "Project2 description", StatusEnum.OPEN);
        ResponseEntity<Void> response1 = restTemplate.postForEntity("/api/kanban", item1, Void.class);
        Assertions.assertThat(response1.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        ResponseEntity<Void> response2 = restTemplate.postForEntity("/api/kanban", item2, Void.class);
        Assertions.assertThat(response2.getStatusCode()).isEqualTo(HttpStatus.CREATED);

        ResponseEntity<Item> resultItem = restTemplate.getForEntity("/api/kanban/" + item1.getId(), Item.class);
        Assertions.assertThat(resultItem.getStatusCode()).isEqualTo(HttpStatus.OK);
        Assertions.assertThat(resultItem.getBody()).isEqualTo(item1);

        Objects.requireNonNull(resultItem.getBody()).setTask("Project1Edited");

        restTemplate.put("/api/kanban", resultItem, Void.class);

        ResponseEntity<Item> editedItem = restTemplate.getForEntity("/api/kanban/" + item1.getId(), Item.class);
        Assertions.assertThat(editedItem.getStatusCode()).isEqualTo(HttpStatus.OK);
        Assertions.assertThat(Objects.requireNonNull(editedItem.getBody()).getTask()).isEqualTo("Project1Edited");
    }

    @Test
    void shouldAddAndDeleteItems() {
        Item item1 = new Item("Project1", "Project1 description", StatusEnum.OPEN);
        Item item2 = new Item("Project2", "Project2 description", StatusEnum.OPEN);
        ResponseEntity<Void> response1 = restTemplate.postForEntity("/api/kanban", item1, Void.class);
        Assertions.assertThat(response1.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        ResponseEntity<Void> response2 = restTemplate.postForEntity("/api/kanban", item2, Void.class);
        Assertions.assertThat(response2.getStatusCode()).isEqualTo(HttpStatus.CREATED);

        ResponseEntity<Item[]> resultListFull = restTemplate.getForEntity("/api/kanban", Item[].class);

        Assertions.assertThat(resultListFull.getStatusCode()).isEqualTo(HttpStatus.OK);
        Assertions.assertThat(resultListFull.getBody()).contains(item1, item2);

        restTemplate.delete("/api/kanban/" + item1.getId());

        ResponseEntity<Item[]> resultList = restTemplate.getForEntity("/api/kanban", Item[].class);

        Assertions.assertThat(resultList.getStatusCode()).isEqualTo(HttpStatus.OK);
        Assertions.assertThat(resultList.getBody()).contains(item2);

    }

    @Test
    void shouldGetMultipleNotFoundForDifferentMethods() {

        ResponseEntity<Item[]> result = restTemplate.getForEntity("/api/kanban/unknown", Item[].class);
        Assertions.assertThat(result.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);

    }

}