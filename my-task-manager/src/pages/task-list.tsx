import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { removeTask, toggleTask } from "../store/taskSlice";
import { List, Button, Checkbox, Card, Typography } from "antd";
import { DeleteOutlined, CheckOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "../styles/globals.css";

const { Title } = Typography;

const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();

  return (
    <Card title="📝 My Tasks" className="card-full-width">
      {tasks.length === 0 ? (
        <Typography.Text type="secondary">
          No tasks available. <Link to="/add-task">Add one!</Link>
        </Typography.Text>
      ) : (
        <List
          bordered
          dataSource={tasks}
          renderItem={(task) => (
            <List.Item
              actions={[
                <Button
                  type="link"
                  icon={<CheckOutlined />}
                  onClick={() => dispatch(toggleTask(task.id))}
                >
                  {task.completed ? "Undo" : "Complete"}
                </Button>,
                <Button
                  type="link"
                  icon={<DeleteOutlined />}
                  danger
                  onClick={() => dispatch(removeTask(task.id))}
                >
                  Delete
                </Button>,
              ]}
            >
              <Checkbox
                checked={task.completed}
                onChange={() => dispatch(toggleTask(task.id))}
              />
              <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                {task.text}
              </span>
            </List.Item>
          )}
        />
      )}
      <Button type="primary" block className="add-task-button">
        <Link to="/add-task">➕ Add New Task</Link>
      </Button>
    </Card>
  );
};

export default TaskList;
