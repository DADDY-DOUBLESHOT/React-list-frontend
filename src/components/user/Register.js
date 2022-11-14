import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { register } from "../../store/actionsCreators/userActions";
import { useNavigate } from "react-router-dom";
import av1 from "../../assests/avatar/av1.png";
import av2 from "../../assests/avatar/av2.png";
import av3 from "../../assests/avatar/av3.png";
import av4 from "../../assests/avatar/av4.png";

const Register = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  let dispatch = useDispatch();
  let [signupData, setSignupData] = useState({
    email: "",
    name: "",
    password: "",
    rpassword: "",
  });
  let [avatar, changeAvatar] = useState(0);
  let left = () => {
    changeAvatar(avatar == 0 ? 0 : avatar - 1);
  };
  let right = () => {
    changeAvatar(avatar == 3 ? 3 : avatar + 1);
  };

  let check = () => {
    let regexpEmail = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$");
    let regexpPass = new RegExp(
      "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$"
    );
    let regexpName = new RegExp("^[a-zA-Z]{2,30}$");
    if (regexpEmail.test(signupData.email)) {
      return false;
    }
    if (regexpPass.test(signupData.password)) {
      return false;
    }
    if (signupData.password !== signupData.rpassword) {
      return false;
    }
    return true;
  };
  let handleRegister = async () => {
    if (!check()) {
      dispatch(
        register(signupData.email, signupData.password, signupData.name, avatar)
      );
      if (user) {
        navigate("/task");
      } else {
        //wrong inpput
      }
    }
  };
  let handleLogin = () => {
    navigate("/");
  };
  return (
    <React.Fragment>
      <form
        onSubmit={() => {
          handleRegister();
        }}
        className="flex flex-col mx-auto mt-10 w-2/6 h-fit bg-white rounded-lg justify-between items-center px-10 py-10"
      >
        <h4 className="font-semibold">Choose an Avatar</h4>
        <div className="flex  justify-between items-center">
          <AiFillCaretLeft
            className="px-5 w-16 h-16"
            onClick={() => {
              left();
            }}
          />
          <div className="w-32 h-32">
            {avatar == 0 && (
              <img
                src={av1}
                className="rounded-full object-cover"
                alt="avatar"
              />
            )}
            {avatar == 1 && (
              <img
                src={av2}
                className="rounded-full object-cover"
                alt="avatar"
              />
            )}
            {avatar == 2 && (
              <img
                src={av3}
                className="rounded-full object-cover"
                alt="avatar"
              />
            )}
            {avatar == 3 && (
              <img
                src={av4}
                className="rounded-full object-cover"
                alt="avatar"
              />
            )}
          </div>
          <AiFillCaretRight
            onClick={() => {
              right();
            }}
            className="px-5 w-16 h-16"
          />
        </div>
        <div className="w-full">
          <div className="w-full mb-3">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email address
            </label>
            <input
              onChange={(e) => {
                setSignupData({ ...signupData, email: e.target.value });
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
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Name
            </label>
            <input
              onChange={(e) => {
                setSignupData({ ...signupData, name: e.target.value });
              }}
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="John Doe"
              required
            />
          </div>
          <div className="w-full mb-3">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              onChange={(e) => {
                setSignupData({ ...signupData, password: e.target.value });
              }}
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="******"
              required
            />
          </div>
          <div className="w-full mb-3">
            <label
              htmlFor="rpassword"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Re-enter Password
            </label>
            <input
              onChange={(e) => {
                setSignupData({ ...signupData, rpassword: e.target.value });
              }}
              type="password"
              id="rpassword"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="******"
              required
            />
          </div>
        </div>
        <div className="flex  flex-col  mt-5 justify-center items-center">
          <button
            type="submit"
            class="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          >
            Register
          </button>
          <p className="text-sm ">
            Already have an account?
            <span>
              <button
                className="text-blue-700 pl-2"
                onClick={() => {
                  handleLogin();
                }}
              >
                Login
              </button>
            </span>
          </p>
        </div>
      </form>
    </React.Fragment>
  );
};
export default Register;
