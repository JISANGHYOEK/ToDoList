import React from "react";
import ToDoList from "../components/ToDoList/ToDoList";
import "./ToDoListPage.css"; // CSS 파일 임포트

const ToDoListPage = () => {
  return (
    <div className="ToDoListPageContainer">
      <ToDoList />
    </div>
  );
};

export default ToDoListPage;
