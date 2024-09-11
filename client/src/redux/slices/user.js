import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loading: false,
  error: null,
  userID: localStorage.getItem('userID')!=="undefined" ? JSON.parse(localStorage.getItem('userID')) : null,
  updateSuccess: false,
  orders: [],
};

export const userSlice = createSlice({
  name: 'user', 
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    userLogin: (state, { payload }) => {
      state.userID = payload;
      state.error = null;
      state.loading = false;
    },
    userLogout: (state) => {
      state.loading = false;
      state.error = null;
      state.userID = null;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    updateUserProfile: (state, { payload }) => {
      state.userID = payload;
      state.updateSuccess = true;
      state.loading = false;
      state.error = null;
    },
    resetUpdate: (state) => {
      state.updateSuccess = false;
    },
    signoutSuccess: (state) => {
      state.userID = null;
      state.loading = false;
      state.error = null;
      localStorage.setItem('userID', state.userInfo);
    },
  },
});

export const { setLoading, setError, userLogin, userLogout, updateUserProfile, resetUpdate, signoutSuccess } =
  userSlice.actions;
export default userSlice.reducer;

export const userSelector = (state) => state.user;
