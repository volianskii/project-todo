import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todo-list/todo-list.slice';
import rejectedStatusReducer from './rejected-status/rejected-status.slice';

const store = configureStore({
  reducer: {
    todoList: todoReducer,
    rejectedStatus: rejectedStatusReducer
  }
});

export default store;
