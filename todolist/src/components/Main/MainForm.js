import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MainForm.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const MainForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

<<<<<<< HEAD
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Firebase Authentication을 사용하여 로그인 시도
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Firestore에서 사용자 정보 가져오기
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        console.log("로그인 성공", userDoc.data());
        navigate("/todo"); // 로그인 성공 시 '/todo' 페이지로 이동
      } else {
        console.error("사용자 정보가 Firestore에 존재하지 않습니다.");
      }
    } catch (error) {
      console.error("로그인 실패", error.message);
      alert(`로그인에 실패했습니다: ${error.message}`);
    }
=======
  const handleSubmit = (event) => {
    event.preventDefault(); // 폼 제출 시 페이지 리로드 방지
    // 로그인 로직 처리
    console.log("학번: ", studentId);
    console.log("비밀번호: ", password);
    // 여기에 서버로 로그인 정보를 보내는 등의 처리를 할 수 있습니다.
    navigate("/todo");
>>>>>>> 8fc60e61ad3d00226af5681c291739d88c859e3c
  };

  const handleSignUpButtonClick = () => {
    navigate("/signup");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">이메일</label>
          <input
            className="Minput-form"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
