package com.example.demo;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;

public class TaskServiceTest {

    @Test
    void shouldAddOneTask(){
        //given
        Task t1 = new Task("Aufräumen", "Zimmer aufräumen");
        RepoDB taskRepo = mock(RepoDB.class);
        TaskService taskService = new TaskService(taskRepo);
        //when
        taskService.addOneTaskToDo(t1);
        //then
        Mockito.verify(taskRepo).save(t1);
    }

    @Test
    void shouldListAllTasks(){
        //given
        Task t1 = new Task("Aufräumen", "Zimmer aufräumen");
        Task t2 = new Task("Abwaschen", "Dreckiges Geschirr abwaschen");
        RepoDB taskRepo = mock(RepoDB.class);
        when(taskRepo.findAll()).thenReturn(List.of(t1, t2));
        TaskService taskService = new TaskService(taskRepo);
        //when
        Collection<Task> actual = taskService.listAllTasks();
        //then
        Assertions.assertThat(actual)
                .isEqualTo(List.of(t1, t2));
        Assertions.assertThat(actual).hasSize(2);
    }

    @Test
    void shouldDeleteOneTask(){
        //given
        Task t1 = new Task("Aufräumen", "Zimmer aufräumen");
        RepoDB taskRepo = mock(RepoDB.class);
        TaskService taskService = new TaskService(taskRepo);
        //when
        taskService.deleteOneTaskById(t1.getId());
        //then
        Mockito.verify(taskRepo).deleteById(t1.getId());
    }

    @Test
    void shouldGetOneTask(){
        //given
        Task t1 = new Task("Aufräumen", "Zimmer aufräumen");
        Task t2 = new Task("Abwaschen", "Dreckiges Geschirr abwaschen");
        RepoDB taskRepo = mock(RepoDB.class);
        when(taskRepo.findById("1337")).thenReturn(Optional.of(t1));
        TaskService taskService = new TaskService(taskRepo);
        //when
        Task actual = taskService.getOneTask("1337").orElseThrow();
        //then
        Assertions.assertThat(actual).isEqualTo(t1);
    }

    @Test
    void shouldGetNoTask(){
        //given
        Task t1 = new Task("Aufräumen", "Zimmer aufräumen");
        Task t2 = new Task("Abwaschen", "Dreckiges Geschirr abwaschen");
        RepoDB taskRepo = mock(RepoDB.class);
        when(taskRepo.findById("1337")).thenReturn(Optional.of(t1));
        TaskService taskService = new TaskService(taskRepo);
        //when
        Optional<Task> actual = taskService.getOneTask("1336");
        //then
        Assertions.assertThat(actual).isNotIn(t1);
    }

    @Test
    void shouldEditTask(){
        //Given
        Task t1 = new Task("Aufräumen", "Zimmer aufräumen");
        Task t2 = new Task("Aufräumen", "Zimmer aufräumen");
        RepoDB taskRepo = mock(RepoDB.class);
        TaskService taskService = new TaskService(taskRepo);
        taskService.addOneTaskToDo(t1);
        //when
        t1.setTask("Bier trinken");
        t1.setDescription("Mit den Jungs");
        taskService.editOneTask(t1);
        String actual = t1.getTask() + " " + t1.getDescription();
        String expected = t2.getTask() + " " + t2.getDescription();
        //then
        Assertions.assertThat(actual).isNotEqualTo(expected);
    }

    @Test
    void shouldGetNextStatus(){
        //given
        Task t1 = new Task("Aufräumen", "Zimmer aufräumen");
        RepoDB taskRepo = mock(RepoDB.class);
        TaskService taskService = new TaskService(taskRepo);
        //when
        taskService.nextStatusOfTask(t1);
        taskService.nextStatusOfTask(t1);
        EnumStatus actual = t1.getStatus();
        //then
        Assertions.assertThat(actual).toString().equals("DONE");
    }
    @Test
    void shouldGetPrevStatus(){
        //given
        Task t1 = new Task("Aufräumen", "Zimmer aufräumen");
        RepoDB taskRepo = mock(RepoDB.class);
        TaskService taskService = new TaskService(taskRepo);
        //when
        taskService.nextStatusOfTask(t1);
        taskService.nextStatusOfTask(t1);
        taskService.prevStatusOfTask(t1);
        EnumStatus actual = t1.getStatus();
        //then
        Assertions.assertThat(actual).toString().equals("IN_PROGRESS");
    }


}
