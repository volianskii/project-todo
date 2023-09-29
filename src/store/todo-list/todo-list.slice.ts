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
 type addPayload = {
  title: string;
 }
 type togglePayload = {
  id: number;
  completed: boolean;
 }
 type deletePayload = {
  id: number;
 }
export const addTodoAsync = createAsyncThunk(
  'todos/addTodosAsync',
  async (payload: addPayload) => {
    const response = await fetch ('http://localhost:7000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title: payload.title})
    });
    if(response.ok) {
      const todo = await response.json();
      return { todo };
    }
})

export const toggleCompletedAsync = createAsyncThunk(
  'todos/toggleCompletedAsync',
  async (payload: togglePayload) => {
    const response = await fetch (`http://localhost:7000/todos/${payload.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({completed: payload.completed})
    });
    if(response.ok) {
      const todo = await response.json();
      return { id: todo.id, completed: todo.completed };
    }
})

export const deleteTodoAsync = createAsyncThunk(
  'todos/deleteTodoAsync',
  async (payload: deletePayload) => {
    const response = await fetch (`http://localhost:7000/todos/${payload.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id: payload.id})
    });
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
      completed: false
    },
    {
      id: 2,
      title: 'todo2',
      completed: true
    },
    {
      id: 3,
      title: 'todo3',
      completed: false
    },
    {
      id: 4,
      title: 'todffo4',
      completed: false
    }
  ],
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        title: action.payload,
        completed: false
      };
      state.push(newTodo);
    },
    deleteTodo: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    toggleCompletedStatus: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      state[index].completed = action.payload.completed;
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
      })
      .addCase (addTodoAsync.fulfilled, (state, action) => {
        state.push(action.payload?.todo);
      })
      .addCase (toggleCompletedAsync.fulfilled, (state, action) => {
        const index = state.findIndex((item) => item.id === action.payload?.id);
        state[index].completed = action.payload?.completed;
      })
      .addCase (deleteTodoAsync.fulfilled, (state, action) => {
        state = action.payload?.todos;
        return state;
      });
  }
})
const todoReducer = todoListSlice.reducer;
export const { addTodo, deleteTodo, toggleCompletedStatus } = todoListSlice.actions;
export default todoReducer;
