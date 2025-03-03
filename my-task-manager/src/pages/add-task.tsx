import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTask } from "../store/taskSlice";
import { Form, Input, Button, Card, DatePicker, Select } from "antd";
import "../styles/globals.css";
import moment from "moment";

const { Option } = Select;

const AddTask: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values: { title: string; description?: string; dueDate?: moment.Moment; priority:string }) => {
    dispatch(
      addTask({
        title: values.title,
        description: values.description || "",
        dueDate: values.dueDate ? values.dueDate.format("YYYY-MM-DD") : "No due date",
        completed: false,
        priority: values.priority,
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
          <Input.TextArea rows={5} placeholder="Enter task description (optional)..." />
        </Form.Item>

        <Form.Item label="Due Date" name="dueDate">
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Priority" name="priority">
          <Select placeholder="Select priority level">
            <Option value="Low">Low</Option>
            <Option value="Medium">Medium</Option>
            <Option value="High">High</Option>
          </Select>
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
