import * as task from "../actionTypes/taskConstants";
import axios from "axios";

// adding task to store and database
export const addTask = (name, status, id, token) => async (dispatch) => {
  try {
    var data = JSON.stringify({
      task: name,
      done: status,
      user_id: id,
    });

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_ADDTASK}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        const data = {
          task: {
            task: name,
            done: status,
          },
        };
        const action = {
          type: task.ADD_TASK,
          payload: data,
        };
        dispatch(action);
        console.log("task added");
      })
      .catch(function (error) {
        console.log("error in adding task");
      });
  } catch (error) {
    console.log("error in calling task add ");
  }
};
// getting tasks from database
export const getTask = (id, token) => async (dispatch) => {
  try {
    var data = JSON.stringify({
      user_id: id,
    });

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_GETTASKS}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        const data = {
          tasks: response.data,
        };
        const action = {
          type: task.GET_TASKS,
          payload: data,
        };
        dispatch(action);
        console.log("got new list");
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {
    console.log("error in getting tasks");
  }
};
// updating task to store and database
export const updateTask =
  (id, token, task, status, user) => async (dispatch) => {
    console.log(user);
    try {
      var data = JSON.stringify({
        id: id,
        task: task,
        done: status,
        user_id: user,
      });

      var config = {
        method: "post",
        url: `${process.env.REACT_APP_UPDATETASK}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log("task updated", response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
// deleting task from store and database
export const deleteTask = (id, token) => (dispatch) => {
  try {
    var data = JSON.stringify({
      id: id,
    });

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_REMOVETASKS}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        const data = {
          tasks: response.data,
        };
        dispatch({ type: task.REMOVE_TASK, payload: response.data });
        // dispatch({ type: task.GET_TASKS, payload: response.data });
        console.log("deleted task");
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {
    console.log("error delete");
  }
};
// removing tasks from  store and database
export const clearTask = (id, token) => (dispatch) => {
  try {
    var data = JSON.stringify({
      id: id,
    });

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_CLEAR}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log("list cleared");
        dispatch({ type: task.CLEAR_TASKS, payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {}
};
