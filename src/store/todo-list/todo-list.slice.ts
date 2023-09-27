import { createSlice } from "@reduxjs/toolkit";

const todoListSlice = createSlice({
  name: 'todoList',
  initialState: [
    {
      id: 1,
      title: 'todo1',
      completedStatus: false
    },
    {
      id: 2,
      title: 'todo2',
      completedStatus: false
    },
    {
      id: 3,
      title: 'todo3',
      completedStatus: false
    },
    {
      id: 4,
      title: 'todo4',
      completedStatus: false
    }
  ],
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        title: action.payload,
        completedStatus: false
      };
      state.push(newTodo);
    }
  }
})
const todoReducer = todoListSlice.reducer;
export const { addTodo } = todoListSlice.actions;
export default todoReducer;