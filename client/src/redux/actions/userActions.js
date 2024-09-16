import axios from 'axios';
import {
  setLoading,
  setError,
  userLogin,
  userLogout,
  updateUserProfile,
  resetUpdate,
} from '../slices/user';
import { loginRoute, registerRoute, subscribeRoute } from '../../utils/ApiRoutes';
import {toast} from 'react-toastify';

axios.defaults.withCredentials = true;

export const register = (refID, name, email, password, transactionPassword) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await axios.post(registerRoute, {refID, name, email, password, transactionPassword });
      console.log(data);
      toast.success(data);
      dispatch(setLoading(false));
    } catch (error) {
        console.log(error);
        toast.error(
          error.response && error.response.data
            ? error.response.data
            : error.message
            ? error.message
            : 'An unexpected error has occured. Please try again later.'
        )
      dispatch(setLoading(false));
    }
};

export const login = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    console.log("hi");
        
    const { data } = await axios.post(loginRoute, { email, password });
    console.log(data);
    dispatch(userLogin(data));
    localStorage.setItem('userID', JSON.stringify(data));
    toast.success("Login Success!");
    dispatch(setLoading(false));
  } catch (error) {
    console.log(error);
      toast.error(
        error.response && error.response.data
          ? error.response.data
          : error.message
          ? error.message
          : 'An unexpected error has occured. Please try again later.'
      )
    dispatch(setLoading(false));
  }
};

export const subscribe = (value, id, type) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(subscribeRoute, {value, id, type}, config);
    console.log(data);
    dispatch(userLogin(data));
    localStorage.setItem('userID', JSON.stringify(data));
    toast.success("Subscription Successful!");
    dispatch(setLoading(false));
  } catch (error) {
      dispatch(setLoading(false));
      error.response && error.response.data
        ? toast.error(error.response.data)
        : error.message
        ? toast.error(error.message)
        : toast.error('An unexpected error has occured. Please try again later.')
  }
};
