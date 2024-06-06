import React, { useState } from "react";
import "./SignupForm.css";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase"; // Firebase 연동 파일

const SignupForm = () => {
  // 상태(state)를 사용하여 입력 필드의 값을 저장
  const [userInfo, setUserInfo] = useState({
    username: "",
    studentId: "",
    emailPrefix: "",
    password: "",
  });

  const [isAgreed, setIsAgreed] = useState(false); //약관 동의 체크박스 상태

  // 입력 필드가 변경될 때마다 해당 상태를 업데이트하는 함수
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  // 이메일의 @ 앞부분만 처리하는 handleChangeEmailPrefix 함수 추가
  const handleChangeEmailPrefix = (e) => {
    setUserInfo({
      ...userInfo,
      emailPrefix: e.target.value,
    });
  };

  // 약관 동의 체크박스 변경 처리 함수
  const handleAgreementChange = (e) => {
    setIsAgreed(e.target.checked);
  };

  // 폼 제출 시 실행될 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAgreed) {
      alert("약관 동의를 완료해주세요.");
      return;
    }

    try {
      // Firebase Authentication을 사용하여 사용자 생성
      const { user } = await createUserWithEmailAndPassword(
        auth,
        `${userInfo.emailPrefix}@syuin.ac.kr`, // 학교 이메일 형식으로 사용자 이메일 생성
        userInfo.password
      );

      // Firestore에 사용자 정보 저장
      await setDoc(doc(db, "users", user.uid), {
        username: userInfo.username,
        studentId: userInfo.studentId,
        email: `${userInfo.emailPrefix}@syuin.ac.kr`,
        password: userInfo.password, // 학교 이메일 형식으로 저장
        createdAt: new Date(),
      });

      // 회원가입 성공 시 메시지 표시
      alert("회원가입이 완료되었습니다.");
    } catch (error) {
      console.error("Error signing up:", error);
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const navigate = useNavigate();
  // 회원가입 페이지로 이동하는 함수
  const handleSignUpButtonClick = () => {
    navigate("/"); // '/'으로 이동
  };


  return (
    <div>
      <form className="AA" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">사용자 이름:</label>
          <input
            className="Sinput-form"
            type="text"
            id="username"
            name="username"
            value={userInfo.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="studentId">학번:</label>
          <input
            className="Sinput-form"
            type="text"
            id="studentId"
            name="studentId"
            value={userInfo.studentId}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">이메일:</label>
          <input
            className="Sinput-form"
            type="text"
            id="emailPrefix"
            name="emailPrefix"
            value={userInfo.emailPrefix}
            onChange={handleChangeEmailPrefix}
          />
          <span>@syuin.ac.kr</span>
        </div>
        <div>
          <label htmlFor="password">비밀번호:</label>
          <input
            className="Sinput-form"
            type="password"
            id="password"
            name="password"
            value={userInfo.password}
            onChange={handleChange}
          />
        </div>
        <div className="agree">
          <label className="text1">
            계정을 만들고 사용 약관 및 개인 정보 보호 정책에 동의합니다.
            <input
              type="checkbox"
              checked={isAgreed}
              onChange={handleAgreementChange}
            ></input>
          </label>
        </div>
        <div>
          <button
            type="submit"
            disabled={!isAgreed} // 약관에 동의하지 않으면 버튼 비활성화
            style={{
              backgroundColor: isAgreed ? "#4a90e2" : "grey", // 약관 동의 여부에 따라 배경색 변경
              color: "white",
              cursor: isAgreed ? "pointer" : "not-allowed", // 마우스 커서 스타일 변경
            }}
          >
            가입하기
          </button>
        </div>     
        <div>
          <button
            type="button"
            className="button"
            onClick={handleSignUpButtonClick}
          >
            로그인하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
