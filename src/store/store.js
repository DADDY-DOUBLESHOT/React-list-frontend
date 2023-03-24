import { userReducer } from "./reducers/userReducers";
import { taskReducer } from "./reducers/taskReducers";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
  user: userReducer,
  task: taskReducer,
});

let initialState = {};

const middle = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middle))
);
export default store;
