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
`;

const ToDoItem = styled.li`
  list-style: none;
  padding: 5px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DeleteButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
`;

const ToDoListForm = () => {
  const [date, setDate] = useState(new Date());
  const [toDoList, setToDoList] = useState({});

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleAddToDo = () => {
    const newToDo = prompt("새 할 일을 입력하세요:");
    if (newToDo) {
      const dateString = moment(date).format("YYYY-MM-DD");
      setToDoList((prevToDoList) => {
        const newDateList = prevToDoList[dateString]
          ? [...prevToDoList[dateString], newToDo]
          : [newToDo];
        return { ...prevToDoList, [dateString]: newDateList };
      });
    }
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
            <ToDoItem key={index}>{toDo}</ToDoItem>
          ))}
        </ul>
        <button className="todo-btn" onClick={handleAddToDo}>
          할 일 추가
        </button>
      </ToDoListWrapper>
    </div>
  );
};

export default ToDoListForm;
