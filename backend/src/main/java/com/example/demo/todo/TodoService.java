package com.example.demo.todo;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class TodoService {

    private final TodoMongoRepository todoRepository;

    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    public Todo addTodo(Todo todo) {
        return Optional.of(todoRepository.save(todo)).orElse(todo);
    }

    public boolean deleteTodo(String id) {
        if(todoRepository.existsById(id)) {
            todoRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Optional<Todo> nextTodoStatus(Todo todo) {
        return todoRepository.findById(todo.getId())
                .map(todo1 -> todoRepository.save(todo1.setStatus(todo1.getStatus().toggleStatus())));
    }

    public Optional<Todo> prevTodoStatus(Todo todo) {
        return todoRepository.findById(todo.getId())
                .map(todo1 -> todoRepository.save(todo1.setStatus(todo1.getStatus().toggleStatus().toggleStatus())));
    }

    public Optional<Todo> getTodoById(String id) {

        return todoRepository.findById(id);
    }

    public Todo saveTodoChanges(Todo todo) {
        var fromDb = todoRepository.findById(todo.getId());
        if(fromDb.isPresent()){
            todo.setStatus(fromDb.get().getStatus());
            return todoRepository.save(todo);
        }
        return null;
    }

}
