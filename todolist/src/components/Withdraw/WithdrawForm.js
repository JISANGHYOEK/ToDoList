import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // Firebase Firestore 연동 파일
import "./WithdrawForm.css";

const WithdrawForm = () => {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleWithdraw = async (event) => {
    event.preventDefault();

    try {
      // 사용자가 입력한 학번으로 해당 사용자의 정보를 가져옵니다.
      const userRef = doc(db, "users", studentId);
      const userSnap = await getDoc(userRef);
      
      // 사용자가 존재하고, 입력한 비밀번호가 일치할 때에만 삭제 작업을 수행합니다.
      if (userSnap.exists() && userSnap.data().password === password) {
        await deleteDoc(userRef); // 사용자 삭제
        alert("회원탈퇴가 완료되었습니다.");
        navigate("/");
      } else {
        alert("학번 또는 비밀번호가 올바르지 않습니다.");
      }
    } catch (error) {
      console.error("회원탈퇴 오류:", error);
    }
  };

  return (
    <div className="withdrawContainer">
      <h2>회원탈퇴</h2>
      <p>정말로 회원을 탈퇴하겠습니까?</p>
      <p>탈퇴하시려면 학번과 비밀번호를 입력하세요.</p>
      <form onSubmit={handleWithdraw}>
        <div>
          <input
            type="text"
            id="studentId"
            name="studentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="withdraw-button">
          회원탈퇴
        </button>
      </form>
    </div>
  );
};

export default WithdrawForm;
