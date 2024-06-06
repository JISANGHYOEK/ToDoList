import React, { useState, useEffect } from "react";
import "./MyForm.css";
import { useNavigate } from "react-router-dom";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase"; // Firebase Firestore 및 Authentication 연동 파일

const MyForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // 현재 로그인한 사용자의 정보를 가져오는 함수
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const userId = currentUser.uid; // 현재 사용자의 UID
          const userDocRef = doc(db, "users", userId); // 사용자 문서 참조
          const userDocSnap = await getDoc(userDocRef); // 사용자 문서 가져오기
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data(); // 사용자 데이터
            console.log("사용자 데이터:", userData); // 사용자 데이터 로그 출력
            setUsername(userData.username || "");
            setEmail(userData.email || "");
            setPhone(userData.phone || "");
          } else {
            console.error("사용자 문서가 존재하지 않습니다.");
          }
        }
      } catch (error) {
        console.error("사용자 데이터 가져오기 오류:", error);
      }
    };

    // 사용자 정보 가져오기
    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userId = currentUser.uid; // 현재 사용자의 UID
        const userDocRef = doc(db, "users", userId); // 사용자 문서 참조
        await updateDoc(userDocRef, {
          username: username,
          email: email,
          phone: phone,
        });
        alert("사용자 정보가 성공적으로 업데이트되었습니다.");
      }
    } catch (error) {
      console.error("사용자 데이터 업데이트 오류:", error);
      alert("사용자 정보 업데이트에 실패했습니다.");
    }
  };

  const handleLogoutButtonClick = async () => {
    try {
      await auth.signOut(); // Firebase에서 로그아웃
      alert("로그아웃이 완료되었습니다.");
      navigate("/"); // 홈 페이지 또는 로그인 페이지로 이동
    } catch (error) {
      console.error("로그아웃 오류:", error);
      alert("로그아웃에 실패했습니다.");
    }
  };

  const handleWithdrawPageButtonClick = () => {
    navigate("/withdraw"); // Withdraw 페이지로 이동
  };

  return (
    <div className="form-container">
      <h2 className="form-title">내 정보</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            이름:
          </label>
          <input
            type="text"
            id="username"
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="이름을 입력하세요"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            이메일:
          </label>
          <input
            type="email"
            id="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력하세요"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone" className="form-label">
            전화번호:
          </label>
          <input
            type="tel"
            id="phone"
            className="form-input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="전화번호를 입력하세요"
          />
        </div>
        <button type="submit" className="form-button">
          저장
        </button>
      </form>
      <div>
        <button
          type="button"
          className="withdraw-page-button"
          onClick={handleWithdrawPageButtonClick}
        >
          회원탈퇴
        </button>
        <button
          type="button"
          className="logout-button"
          onClick={handleLogoutButtonClick}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default MyForm;
