import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Card, Typography, Button } from "antd";
import { Link } from "react-router-dom";
import "../styles/globals.css";
import ShowList from "../components/task-list";

const { Text } = Typography;

const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  return (
    <Card title="📝 My Tasks" className="card-full-width">
      {tasks.length === 0 ? (
        <Text type="secondary">
          No tasks available. <Link to="/add-task">Add one!</Link>
        </Text>
      ) : (
        <ShowList tasks={tasks} />
      )}
      <Button type="primary" block className="add-task-button">
        <Link to="/add-task">➕ Add New Task</Link>
      </Button>
    </Card>
  );
};

export default TaskList;
