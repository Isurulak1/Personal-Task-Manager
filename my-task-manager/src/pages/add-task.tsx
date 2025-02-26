import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../store/taskSlice";
import { Form, Input, Button, Card } from "antd";
import "../styles/globals.css";

const AddTask: React.FC = () => {
  const [taskText, setTaskText] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (taskText.trim()) {
      dispatch(addTask(taskText));
      setTaskText("");
    }
  };

  return (
    <Card title="➕ Add a New Task" className="card-full-width">
      <Form onFinish={handleSubmit}>
        <Form.Item>
          <Input
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Enter task..."
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add Task
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddTask;
