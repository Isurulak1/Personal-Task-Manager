import React, { ReactNode } from "react";
import { Layout, Menu } from "antd";
import { UnorderedListOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "../styles/globals.css";

const { Header, Content } = Layout;

interface LayoutProps {
  children: ReactNode;
}

const LayoutComponent: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Layout>
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
      <Content className="content-container">{children}</Content>
    </Layout>
  );
};

export default LayoutComponent;
