import { Check, Trash2, X } from "lucide-react";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

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
    <div
      className="overflow-y-hidden"
      style={{ textAlign: "center", marginTop: "20px" }}
    >
      <h1>A bug free todo liist manager (I promise)</h1>{" "}
      {/* Bug 4: Typo in app title */}
      <div className="flex my-4">
        <Input
          className=""
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
        />
        <Button
          onClick={addTask}
          style={{ marginLeft: "10px" }}
          className="hidden md:flex mt-2"
        >
          Add
        </Button>
      </div>
      <ul className="h-[500px]">
        {tasks.map((t, index) => (
          <li
            key={index}
            style={{
              textDecoration: t.completed ? "line-through" : "none",
              //   marginBottom: "10px",
            }}
            className="flex justify-between border-b border-border py-2 px-4 hover:bg-neutral-900"
          >
            <p className="flex md:hidden">
              {t.text.length > 70 ? t.text.slice(0, 70) + "..." : t.text}
            </p>
            <p className="hidden md:flex">{t.text}</p>
            <div className="flex items-center gap-2">
              {!t.completed ? (
                <Check
                  onClick={() => toggleComplete(index)}
                  className="text-emerald-500 cursor-pointer"
                >
                  Complete
                </Check>
              ) : (
                <X
                  className="cursor-pointer"
                  onClick={() => toggleComplete(index)}
                >
                  Incomplete
                </X>
              )}
              <Trash2
                className="text-red-500 cursor-pointer"
                onClick={() => deleteTask(index)}
                style={{ marginLeft: "5px" }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BuggyTodoApp;
