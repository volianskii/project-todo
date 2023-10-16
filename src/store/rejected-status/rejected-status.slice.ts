import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addTodoAsync } from "../todo-list/todo-list.slice";

const rejectedStatusSlice = createSlice({
  name: 'rejectedStatus',
  initialState: {
    rejectedStatus: false,
    pendingStatus: false
  },
  reducers: {
    changeRejectedStatus: (state, action) => {
      state.rejectedStatus = action.payload;
    },
    changePendingStatus: (state, action) => {
      state.pendingStatus = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase (addTodoAsync.fulfilled, (state) => {
        state.rejectedStatus = false;
        state.pendingStatus = false;
      })  
      .addCase (addTodoAsync.rejected, (state) => {
          state.rejectedStatus = true;
          state.pendingStatus = false;
      })
      .addCase (addTodoAsync.pending, (state) => {
        state.rejectedStatus = false;
        state.pendingStatus = true;
      })
  }
})
const rejectedStatusReducer = rejectedStatusSlice.reducer;
export const { changeRejectedStatus } = rejectedStatusSlice.actions;
export default rejectedStatusReducer;
