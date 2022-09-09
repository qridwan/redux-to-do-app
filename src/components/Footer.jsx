import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetTodosQuery } from "../features/api/apiSlice";

const numberOfTodos = (no_of_todos) => {
  switch (no_of_todos) {
    case 0:
      return "No task";
    case 1:
      return "1 task";
    default:
      return `${no_of_todos} tasks`;
  }
};

export default function Footer({
  setStatusFilter,
  setColorFilter,
  colorFilter,
  statusFilter,
}) {
  const {
    data: todos,
    isLoading,
    isError,
  } = useGetTodosQuery({ status: statusFilter, color: colorFilter });
  const todosRemaining = todos?.filter((todo) => !todo.completed).length;

  const handleStatusChange = (status) => {
    console.log("status: ", status);
    setStatusFilter(status.toString());
  };

  const handleColorChange = (color) => {
    setColorFilter((prevColor) => {
      if (prevColor == color) {
        return "";
      }
      return color;
    });
  };

  return (
    <div className="mt-4 flex justify-between text-xs text-gray-500">
      <p>{numberOfTodos(todosRemaining)} left</p>
      <ul className="flex space-x-1 items-center text-xs">
        <li
          className={`cursor-pointer ${statusFilter === "all" && "font-bold"}`}
          onClick={() => handleStatusChange("all")}
        >
          All
        </li>
        <li>|</li>
        <li
          className={`cursor-pointer ${
            statusFilter === "false" && "font-bold"
          }`}
          onClick={() => handleStatusChange(false)}
        >
          Incomplete
        </li>
        <li>|</li>
        <li
          className={`cursor-pointer
             ${statusFilter === "true" && "font-bold"}`}
          onClick={() => handleStatusChange(true)}
        >
          Complete
        </li>
        <li></li>
        <li></li>
        <li
          className={`h-3 w-3 border-2 border-green-500 md:hover:bg-green-500 rounded-full cursor-pointer ${
            colorFilter === "green" && "bg-green-500"
          }`}
          onClick={() => handleColorChange("green")}
        ></li>
        <li
          className={`h-3 w-3 border-2 border-red-500 md:hover:bg-red-500 rounded-full cursor-pointer ${
            colorFilter === "red" && "bg-red-500"
          }`}
          onClick={() => handleColorChange("red")}
        ></li>
        <li
          className={`h-3 w-3 border-2 border-yellow-500 md:hover:bg-yellow-500 rounded-full cursor-pointer ${
            colorFilter === "yellow" && "bg-yellow-500"
          }`}
          onClick={() => handleColorChange("yellow")}
        ></li>
      </ul>
    </div>
  );
}
