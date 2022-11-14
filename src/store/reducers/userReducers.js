import * as user from "../actionTypes/userConstants";

const initialState = {
  name: "",
  token: "",
  toast: false,
  message: "Toast message",
  user_id: "",
  avatar: 0,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case user.LOGIN:
      console.log("avatar found", action.payload.avatar);
      return {
        ...state,
        name: action.payload.name,
        user_id: action.payload.id,
        token: action.payload.token,
        avatar: action.payload.avatar,
      };
    case user.REGISTER:
      return {
        name: state.name,
        email: state.email,
        password: state.password,
        token: state.token,
        avatar: action.payload.avatar,
      };
    case user.TOAST:
      return {
        ...state,
        message: action.payload.message,
        toast: action.payload.toast,
      };
    case user.LOGOUT:
      return {
        initialState,
      };
    case user.DATA:
      return state;
    default:
      return state;
  }
};
