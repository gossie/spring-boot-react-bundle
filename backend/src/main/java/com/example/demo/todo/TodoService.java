package com.example.demo.todo;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class TodoService {

    private final TodoRepository todoRepository;

    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    public void addTodo(Todo todo) {
        todoRepository.save(todo);
    }

    public Optional<Todo> deleteTodo(String id) {
        return todoRepository.delete(id);
    }

    public Optional<Todo> toggleTodoStatus(Todo todo) {
        Optional<Todo> todoTmp = todoRepository.findById(todo.getId());
        if(todoTmp.isPresent()) {
            todoTmp.get().setStatus(todoTmp.get().getStatus().toggleStatus());
            todoRepository.save(todoTmp.get());
        }
        return todoTmp;
    }

    public Optional<Todo> getTodoById(String id) {

        return todoRepository.findById(id);
    }

    public Todo saveTodoChanges(Todo todo) {
        if(todoRepository.findById(todo.getId()).isPresent()){
            return todoRepository.save(todo);
        }
        return null;
    }
}
