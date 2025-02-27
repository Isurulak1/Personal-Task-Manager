import React from "react";
import { useDispatch } from "react-redux";
import { removeTask, toggleTask } from "../store/taskSlice";
import { List, Button, Checkbox, Typography, Card } from "antd";
import { DeleteOutlined, CheckOutlined, CalendarOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Task } from "../types/task";

const { Title, Text } = Typography;

interface AddListProps {
  tasks: Task[];
}

const AddList: React.FC<AddListProps> = ({ tasks }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
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
            </Button>
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
  );
};

export default AddList;
