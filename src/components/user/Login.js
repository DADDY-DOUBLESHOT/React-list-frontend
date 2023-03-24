import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, setToast } from "../../store/actionsCreators/userActions";

const Login = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let user = useSelector((state) => state.user);
  let [loginData, setLogin] = useState({
    email: "",
    password: "",
  });

  let regexpEmail = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$");
  let regexpPass = new RegExp(
    "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$"
  );
  let check = () => {
    if (!regexpEmail.test(loginData.email)) {
      return false;
    }
    if (!regexpPass.test(loginData.password)) {
      return false;
    }
    return true;
  };

  let handleLogin = async (e) => {
    e.preventDefault();
    if (check()) {
      dispatch(login(loginData.email, loginData.password));
      if (user.token) {
        navigate("/task");
        dispatch(setToast("Logged in Successfully"));
      } else {
        //wrong inpput
        dispatch(setToast("Sorry there was some error"));
      }
    }
  };
  let handleSignup = () => {
    navigate("/signup");
  };

  return (
    <React.Fragment>
      <form
        onSubmit={(e) => {
          handleLogin(e);
        }}
        className="flex flex-col mx-auto mt-20 w-1/4 h-2/5 bg-white rounded-lg justify-between items-center px-10 py-16"
      >
        <h4 className="font-semibold">LOGIN</h4>
        <div className="w-full mb-3">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Email address
          </label>
          <input
            onChange={(e) => {
              setLogin({ ...loginData, email: e.target.value });
            }}
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="john.doe@company.com"
            required
          />
        </div>
        <div className="w-full mb-3">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Password
          </label>
          <input
            onChange={(e) => {
              setLogin({ ...loginData, password: e.target.value });
            }}
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="•••••••••"
            required
          />
        </div>
        <p className="flex text-sm">
          Don't have an account?
          <span>
            <button
              onClick={() => {
                handleSignup();
              }}
              className="text-blue-700"
            >
              Signup
            </button>
          </span>
        </p>
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
        >
          LOGIN
        </button>
      </form>
    </React.Fragment>
  );
};
export default Login;
