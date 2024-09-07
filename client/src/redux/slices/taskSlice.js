import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loading: false,
  error: null,
  currentTask: JSON.parse(localStorage.getItem('currentTask')) ?? null,
};

export const taskSlice = createSlice({ 
  name: 'task', 
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setTask: (state, { payload }) => {
      state.currentTask = payload;
      state.error = null;
      state.loading = false;
    },
    removeTask: (state) => {
        state.currentTask = null;
        state.error = null;
        state.loading = false;
        localStorage.setItem('currentTask', state.currentTask);
    }, 
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
}); 

export const { setLoading, setError,  setTask, removeTask} =
  taskSlice.actions;
export default taskSlice.reducer;

export const taskSelector = (state) => state.task;
