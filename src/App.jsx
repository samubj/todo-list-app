
import React, { useState } from "react";
import "./App.css";

function App() {
  const [taskInput, setTaskInput] = useState("");
  const [todoItems, setTodoItems] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const addTask = () => {
    if (taskInput.trim() === "") {
      alert("Please enter a task");
      return;
    }

    if (editingTaskId !== null) {
      const updatedList = todoItems.map((item) => item.id === editingTaskId ? { ...item, name: taskInput } : item);
      setTodoItems(updatedList);
      setEditingTaskId(null);
    } else {
      const newTask = { id: Date.now(), name: taskInput, completed: false };
      setTodoItems([...todoItems, newTask]);
    }

    setTaskInput("");
  };

  const editTask = (id) => {
    const selectedTask = todoItems.find((item) => item.id === id);
    setTaskInput(selectedTask.name);
    setEditingTaskId(id);
  };

  const deleteTask = (id) => {
    const updatedList = todoItems.filter((item) => item.id !== id);
    setTodoItems(updatedList);

    if (editingTaskId === id) {
      setEditingTaskId(null);
      setTaskInput("");
    }
  };

  const completeTask = (id) => {
    const updatedList = todoItems.map((item) => item.id === id ? { ...item, completed: !item.completed } : item);
    setTodoItems(updatedList);
  };

  const completedCount = todoItems.filter((item) => item.completed).length;
  const pendingCount = todoItems.length - completedCount;

  return (
    <div className="main-container">
      <div className="left-section">
        <h1>My Daily Tasks</h1>
        <div className="count-box">
          <p>Total Tasks</p>
          <h2>{todoItems.length}</h2>
        </div>
        <div className="count-box">
          <p>Completed Tasks</p>
          <h2>{completedCount}</h2>
        </div>
        <div className="count-box">
          <p>Pending Tasks</p>
          <h2>{pendingCount}</h2>
        </div>
      </div>
      <div className="right-section">
        <h2>My Todo List</h2>
        <div className="input-box">
          <input type="text" placeholder="Enter your task..." value={taskInput} onChange={(e) => setTaskInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") addTask(); }} />
          <button onClick={addTask}>{editingTaskId !== null ? "Update Task" : "Add Task"}</button>
        </div>
        <h3 className="list-heading">Your Tasks</h3>
        <div className="task-list">
          {todoItems.length === 0 ? (
            <p className="empty-text">No tasks added yet.</p>
          ) : (
            todoItems.map((item) => (
              <div className="task-item" key={item.id}>
                <div className="task-left">
                  <input type="checkbox" checked={item.completed} onChange={() => completeTask(item.id)} />
                  <span className={item.completed ? "completed" : ""}>{item.name}</span>
                </div>
                <div className="task-buttons">
                  <button className="edit-btn" onClick={() => editTask(item.id)}>Edit</button>
                  <button className="delete-btn" onClick={() => deleteTask(item.id)}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
