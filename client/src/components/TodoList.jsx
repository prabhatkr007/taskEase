import React from 'react';
import '../styles/Todolist.css';
import TodoItem from './Todoitem';

function TodoList({ todos, deleteTodo, toggleComplete, updateTodo, priorityFilter, completedFilter, fetchTodos, sortBy }) {

  // Filter the todos based on the selected filters
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


  let sortedTodos = [...filteredTodos]; 


if (sortBy === "dueDateAsc") {
  sortedTodos = sortedTodos.sort((a, b) => {
    if (a.dueDate && b.dueDate) {
      return a.dueDate.localeCompare(b.dueDate);
    } else if (a.dueDate) {
      return -1; // a comes before b (b is null or undefined)
    } else if (b.dueDate) {
      return 1; // b comes before a (a is null or undefined)
    }
    return 0; // both are null or undefined, no change in order
  });
} else if (sortBy === "dueDateDesc") {
  sortedTodos = sortedTodos.sort((a, b) => {
    if (a.dueDate && b.dueDate) {
      return b.dueDate.localeCompare(a.dueDate);
    } else if (a.dueDate) {
      return -1; // a comes before b (b is null or undefined)
    } else if (b.dueDate) {
      return 1; // b comes before a (a is null or undefined)
    }
    return 0; // both are null or undefined, no change in order
  });
}


  return (
    <ul className="todo-list-container">
      {sortedTodos.map((todo) => (
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
