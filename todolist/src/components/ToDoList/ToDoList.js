import React from "react";
import ToDoListForm from "./ToDoListForm";
import Navbar from "../Nav/Nav";

const ToDoList = () => {
  return (
    <div className="ToDoListPageContainer">
      <Navbar />
      <ToDoListForm />
    </div>
  );
};

export default ToDoList;
