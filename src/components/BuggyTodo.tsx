import { Cross, Plus } from "lucide-react";
import React, { useState } from "react";

interface Task {
  text: string;
  completed: boolean;
}

const BuggyTodoApp: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<string>("");

  const addTask = () => {
    // Bug 1: Allow adding blank tasks
    setTasks([...tasks, { text: task, completed: false }]);
    setTask(""); // Reset task input
  };

  const toggleComplete = (index: number) => {
    // Bug 2: Completion status doesn't persist after page refresh
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index: number) => {
    // Bug 3: Deletes the wrong task
    const updatedTasks = tasks.filter((_, i) => i !== index + 1); // Incorrect index logic
    setTasks(updatedTasks);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>ToDo Lsit Manager</h1> {/* Bug 4: Typo in app title */}
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a task"
      />
      {/* <button onClick={addTask} style={{ marginLeft: "10px" }}>
        Add
          </button> */}
      <Plus onClick={addTask} style={{ marginLeft: "10px" }} />
      <ul style={{ marginTop: "20px", listStyleType: "none" }}>
        {tasks.map((t, index) => (
          <li
            key={index}
            style={{
              textDecoration: t.completed ? "line-through" : "none",
              marginBottom: "10px",
            }}
          >
            {t.text}{" "}
            <button onClick={() => toggleComplete(index)}>Complete</button>
            {/* <button
              onClick={() => deleteTask(index)}
              style={{ marginLeft: "5px" }}
            >
              Delete
            </button> */}
            <Cross
              onClick={() => deleteTask(index)}
              style={{ marginLeft: "5px" }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BuggyTodoApp;
