// App.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      {todos.length === 0 ? (
        <p>No todos found.</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo._id}>
              <input
                type="checkbox"
                checked={todo.completed}
                // Handle updating todo completion status
                onChange={() => updateTodoStatus(todo._id, !todo.completed)}
              />
              <span className={todo.completed ? 'completed' : ''}>{todo.title}</span>
              <button onClick={() => deleteTodo(todo._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
