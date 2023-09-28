import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todo-list/todo-list.slice';

const store = configureStore({
  reducer: {
    todoList: todoReducer,
  }
});

export default store;
