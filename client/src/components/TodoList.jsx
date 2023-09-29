import React, { useState } from 'react';
import "../styles/Todolist.css"
function TodoList({ todos, deleteTodo, toggleComplete, updateTodo, priorityFilter, dueDateFilter ,fetchTodos }) {

  
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedPriority, setUpdatedPriority] = useState('medium');
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateClick = (id) => {
    // Call the updateTodo function with the updated data
    updateTodo(id, updatedTitle, updatedPriority);
    // Clear the input fields after updating
    setUpdatedTitle('');
    setUpdatedPriority('medium');
    setIsEditing(false); // Disable editing mode after updating
  };
const filteredTodos = todos.filter((todo) => {
  // Filter by priority
  if (priorityFilter !== 'all' && todo.priority !== priorityFilter) {
    return false;
  }

  // Filter by due date
  if (dueDateFilter !== 'all' && todo.dueDate !== dueDateFilter) {
    return false;
  }

  return true; // Include in the filtered list
});

  const handleToggleComplete = async (id) => {
    // Find the task by id
    const taskToToggle = todos.find((todo) => todo._id === id);

    // Toggle the completion status
    taskToToggle.completed = !taskToToggle.completed;

    // Send a PUT request to update the task's completion status
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
        // Handle error if the request fails
        console.error('Failed to toggle task completion.');
      }
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
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
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
              <select
                value={updatedPriority}
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
