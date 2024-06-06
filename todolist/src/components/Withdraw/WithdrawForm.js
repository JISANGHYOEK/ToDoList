import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, EmailAuthProvider, reauthenticateWithCredential, deleteUser } from "firebase/auth";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import "./WithdrawForm.css";

const WithdrawForm = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const db = getFirestore();

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
      const credential = EmailAuthProvider.credential(email, password);

      try {
        // 사용자 재인증
        await reauthenticateWithCredential(user, credential);
        console.log("사용자 재인증 성공");
      } catch (reauthError) {
        console.error("재인증 오류:", reauthError);
        if (reauthError.code === 'auth/wrong-password') {
          alert("비밀번호가 잘못되었습니다.");
        } else {
          alert("다시 시도해주세요.");
        }
        return;
      }

      try {
        // Firestore에서 사용자 데이터 삭제
        const userDoc = doc(db, "users", user.uid); // 사용자의 문서 참조
        await deleteDoc(userDoc);
        console.log("Firestore 사용자 데이터 삭제 성공");
      } catch (dbError) {
        console.error("Firestore 데이터 삭제 오류:", dbError);
        alert("회원탈퇴에 실패했습니다. 다시 시도해주세요.");
        return;
      }

      try {
        // 사용자 삭제 요청
        await deleteUser(user);
        console.log("사용자 삭제 성공");
      } catch (deleteError) {
        console.error("사용자 삭제 오류:", deleteError);
        alert("회원탈퇴에 실패했습니다. 다시 시도해주세요.");
        return;
      }

      // 회원 탈퇴 성공 시 로그아웃 후 홈 화면으로 이동
      alert("회원탈퇴가 완료되었습니다.");
      navigate("/");
    } catch (error) {
      console.error("회원탈퇴 전체 오류:", error);
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
