import React, { useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import styled from "styled-components";
import "react-calendar/dist/Calendar.css";
import "./ToDoListForm.css";

const StyledCalendarWrapper = styled.div`
  padding: 10px;
  max-width: 300px;
  margin: 0 auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  background-color: white;
`;

const StyledCalendar = styled(Calendar)`
  & .react-calendar__navigation {
    margin-bottom: 10px;
  }

  & .react-calendar__month-view__weekdays__weekday {
    font-size: 0.85em;
  }

  & .react-calendar__tile {
    border-radius: 50%;

    &:hover {
      background-color: #e6e6e6;
    }
  }

  & .react-calendar__tile--now {
    background: #beecff; /* 오늘 날짜 배경색 하늘색 */
  }

  & .react-calendar__month-view__days__day--weekend {
    color: red; /* 일요일 텍스트 색상 빨간색 */
  }

  & .react-calendar__tile--active {
    background-color: #e6e6e6;
    color: white;
  }
`;

const ToDoListWrapper = styled.div`
  padding: 10px;
  max-width: 300px;
  margin: 20px auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  background-color: white;

  ul {
    max-height: 160px; /* 최대 높이 설정 */
    overflow-y: auto; /* 세로 스크롤 설정 */
    margin: 0; /* 기본 마진 제거 */
    padding: 0 10px; /* 양쪽 패딩 설정 */
  }
`;

const ToDoItem = styled.li`
  list-style: none;
  padding: 5px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DeleteButton = styled.button`
  width: 80px; /* 버튼의 너비를 고정합니다 */
  height: 30px; /* 버튼의 높이를 고정합니다 */
  background-color: white; /* 버튼의 배경색을 흰색으로 설정합니다 */
  color: black; /* 글자 색상을 검정으로 설정합니다 */
  border: 2px solid blue; /* 파란색 테두리를 추가합니다 */
  border-radius: 5px; /* 테두리를 둥글게 처리합니다 */
  padding: 5px 10px; /* 내부 여백을 설정합니다 */
  cursor: pointer; /* 마우스 커서를 포인터로 변경합니다 */
  font-size: 14px; /* 글자 크기를 설정합니다 */
  &:hover {
    background-color: #f0f0f0; /* 마우스 오버 시 배경색 변경 */
  }
`;

const ToDoInput = styled.input`
  width: calc(100% - 22px);
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ToDoListForm = () => {
  const [date, setDate] = useState(new Date());
  const [toDoList, setToDoList] = useState({});
  const [newToDo, setNewToDo] = useState("");

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleAddToDo = () => {
    if (newToDo) {
      const dateString = moment(date).format("YYYY-MM-DD");
      setToDoList((prevToDoList) => {
        const newDateList = prevToDoList[dateString]
          ? [...prevToDoList[dateString], newToDo]
          : [newToDo];
        return { ...prevToDoList, [dateString]: newDateList };
      });
      setNewToDo("");
    }
  };

  const handleInputChange = (e) => {
    setNewToDo(e.target.value);
  };

  // 할 일 삭제 기능
  const handleDeleteToDo = (dateString, index) => {
    setToDoList((prevToDoList) => {
      const updatedDateList = [...prevToDoList[dateString]];
      updatedDateList.splice(index, 1);
      return { ...prevToDoList, [dateString]: updatedDateList };
    });
  };

  const dateString = moment(date).format("YYYY-MM-DD");
  const toDosForSelectedDate = toDoList[dateString] || [];

  return (
    <div>
      <StyledCalendarWrapper>
        <StyledCalendar
          value={date}
          onChange={handleDateChange}
          formatDay={(locale, date) => moment(date).format("D")} // 일 제거 숫자만 보이게
          formatYear={(locale, date) => moment(date).format("YYYY")} // 네비게이션 눌렀을때 숫자 년도만 보이게
          formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")} // 네비게이션에서 2024. 12 이렇게 보이도록 설정
          calendarType="gregory" // 일요일 부터 시작
          showNeighboringMonth={false} // 전달, 다음달 날짜 숨기기
          next2Label={null} // +1년 & +10년 이동 버튼 숨기기
          prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
          minDetail="year" // 10년단위 년도 숨기기
        />
      </StyledCalendarWrapper>
      <ToDoListWrapper>
        <h3>{moment(date).format("YYYY-MM-DD")}의 할 일</h3>
        <ul>
          {toDosForSelectedDate.map((toDo, index) => (
            <ToDoItem key={index}>
              {toDo}
              <DeleteButton
                className="DeleteButton"
                onClick={() => handleDeleteToDo(dateString, index)}
              >
                삭제
              </DeleteButton>
            </ToDoItem>
          ))}
        </ul>
        <ToDoInput
          type="text"
          value={newToDo}
          onChange={handleInputChange}
          placeholder="새 할 일을 입력하세요"
        />
        <button className="todo-btn" onClick={handleAddToDo}>
          할 일 추가
        </button>
      </ToDoListWrapper>
    </div>
  );
};

export default ToDoListForm;
