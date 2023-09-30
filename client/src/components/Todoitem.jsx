import React, { useState } from 'react';

function TodoItem({ todo, deleteTodo, toggleComplete, updateTodo, fetchTodos }) {
    const [title, setTitle] = useState(todo.title);
    const [priority, setPriority] = useState(todo.priority);
    const [isEditing, setIsEditing] = useState(false);
  
    const handleUpdateClick = () => {
      updateTodo(todo._id, title, priority);
      setIsEditing(false);
      fetchTodos();
    };
  
    return (
      <li className={`todo-list-item ${todo.completed ? 'completed' : ''}`}>
        <span
          style={{
            textDecoration: todo.completed ? 'line-through' : 'none',
            cursor: 'pointer',
          }}
          onClick={() => toggleComplete(todo._id)} // Use toggleComplete directly here
        >
          <strong>{todo.title}</strong>
        </span>
        <div>
          <p>Description: {todo.description}</p>
          <p>Due Date: {new Date(todo.dueDate).toLocaleString()}</p>
          <p>Created At: {new Date(todo.createdAt).toLocaleString()}</p>
          <p>Priority: {todo.priority}</p>
        </div>
        {isEditing ? (
          <div>
            <input
              type="text"
              placeholder="Updated Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button className="update-button" onClick={handleUpdateClick}>
              Update
            </button>
          </div>
        ) : (
          <>
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button className="delete-button" onClick={() => deleteTodo(todo._id)}>
              Delete
            </button>
          </>
        )}
        <button
          className={`complete-button ${
            todo.completed ? 'unmark-button' : 'mark-button'
          }`}
          onClick={() => toggleComplete(todo._id)} // Use toggleComplete directly here
        >
          {todo.completed ? 'Unmark Completed' : 'Mark Completed'}
        </button>
      </li>
    );
  }

  export default TodoItem;