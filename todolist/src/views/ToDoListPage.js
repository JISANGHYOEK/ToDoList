import React from "react";
import ToDoList from "../components/ToDoList/ToDoList";
import "./ToDoListPage.css"; // CSS 파일 임포트
import Nav from "../components/Nav/Nav";

const ToDoListPage = () => {
  return (
    <div className="ToDoListPageContainer">
      <ToDoList />
    </div>
  );
};

export default ToDoListPage;
