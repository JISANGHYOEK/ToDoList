import React, { useState, useEffect } from "react";
import "./ScheduleForm.css";
import { auth } from "../firebase";
import { addDoc, collection, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const hours = Array.from({ length: 13 }, (_, i) => `${i + 9}:00`);
const days = ["월", "화", "수", "목", "금"];

const ScheduleForm = () => {
  const [user, setUser] = useState(null);
  const [lectureData, setLectureData] = useState({
    name: "",
    room: "",
    professor: "",
    day: days[0],
    startTime: "09:00",
    endTime: "10:00",
    color: "#f0c674",
  });
  const [schedule, setSchedule] = useState([]);
  const [selectedLectureId, setSelectedLectureId] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const q = collection(db, `users/${user.uid}/schedule`);
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setSchedule(data);
        });
        return unsubscribe;
      }
    };

    fetchData();
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLectureData({
      ...lectureData,
      [name]: value,
    });
  };

  const handleAddSchedule = async () => {
    if (user) {
      try {
        const lecture = {
          ...lectureData,
          name: lectureData.name.trim(),
        };
        const overlappingLecture = schedule.find(
          (lec) =>
            lec.day === lecture.day &&
            ((lec.startTime <= lecture.startTime && lecture.startTime < lec.endTime) ||
              (lec.startTime < lecture.endTime && lecture.endTime <= lec.endTime))
        );
        if (overlappingLecture) {
          alert("이미 해당 시간에 강의가 있습니다.");
          return;
        }
        await addDoc(collection(db, `users/${user.uid}/schedule`), lecture);
        setLectureData({
          name: "",
          room: "",
          professor: "",
          day: days[0],
          startTime: "09:00",
          endTime: "10:00",
          color: "#f0c674",
        });
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  const handleEditSchedule = async () => {
    if (user && selectedLectureId) {
      try {
        await updateDoc(doc(db, `users/${user.uid}/schedule`, selectedLectureId), lectureData);
        setLectureData({
          name: "",
          room: "",
          professor: "",
          day: days[0],
          startTime: "09:00",
          endTime: "10:00",
          color: "#f0c674",
        });
        setSelectedLectureId(null);
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    }
  };

  const handleDeleteSchedule = async () => {
    if (user && selectedLectureId) {
      try {
        await deleteDoc(doc(db, `users/${user.uid}/schedule`, selectedLectureId));
        setSelectedLectureId(null);
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
    }
  };

  const handleEmptyCellClick = () => {
    // 비어있는 셀을 클릭했을 때 아무 동작도 하지 않음
  };

  const renderTableData = () => {
    const getRowSpan = (startTime, endTime) => {
      const startHour = parseInt(startTime.split(":")[0], 10);
      const endHour = parseInt(endTime.split(":")[0], 10);
      return endHour - startHour;
    };

    return hours.map((hour, rowIndex) => (
      <tr key={hour}>
        <td>{hour}</td>
        {days.map((day) => {
          const lecture = schedule.find(
            (lec) =>
              lec.day === day &&
              ((lec.startTime <= hour && hour < lec.endTime) || (lec.startTime < hour && hour <= lec.endTime))
          );

          if (lecture && lecture.startTime === hour) {
            const rowSpan = getRowSpan(lecture.startTime, lecture.endTime);
            return (
              <td
                key={day}
                className="lecture"
                rowSpan={rowSpan}
                style={{ backgroundColor: lecture.color }}
                onClick={() => handleSelectLecture(lecture)}
              >
                <div className="lecture-content">
                  {lecture.name}
                </div>
              </td>
            );
          } else if (lecture) {
            return null;
          } else {
            return (
              <td
                key={day}
                onClick={handleEmptyCellClick}
              ></td>
            );
          }
        })}
      </tr>
    ));
  };

  const handleSelectLecture = (lecture) => {
    setLectureData(lecture);
    setSelectedLectureId(lecture.id);
  };

  return (
    <div className="schedule-container">
      <h2>시간표</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>시간</th>
              {days.map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>{renderTableData()}</tbody>
        </table>
      </div>
      {user ? (
        <div className="popup">
          <input
            type="text"
            name="name"
            placeholder="강의명"
            value={lectureData.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="room"
            placeholder="강의실"
            value={lectureData.room}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="professor"
            placeholder="교수명"
            value={lectureData.professor}
            onChange={handleInputChange}
          />
          <select
            name="day"
            value={lectureData.day}
            onChange={handleInputChange}
          >
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
          <select
            name="startTime"
            value={lectureData.startTime}
            onChange={handleInputChange}
          >
            {hours.map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
          <select
            name="endTime"
            value={lectureData.endTime}
            onChange={handleInputChange}
          >
            {hours.map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
          <input
            type="color"
            name="color"
            value={lectureData.color}
            onChange={handleInputChange}
          />
          <div className="schedule-buttons">
            <button onClick={handleAddSchedule}>일정 추가</button>
            <button onClick={handleEditSchedule}>수정</button>
            <button onClick={handleDeleteSchedule}>삭제</button>
          </div>
        </div>
      ) : (
        <p>로그인이 필요합니다.</p>
      )}
    </div>
  );
};

export default ScheduleForm;
