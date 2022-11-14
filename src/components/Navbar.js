import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GrNotes } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/actionsCreators/userActions";
import av1 from "../assests/avatar/av1.png";
import av2 from "../assests/avatar/av2.png";
import av3 from "../assests/avatar/av3.png";
import av4 from "../assests/avatar/av4.png";
const Navbar = () => {
  let user = useSelector((state) => state.user);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let handleLogin = () => {
    navigate("/");
  };
  let handleRegister = () => {
    navigate("/signup");
  };
  let handleLogout = () => {
    dispatch(logout())
    navigate('/');
  };
  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <a href="https://flowbite.com/" className="flex items-center">
          <GrNotes className="bg-purple-500 w-8 h-8 mr-5" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            TODO-LIST
          </span>
        </a>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border items-center border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {!user.token && (
              <li
                onClick={() => {
                  handleLogin();
                }}
              >
                <a
                  className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                >
                  LOGIN
                </a>
              </li>
            )}
            {!user.token && (
              <li
                onClick={() => {
                  handleRegister();
                }}
              >
                <a
                  className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                >
                  REGISTER
                </a>
              </li>
            )}
            {user.name && (
              <li  className="inline-flex mx-5 text-lg items-center text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
              >
                 Hi {user.name}
                 {user.avatar+1==1&&<img src={av1} alt="profile-image"  className="w-8 h-8 ml-2 rounded-full" />}
                 {user.avatar+1==2&&<img src={av2} alt="profile-image"  className="w-8 h-8 ml-2 rounded-full" />}
                 {user.avatar+1==3&&<img src={av3} alt="profile-image"  className="w-8 h-8 ml-2 rounded-full" />}
                 {user.avatar+1==4&&<img src={av4} alt="profile-image"  className="w-8 h-8 ml-2 rounded-full" />}
              </li>
            )}
            {user.token && (
              <li
                onClick={() => {
                  handleLogout();
                }}
              >
                <a
                  className="block text-lg py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                >
                  LOGOUT
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
