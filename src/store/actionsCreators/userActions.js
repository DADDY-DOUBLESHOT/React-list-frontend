import * as USER from "../actionTypes/userConstants";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// perfoming login and saving data to store

export const login = (email, password) => async (dispatch) => {
  try {
    // dispatch({ type: USER.LOGIN_START });
    var data = JSON.stringify({
      email: email,
      password: password,
    });

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_LOGIN}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
        const data = {
          name: response.data.user.name,
          id: response.data.user._id,
          token: response.data.token,
          avatar: response.data.user.avatar,
        };
        const action = {
          type: USER.LOGIN,
          payload: data,
        };
        localStorage.setItem("todo", response.data.token);
        dispatch(action);
        console.log("login success", response.data.user);
        // dispatch({ type: USER.LOGIN_STOP });
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {}
};

// registering user in database
export const register = (email, password, name, avatar) => async (dispatch) => {
  try {
    // dispatch({ type: USER.REGISTER_START });
    var data = JSON.stringify({
      email: email,
      password: password,
      name: name,
      avatar: avatar,
    });

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_REGISTER}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
        const data = {
          email: email,
          password: password,
          name: name,
          avatar: avatar,
        };
        const action = {
          type: USER.REGISTER,
          payload: data,
        };
        dispatch(action);
        console.log("regsiter success");
        // dispatch({ type: USER.REGISTER_STOP });
      })
      .catch(function (error) {
        console.log(error);
        // dispatch({ type: USER.REGISTER_STOP });
      });
  } catch (error) {}
};

// removing user data from store and localstorage
export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: USER.LOGOUT });
    localStorage.removeItem("todo");
  } catch (error) {}
};

//getting task data from database
export const getData = () => async (dispatch) => {
  try {
    dispatch({ type: USER.DATA });
  } catch (error) {}
};
//setting toast data
export const setToast = (message) => async (dispatch) => {
  try {
    const data = {
      message: message,
      toast: true,
    };
    dispatch({ type: USER.TOAST, payload: data });
  } catch (error) {}
};
export const closeToast = () => async (dispatch) => {
  try {
    const data = {
      toast: false,
    };
    dispatch({ type: USER.TOAST, payload: data });
  } catch (error) {}
};
