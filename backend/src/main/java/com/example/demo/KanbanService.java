package com.example.demo;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class KanbanService {
    private final KanbanProjectRepoInterface kanbanProjectRepo;

    public Collection<Item> getAllItems() {
        return kanbanProjectRepo.findAll();
    }
    public Item getItemById(String id) {
        return kanbanProjectRepo.findById(id).orElseThrow();
    }
    public Item editItem(Item item) {
        return kanbanProjectRepo.save(item);
    }
    public Item moveToNext(Item item){
        StatusEnum newStatus = item.getStatus().next();
        item.setStatus(newStatus);
        return kanbanProjectRepo.save(item);
    }
    public Item moveToPrev(Item item){
        StatusEnum newStatus = item.getStatus().prev();
        item.setStatus(newStatus);
        return kanbanProjectRepo.save(item);
    }
    public Item addItem(Item item) {
        if("".equals(item.getTask()) || "".equals(item.getDescription())) {
            throw new RuntimeException("Empty inputs detected");
        }

//        Optional<Item> itemFromDB = kanbanProjectRepo.findById(item.getId());
//        if(itemFromDB.isPresent()) {
//            if(itemFromDB.get().getTask().equals(item.getTask()) && itemFromDB.get().getDescription().equals(item.getDescription())){
//                throw new RuntimeException("Identical inputs detected");
//            }
//        }
        return kanbanProjectRepo.save(item);
    }

    public Item deleteItem(String id) {
        Item itemToDelete = kanbanProjectRepo.findById(id).orElseThrow();
        kanbanProjectRepo.delete(itemToDelete);
        return itemToDelete;
    }

}
