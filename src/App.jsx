import { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [editId, setEditId] = useState(null);

  const addTask = () => {
    if (task.trim() === "") {
      alert("Please enter a task");
      return;
    }
    if (editId !== null) {
      const updatedList = taskList.map((item) => item.id === editId ? { ...item, name: task } : item);
      setTaskList(updatedList);
      setEditId(null);
    } else {
      const newTask = { id: Date.now(), name: task, completed: false };
      setTaskList([...taskList, newTask]);
    }
    setTask("");
  };

  const editTask = (id) => {
    const selectedTask = taskList.find((item) => item.id === id);
    setTask(selectedTask.name);
    setEditId(id);
  };

  const deleteTask = (id) => {
    const updatedList = taskList.filter((item) => item.id !== id);
    setTaskList(updatedList);
    if (editId === id) {
      setEditId(null);
      setTask("");
    }
  };

  const completeTask = (id) => {
    const updatedList = taskList.map((item) => item.id === id ? { ...item, completed: !item.completed } : item);
    setTaskList(updatedList);
  };

  const completedCount = taskList.filter((item) => item.completed).length;
  const pendingCount = taskList.length - completedCount;

  return (
    <div className="main-container">
      <div className="left-section">
        <h1>My Daily Tasks</h1>
        <div className="count-box">
          <p>Total Tasks</p>
          <h2>{taskList.length}</h2>
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
          <input type="text" placeholder="Enter your task..." value={task} onChange={(e) => setTask(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") addTask(); }} />
          <button onClick={addTask}>{editId !== null ? "Update Task" : "Add Task"}</button>
        </div>
        <h3 className="list-heading">Your Tasks</h3>
        <div className="task-list">
          {taskList.length === 0 ? (
            <p className="empty-text">No tasks added yet.</p>
          ) : (
            taskList.map((item) => (
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
