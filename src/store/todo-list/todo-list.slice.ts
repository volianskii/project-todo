import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getTodosAsync = createAsyncThunk(
  'todos/getTodosAsync',
  async () => {
    const response = await fetch ('http://localhost:7000/todos');
    if(response.ok) {
      const todos = await response.json();
      return { todos };
    }
})

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
      completedStatus: true
    },
    {
      id: 3,
      title: 'todo3',
      completedStatus: false
    },
    {
      id: 4,
      title: 'todffo4',
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
    },
    deleteTodo: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    toggleCompletedStatus: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      state[index].completedStatus = action.payload.completedStatus;
    } 
  },
  extraReducers(builder) {
    builder
      .addCase (getTodosAsync.pending, () => {
        console.log('data is fetching');
      })
      .addCase (getTodosAsync.fulfilled, (state, action) => {
        state = action.payload?.todos;
        return state;
      });
  }
})
const todoReducer = todoListSlice.reducer;
export const { addTodo, deleteTodo, toggleCompletedStatus } = todoListSlice.actions;
export default todoReducer;
