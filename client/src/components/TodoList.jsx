import React from 'react';
import '../styles/Todolist.css';
import TodoItem from "./Todoitem"

function TodoList({ todos, deleteTodo, toggleComplete, updateTodo, priorityFilter, completedFilter, fetchTodos }) {
  
  const filteredTodos = todos.filter((todo) => {
    if (priorityFilter !== 'all' && todo.priority !== priorityFilter) {
      return false;
    }

    if (completedFilter === 'true' && !todo.completed) {
      return false; 
    }

    if (completedFilter === 'false' && todo.completed) {
      return false;
    }

    return true; 
  });
  return (
    <ul className="todo-list-container">
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleComplete={toggleComplete}
          updateTodo={updateTodo}
          fetchTodos={fetchTodos}
        />
      ))}
    </ul>
  );
}

export default TodoList;
