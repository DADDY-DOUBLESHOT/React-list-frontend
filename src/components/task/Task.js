import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  clearTask,
  getTask,
} from "../../store/actionsCreators/taskActions";
import TaskCard from "./taskCard";
import { useNavigate } from "react-router-dom";
import { closeToast, setToast } from "../../store/actionsCreators/userActions";

const Task = () => {
  let user = useSelector((state) => state.user);
  let task = useSelector((state) => state.task);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let [taskData, setTaskData] = useState({
    searchKey: "",
    type: 1,
    search: false,
  });
  useEffect(() => {
    if (!user.token) {
      navigate("/");
    }
    dispatch(getTask(user.user_id, user.token));
    setTaskData({ ...taskData, update: true });
  }, []);

  let [newTask, createNewTask] = useState("");

  let handleRefresh = async () => {
    setTaskData({ searchKey: "", search: false });
    dispatch(getTask(user.user_id, user.token));
    dispatch(setToast("List Refreshed"));
  };

  let handleClear = () => {
    dispatch(clearTask(user.user_id, user.token));
    dispatch(setToast("List Cleared"));
  };
  let handleSearch = () => {
    setTaskData({ ...taskData, search: true });
  };
  let handleAdd = () => {
    dispatch(addTask(newTask, false, user.user_id, user.token));
    dispatch(setToast("Task Added"));
  };
  return (
    <React.Fragment>
      <div className="flex flex-row mx-auto w-4/6 h-2/3   rounded-lg justify-between space-x-10 px-10 py-16">
        <div className="flex flex-col mx-auto mt-20 w-5/6 h-fit bg-white rounded-lg space-y-3 px-10 py-16">
          <div className="flex flex-row w-full space-x-2 items-center justify-center">
            <input
              onChange={(e) => {
                createNewTask(e.target.value);
              }}
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Enter a Task name"
              required
            />
            <button
              type="button"
              onClick={() => {
                handleAdd();
              }}
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              ADD
            </button>
          </div>
          <div className="border-2 rounded p-5 space-y-10 border-slate-300">
            <div className="flex flex-row w-2/6 space-x-2 items-center justify-center">
              <input
                onChange={(e) => {
                  setTaskData({ ...taskData, searchKey: e.target.value });
                }}
                type="text"
                value={taskData.searchKey}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Search a Task"
                required
              />
              <button
                type="button"
                onClick={() => {
                  handleSearch();
                }}
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </button>
            </div>
            {task.tasks[0] &&
              taskData.search &&
              task.tasks[0]
                .filter((item) =>
                  item.task.match(new RegExp(taskData.searchKey, "i"))
                )
                .map((item, id) => {
                  return <TaskCard key={id} task={item} />;
                })}
            {task.tasks[0] &&
              !taskData.search &&
              task.tasks[0]
                .filter((item) => {
                  return !item.done;
                })
                .map((item, id) => {
                  return <TaskCard key={id} task={item} />;
                })}
            <h4 className="text-gray-400">Completed</h4>
            {task.tasks[0] &&
              !taskData.search &&
              task.tasks[0]
                .filter((item) => {
                  return item.done;
                })
                .map((item, id) => {
                  return <TaskCard key={id} task={item} />;
                })}
          </div>
        </div>
        <div className="flex flex-col mx-auto mt-20 w-1/6 h-fit bg-white rounded-lg justify-between items-center px-10 py-16">
          <button
            type="button"
            onClick={() => {
              handleRefresh();
            }}
            class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
          >
            Refresh
          </button>
          <button
            type="button"
            onClick={() => {
              handleClear();
            }}
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          >
            ClearList
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Task;
