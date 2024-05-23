import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 임포트
import "./WithdrawForm.css";

const WithdrawForm = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleWithdraw = (event) => {
    event.preventDefault();

    // 회원탈퇴 로직 처리
    console.log("Password: ", password);
    // 여기에 서버로 회원탈퇴 요청을 보내는 등의 처리를 할 수 있습니다.

    // 회원탈퇴 처리가 성공적으로 완료되었다고 가정하고, alert을 사용하여 알림을 주고 홈페이지로 이동시킵니다.
    alert("회원탈퇴가 완료되었습니다.");
    navigate("/"); // 홈 페이지로 이동
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
    </div>
  );
};

export default WithdrawForm;
