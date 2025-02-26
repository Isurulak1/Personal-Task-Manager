import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { removeTask, toggleTask } from "../store/taskSlice";
import { Link } from "react-router-dom";

const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Task List</h2>
      {tasks.length === 0 ? <p>No tasks available. <Link to="/add-task">Add one!</Link></p> : null}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
              {task.text}
            </span>
            <button onClick={() => dispatch(toggleTask(task.id))}>
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button onClick={() => dispatch(removeTask(task.id))}>❌ Delete</button>
          </li>
        ))}
      </ul>
      <Link to="/add-task">➕ Add New Task</Link>
    </div>
  );
};

export default TaskList;
