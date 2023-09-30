import React, { useState, useEffect } from 'react';
import TodoList from '../components/TodoList';
import TodoForm from '../components/Todoform';
import { useNavigate } from 'react-router-dom';
import "../styles/Home.css"
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [username, setUsername] = useState(''); 
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
        console.log(data);
      }
      setTodos(data);
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
       
        <TodoList todos={todos} fetchTodos={fetchTodos} deleteTodo={deleteTodo} updateTodo={updateTodo}  />
       

      </div>
    </div>
  );
}

export default TodoApp;
