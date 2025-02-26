import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { removeTask, toggleTask } from "../store/taskSlice";
import { List, Button, Checkbox, Card, Typography } from "antd";
import { DeleteOutlined, CheckOutlined, CalendarOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "../styles/globals.css";
import { EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Card title="📝 My Tasks" className="card-full-width">
      {tasks.length === 0 ? (
        <Text type="secondary">
          No tasks available. <Link to="/add-task">Add one!</Link>
        </Text>
      ) : (
        <List
          bordered
          dataSource={tasks}
          renderItem={(task) => (
            <List.Item className="task-item">
              <Checkbox
                checked={task.completed}
                onChange={() => dispatch(toggleTask(task.id))}
                className="task-checkbox"
              />
              <div className="task-content">
                <Title level={5} className={task.completed ? "task-title completed" : "task-title"}>
                  {task.title}
                </Title>
                <Text type="secondary" className="task-description">{task.description}</Text>
                <br />
                <Text type="secondary" className="task-date">
                  <CalendarOutlined /> Due: {task.dueDate}
                </Text>
              </div>
              <div className="task-actions">
                <Button
                  type="link"
                  icon={<CheckOutlined />}
                  onClick={() => dispatch(toggleTask(task.id))}
                  className="task-action-button"
                >
                  {task.completed ? "Undo" : "Complete"}
                </Button>
                <Button
                  type="link"
                  icon={<EditOutlined />}
                  onClick={() => navigate(`/edit-task/${task.id}`, { state: task })}
                >
                  Edit
                </Button>,
                <Button
                  type="link"
                  icon={<DeleteOutlined />}
                  danger
                  onClick={() => dispatch(removeTask(task.id))}
                  className="task-action-button"
                >
                  Delete
                </Button>
              </div>
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
