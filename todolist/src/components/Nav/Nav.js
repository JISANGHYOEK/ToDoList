import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/todo">캘린더</Link>
      <Link to="/grade">성적</Link>
      <Link to="/schedule">시간표</Link>
      <Link to="/my">내정보</Link>
    </nav>
  );
};

export default Navbar;
