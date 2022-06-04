package com.example.demo;

import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.*;

@Repository
public class KanbanProjectRepo {
    private Map<String, Item> allItems = new HashMap<>();
    public Collection<Item> getAllItems() {
        return Collections.unmodifiableCollection(allItems.values());
    }
    public Optional<Item> getItemById(String id) {
        return Optional.ofNullable(allItems.get(id));
    }
    public Optional<Item> replaceItem(Item item) {
        allItems.replace(item.getId(), item);
        return getItemById(item.getId());
    }
    public void addItem(Item item) {
        allItems.putIfAbsent(item.getId(), item);
    }
    public Optional<Item> deleteItem(String id) {
        Optional<Item> itemToDelete = getItemById(id);
        if(itemToDelete.isPresent()) {
            allItems.remove(id);
        }
        return itemToDelete;
    }
}
