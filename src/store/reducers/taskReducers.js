import * as task from "../actionTypes/taskConstants";

const initialState = {
  tasks: [],
};

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case task.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload.task],
      };
    case task.GET_TASKS:
      return {
        ...state,
        tasks: [action.payload.tasks],
      };
    case task.UPDATE_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload.task],
      };
    case task.REMOVE_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload.tasks],
      };
    case task.CLEAR_TASKS:
      return {
        state,
      };
    default:
      return state;
  }
};
