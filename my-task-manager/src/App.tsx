import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Layout} from "antd";
import TaskList from "./pages/task-list";
import AddTask from "./pages/add-task";
import "../src/styles/globals.css"; 
import TaskForm from "./components/task-form";
import LayoutComponent from "./components/layout";

const {Content } = Layout;

const EditTaskWrapper = () => {
  const location = useLocation();
  return <TaskForm existingTask={location.state} />;
};

const App: React.FC = () => {
  return (
    <Router>
        <LayoutComponent>
        <Content className="content-container">
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/add-task" element={<AddTask />} />
            <Route path="/edit-task/:id" element={<EditTaskWrapper  />} />
          </Routes>
        </Content>
        </LayoutComponent>
    </Router>
  );
};

export default App;
