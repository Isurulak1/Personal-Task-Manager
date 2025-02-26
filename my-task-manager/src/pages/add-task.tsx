import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";
import { addTask } from "../store/taskSlice";
import { Form, Input, Button, Card, DatePicker } from "antd";
import "../styles/globals.css";
import moment from "moment";

const AddTask: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tasks = useSelector((state: RootState) => state.tasks.tasks); 

  const handleSubmit = (values: { title: string; description?: string; dueDate?: string }) => {
    dispatch(
      addTask({
        title: values.title,
        description: values.description || "",
        dueDate: values.dueDate ? moment(values.dueDate).toISOString() : "No due date",
        completed: false,
      })
    );
    navigate("/");
  };

  return (
    <Card title="➕ Add a New Task" className="card-full-width">
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Task Title"
          name="title"
          rules={[{ required: true, message: "Please enter a task title!" }]}
        >
          <Input placeholder="Enter task title..." />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={3} placeholder="Enter task description (optional)..." />
        </Form.Item>

        <Form.Item label="Due Date" name="dueDate">
          <DatePicker style={{ width: "100%" }} />
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
