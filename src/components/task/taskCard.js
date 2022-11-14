import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  updateTask,
  getTask,
} from "../../store/actionsCreators/taskActions";

const TaskCard = (task) => {
  let dispatch = useDispatch();
  let user = useSelector((state) => state.user);
  let [current, setCurrent] = useState({
    edit: false,
    value: task.task.task,
    id: task.task._id,
  });
  let handleEdit = () => {
    console.log("Editing ", task.task._id);
    setCurrent({ ...current, edit: false });
    dispatch(
      updateTask(task.task._id, user.token, current.value, user.user_id)
    );
  };
  let handleDelete = () => {
    console.log("Deleting ", task.task._id);
    dispatch(deleteTask(current.id, user.token));
    dispatch(getTask(user.user_id, user.token));
  };
  let handleDone = () => {
    dispatch(
      updateTask(task.task._id, user.token, current.value, true, user.user_id)
    );
  };
  return (
    <React.Fragment>
      <div className="relative mb-6">
        <div className="flex absolute inset-y-0 right-0 items-center pl-3">
          <AiFillDelete
            onClick={() => {
              handleDelete();
            }}
            className="text-red-500 w-5 h-5 mx-2"
          />
          {current.edit ? (
            <button
              onClick={() => {
                handleEdit();
              }}
              className="bg-green-500 rounded p-2 m-1 text-white"
            >
              SAVE
            </button>
          ) : (
            <AiFillEdit
              onClick={() => {
                setCurrent({ ...current, edit: true });
              }}
              className="text-blue-500 w-5 h-5 mx-2"
            />
          )}
        </div>
        {!task.task.done && (
          <IoCheckmarkDoneSharp
            onClick={() => {
              handleDone();
            }}
            className="flex absolute inset-y-0 left-0 top-2 mx-2 font-bold text-green-500 items-center w-5 h-5"
          />
        )}
        <input
          type="text"
          id="input-group-1"
          disabled={!current.edit}
          value={current.value}
          onChange={(e) => {
            setCurrent({ ...current, value: e.target.value });
          }}
          className={
            "border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  " +
            (task.task.done ? "bg-green-200" : "")
          }
        />
      </div>
    </React.Fragment>
  );
};

export default TaskCard;
