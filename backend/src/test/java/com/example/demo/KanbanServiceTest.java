package com.example.demo;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

class KanbanServiceTest {

    @Test
    void shouldSucceedOnAddMethodCall() {
        Item item = new Item("Projekt1", "Beschreibung Projekt 1", StatusEnum.OPEN);

        KanbanProjectRepo kanbanProjectRepo = Mockito.mock(KanbanProjectRepo.class);

        KanbanService kanbanService = new KanbanService(kanbanProjectRepo);
        kanbanService.addItem(item);

        Mockito.verify(kanbanProjectRepo).addItem(item);
    }

    @Test
    void shouldReturnCollectionOfAllItems() {
        Item item1 = new Item("Projekt1", "Beschreibung Projekt 1", StatusEnum.OPEN);
        Item item2 = new Item("Projekt2", "Beschreibung Projekt 2", StatusEnum.OPEN);

        KanbanProjectRepo kanbanProjectRepo = Mockito.mock(KanbanProjectRepo.class);
        Mockito.when(kanbanProjectRepo.getAllItems())
                .thenReturn(List.of(item1, item2));

        KanbanService kanbanService = new KanbanService(kanbanProjectRepo);
        Assertions.assertThat(kanbanService.getAllItems())
                .isUnmodifiable()
                .contains(item1, item2);
    }

    @Test
    void shouldReturnCorrectItemStatusAfterMovedToNext() {
        Item item = new Item("Projekt1", "Beschreibung Projekt 1", StatusEnum.OPEN);

        KanbanProjectRepo kanbanProjectRepo = Mockito.mock(KanbanProjectRepo.class);
        Mockito.when(kanbanProjectRepo.replaceItem(item)).thenReturn(Optional.of(item));

        KanbanService kanbanService = new KanbanService(kanbanProjectRepo);

        kanbanService.moveToNext(item);

        Mockito.verify(kanbanProjectRepo).replaceItem(item);
        Assertions.assertThat(item.getStatus()).isEqualTo(StatusEnum.IN_PROGRESS);
    }

    @Test
    void shouldReturnCorrectItemStatusAfterMovedToPrev() {
        Item item = new Item("Projekt1", "Beschreibung Projekt 1", StatusEnum.IN_PROGRESS);

        KanbanProjectRepo kanbanProjectRepo = Mockito.mock(KanbanProjectRepo.class);
        Mockito.when(kanbanProjectRepo.replaceItem(item)).thenReturn(Optional.of(item));

        KanbanService kanbanService = new KanbanService(kanbanProjectRepo);

        kanbanService.moveToPrev(item);

        Mockito.verify(kanbanProjectRepo).replaceItem(item);
        Assertions.assertThat(item.getStatus()).isEqualTo(StatusEnum.OPEN);
    }

    @Test
    void shouldReturnItemById() {
        Item item = new Item("Projekt1", "Beschreibung Projekt 1", StatusEnum.OPEN);

        KanbanProjectRepo kanbanProjectRepo = Mockito.mock(KanbanProjectRepo.class);

        Mockito.when(kanbanProjectRepo.getItemById("1234")).thenReturn(Optional.of(item));

        KanbanService kanbanService = new KanbanService(kanbanProjectRepo);
        Assertions.assertThat(kanbanService.getItemById("1234")).isEqualTo(item);
    }

    @Test
    void shouldEditItem() {
        Item item = new Item("Projekt1", "Beschreibung Projekt 1", StatusEnum.OPEN);

        KanbanProjectRepo kanbanProjectRepo = Mockito.mock(KanbanProjectRepo.class);
        Mockito.when(kanbanProjectRepo.replaceItem(item)).thenReturn(Optional.of(item));

        KanbanService kanbanService = new KanbanService(kanbanProjectRepo);

        kanbanService.editItem(item);

        Mockito.verify(kanbanProjectRepo).replaceItem(item);

    }

    @Test
    void shouldDeleteItem() {
        Item item = new Item("Projekt1", "Beschreibung Projekt 1", StatusEnum.OPEN);

        KanbanProjectRepo kanbanProjectRepo = Mockito.mock(KanbanProjectRepo.class);
        Mockito.when(kanbanProjectRepo.deleteItem("1234")).thenReturn(Optional.of(item));

        KanbanService kanbanService = new KanbanService(kanbanProjectRepo);

        Item returnedItem = kanbanService.deleteItem("1234");

        Mockito.verify(kanbanProjectRepo).deleteItem("1234");
        Assertions.assertThat(returnedItem).isEqualTo(item);
    }

}