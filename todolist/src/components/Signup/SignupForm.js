import React, { useState } from "react";
import "./SignupForm.css";

const SignupForm = () => {
  // 상태(state)를 사용하여 입력 필드의 값을 저장
  const [userInfo, setUserInfo] = useState({
    username: "",
    studentId: "",
    emailPrefix: "",
    password: "",
  });

  const [verificationCode, setVerificationCode] = useState(""); // 인증 코드
  const [isEmailSent, setIsEmailSent] = useState(false); // 이메일 전송 여부
  const [isVerified, setIsVerified] = useState(false); // 이메일 인증 여부
  const [isCodeCorrect, setIsCodeCorrect] = useState(null); // 인증 코드 정확성
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
  // 이메일 보내는 함수
  const sendEmail = () => {
    // 이메일 전송 로직 (예시)
    console.log("이메일 전송 로직 실행");
    setIsEmailSent(true); // 가정: 이메일이 성공적으로 전송됨
  };

  // 인증 코드 입력 처리
  const handleCodeChange = (e) => {
    const code = e.target.value.replace(/[^A-Za-z0-9]/g, "");
    setVerificationCode(code);
  };

  // 이메일 인증 확인
  const verifyEmailCode = () => {
    // 가정: 'hello1'이 올바른 코드
    if (verificationCode === "hello1") {
      setIsVerified(true);
      setIsCodeCorrect(true);
      alert("인증에 성공하였습니다."); // 인증 성공 알림
    } else {
      setIsVerified(false);
      setIsCodeCorrect(false);
      setVerificationCode(""); // 인증 코드 초기화
      alert("인증 코드가 잘못되었습니다."); // 인증 실패 알림
    }
  };

  // 약관 동의 체크박스 변경 처리 함수
  const handleAgreementChange = (e) => {
    setIsAgreed(e.target.checked);
  };

  // 폼 제출 시 실행될 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isVerified || !isAgreed) {
      alert("이메일 인증과 약관 동의를 완료해주세요.");
      return;
    }
    console.log(userInfo);
    // 서버로 데이터 전송 로직 추가 위치
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
          <span>@syuin.ac.kr</span>
          <div>
            {!isEmailSent && (
              <button type="button" onClick={sendEmail} style={{}}>
                인증 이메일 전송
              </button>
            )}
          </div>
        </div>
        {isEmailSent && !isVerified && (
          <div>
            <label>인증 코드:</label>
            <input
              type="text"
              value={verificationCode}
              onChange={handleCodeChange}
            />
            <button
              type="button"
              onClick={verifyEmailCode}
              style={{ marginLeft: 10 }}
            >
              인증하기
            </button>
          </div>
        )}
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
        <button type="submit">가입하기</button>
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
