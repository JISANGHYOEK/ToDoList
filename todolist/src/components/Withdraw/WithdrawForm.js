import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "firebase/auth";
import { auth } from "../firebase"; // Firebase Authentication 연동 파일
import "./WithdrawForm.css";

const WithdrawForm = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const handleWithdraw = async (event) => {
    event.preventDefault();

    try {
      const user = auth.currentUser; // 현재 로그인한 사용자 가져오기

      if (!user) {
        // 사용자가 로그인하지 않은 경우
        alert("로그인이 필요합니다.");
        return;
      }

      // 사용자의 이메일과 비밀번호로 인증 정보 생성
      const email = user.email;
      const credential = auth.EmailAuthProvider.credential(email, password);

      // 사용자 삭제 요청
      await deleteUser(user, credential);

      // 회원 탈퇴 성공 시 로그아웃 후 홈 화면으로 이동
      await auth.signOut();
      alert("회원탈퇴가 완료되었습니다.");
      navigate("/");
    } catch (error) {
      console.error("회원탈퇴 오류:", error);
      alert("회원탈퇴에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handlebackButtonClick = () => {
    navigate("../my");
  };

  return (
    <div className="withdrawContainer">
      <h2>회원탈퇴</h2>
      <p>정말로 회원을 탈퇴하겠습니까?</p>
      <p>탈퇴하시려면 비밀번호를 입력하세요.</p>
      <form onSubmit={handleWithdraw}>
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
      <div>
        <button
          type="button"
          className="back-button"
          onClick={handlebackButtonClick}
        >
          뒤로가기
        </button>
      </div>
    </div>
  );
};

export default WithdrawForm;
