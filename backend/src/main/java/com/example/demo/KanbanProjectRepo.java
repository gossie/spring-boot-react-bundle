package com.example.demo;

import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class KanbanProjectRepo {
    private Map<String, Item> allItems = new HashMap<>();
    public Collection<Item> findAll() {
        return Collections.unmodifiableCollection(allItems.values());
    }
    public Optional<Item> findById(String id) {
        return Optional.ofNullable(allItems.get(id));
    }
    public Optional<Item> replaceItem(Item item) {
        allItems.replace(item.getId(), item);
        return findById(item.getId());
    }
    public Item save(Item item) {
        allItems.putIfAbsent(item.getId(), item);
        return item;
    }
    public Optional<Item> deleteById(String id) {
        Optional<Item> itemToDelete = findById(id);
        if(itemToDelete.isPresent()) {
            allItems.remove(id);
        }
        return itemToDelete;
    }
    public List<Item> findByTaskAndDescription(String task, String description) {
        List<Item> itemList = new ArrayList<>();
        for(Item listItem : findAll()) {
            if(task.equals(listItem.getTask()) && description.equals(listItem.getDescription())){
                itemList.add(listItem);
            }
        }
        return itemList;
    }
}
