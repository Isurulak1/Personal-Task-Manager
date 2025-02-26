import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      state.tasks.push({
        id: state.tasks.length + 1,
        text: action.payload,
        completed: false,
      });
      console.log("📝 Task added:", action.payload);
    },
    removeTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      console.log("🗑️ Task removed:", action.payload);
    },
    toggleTask: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        console.log("🔄 Task toggled:", action.payload, "Status:", task.completed ? "Completed" : "Incomplete");
      }
    },
  },
});

export const { addTask, removeTask, toggleTask } = taskSlice.actions;

export default taskSlice.reducer;
