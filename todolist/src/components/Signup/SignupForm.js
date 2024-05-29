import React, { useState } from "react";
import "./SignupForm.css";

import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase"; // Firebase Firestore 연동 파일

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
    console.log(userInfo);
    // 회원 정보를 Firestore에 저장
    try {
      await setDoc(doc(db, "users", userInfo.username), {
        ...userInfo,
        createdAt: new Date(),
      });
      // 회원가입 성공 시 로그인 화면으로 이동
      window.location.href = "/";
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
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
            value={userInfo.userid}
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
          <span>@suyin.ac.kr</span>
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
      </form>
    </div>
  );
};

export default SignupForm;
