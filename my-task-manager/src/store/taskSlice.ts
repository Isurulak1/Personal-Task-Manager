import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../types/task";


interface TaskState {
  tasks: Task[];
}

const loadTasks = (): Task[] => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
};

const initialState: TaskState = {
  tasks: loadTasks(),
};


const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, "id">>) => {
      const newTask: Task = {
        id: state.tasks.length + 1, 
        ...action.payload,
      };
      state.tasks.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },

    removeTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },


    toggleTask: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
    editTask: (state, action: PayloadAction<Task>) => {
      const taskIndex = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = action.payload; 
        localStorage.setItem("tasks", JSON.stringify(state.tasks)); 
      }
    },       
  },
});

export const { addTask, removeTask, toggleTask, editTask } = taskSlice.actions;
export default taskSlice.reducer;
