import axios from "axios";
import {setLoading, setError, setTask, removeTask} from '../slices/taskSlice'
import { fetchTaskRoute, getTaskByIdRoute, nextIndexRoute, surveyDoneRoute } from "../../utils/ApiRoutes";
import { userLogin } from "../slices/user";

axios.defaults.withCredentials = true;


export const setUserTask = (id) => async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const config = { 
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      const { data } = await axios.post(fetchTaskRoute, {id}, config);
      dispatch(userLogin(data));
      dispatch(setLoading(false));
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        console.log(error);
        dispatch(
            setError(
                error.response && error.response.data
                ? error.response.data
                : error.message
                ? error.message
                : 'An unexpected error has occured. Please try again later.'
            )
        );
        dispatch(setLoading(false));
    }
};

export const getTask = (id) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const config = { 
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      const { data } = await axios.post(getTaskByIdRoute, {id}, config);
      console.log(data);
      dispatch(setTask(data));
      localStorage.setItem('currentTask', JSON.stringify(data));
      dispatch(setLoading(false));
    } catch (error) {
        console.log(error);
        dispatch(
            setError(
                error.response && error.response.data
                ? error.response.data
                : error.message
                ? error.message
                : 'An unexpected error has occured. Please try again later.'
            )
        );
        dispatch(setLoading(false));
    }
};

export const nextIndex = (id) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const config = { 
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(nextIndexRoute, {id}, config);
    dispatch(userLogin(data));
    dispatch(setLoading(false));
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
      console.log(error);
      dispatch(
          setError(
              error.response && error.response.data
              ? error.response.data
              : error.message
              ? error.message
              : 'An unexpected error has occured. Please try again later.'
          )
      );
      dispatch(setLoading(false));
  }
};

export const surveyDone = (id, taskId) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const config = { 
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(surveyDoneRoute, {id, taskId}, config);
    dispatch(userLogin(data));
    dispatch(removeTask());
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
      console.log(error);
      dispatch(
          setError(
              error.response && error.response.data
              ? error.response.data
              : error.message
              ? error.message
              : 'An unexpected error has occured. Please try again later.'
          )
      );
  }
};