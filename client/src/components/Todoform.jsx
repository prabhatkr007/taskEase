import React, { useState } from 'react';
import '../styles/Todoform.css';

function TodoForm({ addTodo }) {
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    completed: false,
    dueDate: '', // This should be in the format 'YYYY-MM-DDTHH:mm'
    priority: 'medium',
  });



  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.title.trim() !== '') {
      addTodo(newTodo);
      setNewTodo({
        title: '',
        description: '',
        completed: false,
        dueDate: '', // Reset the dueDate
        priority: 'medium',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        placeholder="Title"
        value={newTodo.title}
        onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newTodo.description}
        onChange={(e) =>
          setNewTodo({ ...newTodo, description: e.target.value })
        }
      />
      {/* Use the datetime-local input */}
      <input
        type="datetime-local"
        placeholder="Due Date and Time"
        value={newTodo.dueDate}
        onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
      />
      <select
        value={newTodo.priority}
        onChange={(e) => setNewTodo({ ...newTodo, priority: e.target.value })}
      >
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      
      <button type="submit">Add</button>
    </form>
  );
}

export default TodoForm;
