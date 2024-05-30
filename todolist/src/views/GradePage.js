import React from "react";
import Grade from "../components/Grade/Grade";
import "./GradePage.css"; // CSS 파일 임포트

const GradePage = () => {
  return (
    <div className="GradePageContainer">
      <Grade />
    </div>
  );
};

export default GradePage;