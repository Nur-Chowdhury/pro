import axios from "axios";
import { addQueryRoute } from "../../utils/ApiRoutes";

axios.defaults.withCredentials = true;


export const addQuery = (description, id) => async (dispatch) => {
    try {
      const config = { 
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(addQueryRoute, {description, id}, config);
      localStorage.setItem('userInfo', JSON.stringify(data));
      return data;
    } catch (error) {
        console.log(error);
    }
};