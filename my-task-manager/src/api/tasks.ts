import axios from "axios";
import { Task } from "../types/task";

const BASE_URL = "http://localhost:5000/tasks"; 

export const fetchTasks = async () => {
  const response = await axios.get<Task[]>(BASE_URL);
  return response.data;
};

export const addTask = async (task: Omit<Task, "id">) => {
  const response = await axios.post<Task>(BASE_URL, task);
  return response.data;
};

export const updateTask = async (task: Task) => {
  const response = await axios.put<Task>(`${BASE_URL}/${task.id}`, task);
  return response.data;
};

export const deleteTask = async (id: number) => {
  await axios.delete(`${BASE_URL}/${id}`);
};

export const toggleTaskCompletion = async (id: number, completed: boolean) => {
  const response = await axios.patch<Task>(`${BASE_URL}/${id}`, { completed });
  return response.data;
};
