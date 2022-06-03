package com.example.demo;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.Collection;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class TaskServiceTest {

    @Test
    void shouldListAllTasks(){
        //given
        Task t1 = new Task("Aufräumen", "Zimmer aufräumen");
        Task t2 = new Task("Abwaschen", "Dreckiges Geschirr abwaschen");
        TaskRepo taskRepo = mock(TaskRepo.class);
        when(taskRepo.list()).thenReturn(List.of(t1, t2));
        TaskService taskService = new TaskService(taskRepo);
        //when
        Collection<Task> actual = taskService.listAllTasks();
        //then
        Assertions.assertThat(actual)
                .isEqualTo(List.of(t1, t2));
    }

    @Test
    void shouldGetOneTask(){
        //given
        Task t1 = new Task("Aufräumen", "Zimmer aufräumen");
        Task t2 = new Task("Abwaschen", "Dreckiges Geschirr abwaschen");
        TaskRepo taskRepo = mock(TaskRepo.class);
        when(taskRepo.get("1337")).thenReturn(t1);
        TaskService taskService = new TaskService(taskRepo);
        //when
        Task actual = taskService.getOneTask("1337");
        //then
        Assertions.assertThat(actual).isEqualTo(t1);
    }

    @Test
    void shouldGetNoTask(){
        //given
        Task t1 = new Task("Aufräumen", "Zimmer aufräumen");
        Task t2 = new Task("Abwaschen", "Dreckiges Geschirr abwaschen");
        TaskRepo taskRepo = mock(TaskRepo.class);
        when(taskRepo.get("1337")).thenReturn(t1);
        TaskService taskService = new TaskService(taskRepo);
        //when
        Task actual = taskService.getOneTask("1336");
        //then
        Assertions.assertThat(actual);
    }


}
