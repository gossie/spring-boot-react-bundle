package com.example.demo;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
@RequiredArgsConstructor
public class KanbanService {
    private final KanbanProjectRepo kanbanProjectRepo;
    public Collection<Item> getAllItems() {
        return kanbanProjectRepo.findAll();
    }
    public Item getItemById(String id) {
        return kanbanProjectRepo.findById(id).orElseThrow();
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
    public Item addItem(Item item) {
        if(!kanbanProjectRepo.findByTaskAndDescription(item.getTask(), item.getDescription()).isEmpty()) {
            throw new RuntimeException("Identical inputs detected");
        }

        if("".equals(item.getTask()) || "".equals(item.getDescription())) {
            throw new RuntimeException("Empty inputs detected");
        }
        return kanbanProjectRepo.save(item);
    }

    public Item deleteItem(String id) {
        return kanbanProjectRepo.deleteById(id).orElseThrow();
    }

}
