package com.example.demo;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class KanbanService {
    private final KanbanProjectRepo kanbanProjectRepo;
    public Collection<Item> getAllItems() {
        return kanbanProjectRepo.getAllItems();
    }
    public Item getItemById(String id) {
        return kanbanProjectRepo.getItemById(id).orElseThrow();
    }
    public Item editItem(Item item) {
        return kanbanProjectRepo.replaceItem(item).orElseThrow();
    }
    public Item moveToNext(Item item){
        StatusEnum newStatus = item.getStatus().next();
        item.setStatus(newStatus);
        return kanbanProjectRepo.replaceItem(item).orElseThrow();
    }
    public Item moveToPrev(Item item){
        StatusEnum newStatus = item.getStatus().prev();
        item.setStatus(newStatus);
        return kanbanProjectRepo.replaceItem(item).orElseThrow();
    }
    public void addItem(Item item) {
        kanbanProjectRepo.addItem(item);
    }

    public Item deleteItem(String id) {
        return kanbanProjectRepo.deleteItem(id).orElseThrow();
    }

}
