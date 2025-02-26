import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../store/taskSlice";
import { useNavigate } from "react-router-dom";

const AddTask: React.FC = () => {
  const [taskText, setTaskText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskText.trim()) {
      dispatch(addTask(taskText));
      setTaskText("");
      navigate("/"); 
    }
  };

  return (
    <div>
      <h2>Add a New Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Enter task..."
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default AddTask;
