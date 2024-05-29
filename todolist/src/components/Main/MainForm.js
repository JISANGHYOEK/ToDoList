import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MainForm.css";

const MainForm = () => {
  // 상태 관리를 위한 useState 훅 사용
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault(); // 폼 제출 시 페이지 리로드 방지
    // 로그인 로직 처리
    console.log("학번: ", studentId);
    console.log("비밀번호: ", password);
    // 여기에 서버로 로그인 정보를 보내는 등의 처리를 할 수 있습니다.
    navigate("/todo");
  };
  // 회원가입 페이지로 이동하는 함수
  const handleSignUpButtonClick = () => {
    navigate("/signup"); // '/signup'으로 이동
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="studentId">학번</label>
          <input
            className="Minput-form"
            type="text"
            id="studentId"
            name="studentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            className="Minput-form"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit" className="login-button">
            로그인
          </button>
        </div>
        <div>
          <button
            type="button"
            className="signup-button"
            onClick={handleSignUpButtonClick}
          >
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
};

export default MainForm;
