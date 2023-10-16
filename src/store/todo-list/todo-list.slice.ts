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
  id: string;
  completed: boolean;
  wip: boolean;
 }
 type deletePayload = {
  id: string;
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

export const toggleFlagsAsync = createAsyncThunk(
  'todos/toggleFlagsAsync',
  async (payload: togglePayload) => {
    const response = await fetch (`http://localhost:7000/todos/${payload.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({completed: payload.completed, wip: payload.wip})
    });
    if(response.ok) {
      const todo = await response.json();
      return { id: todo.id, completed: todo.completed, wip: todo.wip };
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
      id: '1',
      title: 'todo1',
      completed: false,
      wip: false,
    },
    {
      id: '2',
      title: 'todo2',
      completed: true,
      wip: false,
    },
    {
      id: '3',
      title: 'todo3',
      completed: false,
      wip: false,
    },
    {
      id: '4',
      title: 'todo4',
      completed: false,
      wip: false,
    },
  ],
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now().toString(),
        title: action.payload.title,
        completed: false,
        wip: false,
      };
      state.push(newTodo);
    },
    deleteTodo: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    },
    toggleStatus: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      state[index].completed = action.payload.completed;
      state[index].wip = action.payload.wip;
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
      .addCase (toggleFlagsAsync.fulfilled, (state, action) => {
        const index = state.findIndex((item) => item.id === action.payload?.id);
        state[index].completed = action.payload?.completed;
        state[index].wip = action.payload?.wip;
      })
      .addCase (deleteTodoAsync.fulfilled, (state, action) => {
        state = action.payload?.todos;
        return state;
      })
  }
})
const todoReducer = todoListSlice.reducer;
export const { addTodo, deleteTodo, toggleStatus } = todoListSlice.actions;
export default todoReducer;
