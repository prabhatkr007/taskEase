import React, { useState } from 'react';
import "../styles/Todolist.css"
function TodoList({ todos, deleteTodo, toggleComplete, updateTodo, priorityFilter, dueDateFilter ,fetchTodos }) {

  
  const [title, setUpdatedTitle] = useState('');
  const [priority, setUpdatedPriority] = useState('medium');
  const [isEditing, setIsEditing] = useState(false);



const filteredTodos = todos.filter((todo) => {
  
  if (priorityFilter !== 'all' && todo.priority !== priorityFilter) {
    return false;
  }

  if (dueDateFilter !== 'all' && todo.dueDate !== dueDateFilter) {
    return false;
  }

  return true; 
});

const handleToggleComplete = async (id) => {
  
    const taskToToggle = todos.find((todo) => todo._id === id);
    taskToToggle.completed = !taskToToggle.completed;
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: taskToToggle.completed,
        }),
      });
      if (!response.ok) {
        console.error('Failed to toggle task completion.');
      }
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

const handleUpdateClick = (id) => {
    updateTodo(id, title, priority);
    setUpdatedTitle('');
    setUpdatedPriority('medium');
    setIsEditing(false);
    fetchTodos();
  };


  return (
    <ul>
      {todos.map((todo) => (
          <li key={todo._id} className={`todo-list-item ${todo.completed ? 'completed' : ''}`}>
          <span
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              cursor: 'pointer',
            }}
            onClick={() => toggleComplete(todo._id)}
          >
            <strong>{todo.title}</strong>
          </span>
          <div>
            <p>Description: {todo.description}</p>
            <p>Priority: {todo.priority}</p>
            <p>Due Date: {new Date(todo.dueDate).toLocaleString()}</p>
            <p>Created At: {new Date(todo.createdAt).toLocaleString()}</p>
          </div>





          {isEditing ? (
            <div>
              <input
                type="text"
                placeholder="Updated Title"
                value={title}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
              <select
                value={priority}
                onChange={(e) => setUpdatedPriority(e.target.value)}
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <button onClick={() => handleUpdateClick(todo._id)}>Update</button>
            </div>
          ) : (
            <>
              <button onClick={() => setIsEditing(true)}>Edit</button>
              <button onClick={() => deleteTodo(todo._id)}>Delete</button>
            </>
          )}
          <button onClick={() => handleToggleComplete(todo._id)}>
            {todo.completed ? 'Unmark Completed' : 'Mark Completed'}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
