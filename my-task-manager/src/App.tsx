import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { UnorderedListOutlined, PlusOutlined } from "@ant-design/icons";
import TaskList from "./pages/task-list";
import AddTask from "./pages/add-task";
import "../src/styles/globals.css"; 

const { Header, Content } = Layout;

const App: React.FC = () => {
  return (
    <Router>
      <Layout className="layout-container">
        <Header className="header-menu">
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<UnorderedListOutlined />}>
              <Link to="/">Task List</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<PlusOutlined />}>
              <Link to="/add-task">Add Task</Link>
            </Menu.Item>
          </Menu>
        </Header>

        <Content className="content-container">
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/add-task" element={<AddTask />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
