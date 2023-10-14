import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addTodoAsync } from "../todo-list/todo-list.slice";

const rejectedStatusSlice = createSlice({
  name: 'rejectedStatus',
  initialState: {
    rejectedStatus: false
  },
  reducers: {
    changeRejectedStatus: (state, action) => {
      state.rejectedStatus = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase (addTodoAsync.rejected, (state) => {
        state.rejectedStatus = true;
      })
      .addCase (addTodoAsync.fulfilled, (state) => {
        state.rejectedStatus = false;
      })
  }
})
const rejectedStatusReducer = rejectedStatusSlice.reducer;
export const { changeRejectedStatus } = rejectedStatusSlice.actions;
export default rejectedStatusReducer;
