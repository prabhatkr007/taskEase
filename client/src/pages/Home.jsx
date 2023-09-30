import React, { useState, useEffect } from 'react';
import TodoList from '../components/TodoList';
import TodoForm from '../components/Todoform';
import { useNavigate } from 'react-router-dom';
import "../styles/Home.css"
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [username, setUsername] = useState(''); 
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [completedFilter, setCompletedFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTodos();
    fetchUserData();
  }, []);

  async function fetchUserData() {
    try {
      const response = await fetch('/api/userdata'); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userData = await response.json();
      setUsername(userData);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchTodos() {
    try {
      const response = await fetch('/api/tasks');
      const data= await response.json();
      const{error} = data;
      if (!response.ok) {
        window.alert(error);
        navigate("/login")    
      }else{
        setTodos(data);
      }
     
    } catch (error) {
      console.error(error);
    }
  }

  async function addTodo(newTodo) {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify(newTodo),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      const{error, message} = data;

      if (!response.ok) {
        window.alert(error);
        return;
      }else{
         
          window.alert(message);
          setTodos([...todos, data]);
      }
      
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteTodo(id) {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      const { error, message } = data;
  
      if (!response.ok) {
        window.alert(error);
        return;
      } else {
        // Filter out the deleted task from the todos state
        const updatedTodos = todos.filter((todo) => todo._id !== id);
        window.alert(message);
        setTodos(updatedTodos);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function updateTodo(id, title, priority) {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        body: JSON.stringify({title, priority}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
      const { error, message } = data;
  
      if (!response.ok) {
        window.alert(error);
        return;
      } else {
      
        window.alert(message);
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  async function toggleComplete(id) {
    try {
      const todoToToggle = todos.find((todo) => todo._id === id);
      todoToToggle.completed = !todoToToggle.completed;
      console.log(todoToToggle);
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: todoToToggle.completed,
        }),
      });
  
      if (!response.ok) {
        console.log('Failed to toggle task completion.');
      } else {
        fetchTodos();
      }
    } catch (error) {
      console.error(error);
    }
  }
  

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        {username ? (
          <p className="greeting">Hi {username}</p>
        ) : (
          <p className="loading">Loading user data...</p>
        )}
        <h1>Todo List</h1>

        <TodoForm addTodo={addTodo} />

        <div>
          <span>
        <label>Filter by Priority: </label>
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        </span>
        <span>
        <label>Tasks: </label>
        <select
        value={completedFilter}
        onChange={(e) => setCompletedFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value={true}>Completed</option>
        <option value={false}>Not Completed</option>
      </select>
      </span>
      </div>
  

        <TodoList todos={todos} 
        priorityFilter={priorityFilter} 
        completedFilter={completedFilter} 
        fetchTodos={fetchTodos} 
        deleteTodo={deleteTodo} 
        updateTodo={updateTodo} 
        toggleComplete= {toggleComplete} />
      </div>

    </div>
  );
}

export default TodoApp;
