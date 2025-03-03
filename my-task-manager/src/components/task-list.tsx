import '@ant-design/v5-patch-for-react-19';
import React from "react";
import { useDispatch } from "react-redux";
import { removeTask, toggleTask } from "../store/taskSlice";
import { List, Button, Checkbox, Typography, Tag} from "antd";
import { DeleteOutlined, CheckOutlined, CalendarOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Task } from "../types/task";

const { Title, Text } = Typography;

interface ShowListProps {
  tasks: Task[];
}

const ShowList: React.FC<ShowListProps> = ({ tasks }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getPriorityTag = (priority: string) => {
    switch (priority) {
      case "High":
        return <Tag color="red">High</Tag>;
      case "Medium":
        return <Tag color="orange">Medium</Tag>;
      case "Low":
      default:
        return <Tag color="green">Low</Tag>;
    }
  };

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
              {task.title} {getPriorityTag(task.priority || "Low")}
            </Title>
            <Text type="secondary" className="task-description">{task.description}</Text>
            <br />
            <Text type="secondary" className="task-date">
              <CalendarOutlined /> Due: {task.dueDate ? task.dueDate : "No due date"}
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

export default ShowList;
