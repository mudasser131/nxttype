"use client";

import { useState, useEffect } from "react";
import { Todo } from "./types/todo"; // Import Todo type
import TodoItem from "./Components/Todo"; // Import TodoItem component

export default function Home() {
  // Load todos from localStorage initially
  const [todos, setTodos] = useState<Todo[]>([]);

  // State for input field value
  const [input, setInput] = useState("");

  // 🟢 Load Todos from Local Storage on First Render
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos"); // Get stored todos
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos)); // Convert string back to an array
    }
  }, []); // Runs only when the page loads

  // 🔴 Save Todos to Local Storage Whenever They Change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos)); // Store updated todos
  }, [todos]); // Runs whenever `todos` state changes

  // Function to add a new todo
  const addTodo = () => {
    if (!input.trim()) return; // Prevent empty input

    const newTodo = { id: Date.now(), text: input, completed: false };
    setTodos([...todos, newTodo]); // Add new todo
    setInput(""); // Clear input field
  };

  // Function to toggle completion status
  const toggleComplete = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Function to delete a todo
  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      {/* App Title */}
      <h1 className="text-3xl font-bold mb-6">To-Do List</h1>

      {/* Input Field and Add Button */}
      <div className="flex mb-4">
        <input
          className="border p-2 rounded-lg"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task..."
        />
        <button className="ml-2 bg-blue-500 text-white p-2 rounded-lg" onClick={addTodo}>
          Add
        </button>
      </div>

      {/* Display the List of Todos */}
      <div className="w-full max-w-md space-y-3">
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
        ))}
      </div>
    </div>
  );
}
