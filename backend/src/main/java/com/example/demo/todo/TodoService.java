package com.example.demo.todo;

import com.example.demo.model.task.Todo;
import com.example.demo.model.task.TodoCreationData;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class TodoService {

    private final TodoMongoRepository todoRepository;

    public List<Todo> getAllTodos(String userId) {
        return todoRepository.findAllByCreatorId(userId);
    }

    public Todo addTodo(TodoCreationData todo, String creatorId) {
        return todoRepository.save(new Todo(todo, creatorId));
    }

    public boolean deleteTodo(String id, String creatorId) {
        if(todoRepository.existsByIdAndCreatorId(id, creatorId)) {
            todoRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Optional<Todo> nextTodoStatus(Todo todo, String creatorId) {
        return todoRepository.findByIdAndCreatorId(todo.getId(), creatorId)
                .map(todo1 -> todoRepository.save(todo1.setStatus(todo1.getStatus().toggleStatus())));
    }

    public Optional<Todo> prevTodoStatus(Todo todo, String creatorId) {
        return todoRepository.findByIdAndCreatorId(todo.getId(), creatorId)
                .map(todo1 -> todoRepository.save(todo1.setStatus(todo1.getStatus().toggleStatus().toggleStatus())));
    }

    public Optional<Todo> getTodoById(String id, String creatorId) {

        return todoRepository.findByIdAndCreatorId(id, creatorId);
    }

    public Todo saveTodoChanges(Todo todo, String creatorId) {
        var fromDb = todoRepository.findByIdAndCreatorId(todo.getId(), creatorId);
        if(fromDb.isPresent()){
            todo.setStatus(fromDb.get().getStatus());
            return todoRepository.save(todo);
        }
        return null;
    }

}
