import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTask, editTask } from "../store/taskSlice";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card } from "antd";
import moment from "moment";
import { Task } from "../types/task";
import { Switch } from "antd";
import { DatePicker } from "antd"; 

interface TaskFormProps {
    existingTask?: Task;
  }

  
const TaskForm: React.FC<TaskFormProps> = ({ existingTask }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (existingTask) {
      form.setFieldsValue({
        title: existingTask.title,
        description: existingTask.description || "",
        dueDate: existingTask.dueDate ? moment(existingTask.dueDate) : null,
        completed: existingTask.completed,
      });
    }
  }, [existingTask, form]);
  
  const handleSubmit = (values: { title: string; description?: string; dueDate?: moment.Moment; completed: boolean }) => {
    const taskData: Task = {
      id: existingTask ? existingTask.id : Date.now(),
      title: values.title,
      description: values.description || "",
      dueDate: values.dueDate ? values.dueDate.toISOString() : "",
      completed: values.completed,
    };
  
    if (existingTask) {
      dispatch(editTask(taskData));  
    } else {
      dispatch(addTask(taskData));
    }
  
    navigate("/");
  };
  

  return (
    <Card title={existingTask ? "✏️ Edit Task" : "➕ Add a New Task"} style={{ width: "100%" }}>
    <Form form={form} onFinish={handleSubmit} layout="vertical"> {/* ✅ Pass the form instance */}
      <Form.Item name="title" label="Title" rules={[{ required: true, message: "Title is required!" }]}>
        <Input placeholder="Enter task title..." />
      </Form.Item>

      <Form.Item name="description" label="Description">
        <Input.TextArea placeholder="Enter task description..." />
      </Form.Item>

      <Form.Item name="dueDate" label="Due Date">
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item name="completed" label="Completed" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          {existingTask ? "Update Task" : "Add Task"}
        </Button>
      </Form.Item>
    </Form>
  </Card>
);
};

export default TaskForm;
