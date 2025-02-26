import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TaskList from "./pages/task-list";
import AddTask from "./pages/add-task";

const App: React.FC = () => {
  return (
    <Router>
      <nav style={{ display: "flex", gap: "10px", padding: "10px", borderBottom: "1px solid #ccc" }}>
        <Link to="/">🏠 Task List</Link>
        <Link to="/add-task">➕ Add Task</Link>
      </nav>

      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/add-task" element={<AddTask />} />
      </Routes>
    </Router>
  );
};

export default App;
