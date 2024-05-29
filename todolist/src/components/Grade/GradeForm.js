import React, { useState } from "react";
import "./GradeForm.css";

const GradeForm = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState("");
  const [newGrade, setNewGrade] = useState("A+");
  const [currentSemester, setCurrentSemester] = useState("1-1");

  const handleAddCourse = () => {
    if (newCourse.trim() !== "" && isValidGrade(newGrade)) {
      setCourses([
        ...courses,
        { name: newCourse, grade: newGrade, semester: currentSemester },
      ]);
      setNewCourse("");
      setNewGrade("A+");
    }
  };

  const handleRemoveCourse = (index) => {
    const updatedCourses = [...courses];
    updatedCourses.splice(index, 1);
    setCourses(updatedCourses);
  };

  const calculateAverage = (semester) => {
    const semesterCourses = courses.filter(
      (course) => course.semester === semester
    );
    const totalGrade = semesterCourses.reduce((acc, course) => {
      const gradeValue = getGradeValue(course.grade);
      return acc + gradeValue;
    }, 0);
    return semesterCourses.length > 0 ? totalGrade / semesterCourses.length : 0;
  };

  const isValidGrade = (grade) => {
    const validGrades = ["A+", "A", "B+", "B", "C+", "C", "F", "P"];
    return validGrades.includes(grade);
  };

  const getGradeValue = (grade) => {
    const gradeValues = {
      "A+": 4.5,
      A: 4.0,
      "B+": 3.5,
      B: 3.0,
      "C+": 2.5,
      C: 2.0,
      F: 0,
      P: 0,
    };
    return gradeValues[grade] || 0;
  };

  return (
    <div className="form-container">
      <h2>성적 관리</h2>
      <div className="form-group">
        <select
          id="semester"
          className="select"
          value={currentSemester}
          onChange={(e) => setCurrentSemester(e.target.value)}
        >
          <option value="1-1">1학년 1학기</option>
          <option value="1-2">1학년 2학기</option>
          <option value="2-1">2학년 1학기</option>
          <option value="2-2">2학년 2학기</option>
          <option value="3-1">3학년 1학기</option>
          <option value="3-2">3학년 2학기</option>
          <option value="4-1">4학년 1학기</option>
          <option value="4-2">4학년 2학기</option>
        </select>
        <input
          type="text"
          className="input"
          placeholder="과목명"
          value={newCourse}
          onChange={(e) => setNewCourse(e.target.value)}
        />
        <select
          className="select"
          value={newGrade}
          onChange={(e) => setNewGrade(e.target.value)}
        >
          <option value="A+">A+</option>
          <option value="A">A</option>
          <option value="B+">B+</option>
          <option value="B">B</option>
          <option value="C+">C+</option>
          <option value="C">C</option>
          <option value="F">F</option>
          <option value="P">P</option>
        </select>
        <button className="button" onClick={handleAddCourse}>
          과목 추가
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>과목</th>
            <th>성적</th>
            <th>학기</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses
            .filter((course) => course.semester === currentSemester)
            .map((course, index) => (
              <tr key={index}>
                <td>{course.name}</td>
                <td>{course.grade}</td>
                <td>{course.semester}</td>
                <td>
                  <button
                    className="button"
                    onClick={() => handleRemoveCourse(index)}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div>
        <h3>
          {currentSemester} 평균 성적:{" "}
          {calculateAverage(currentSemester).toFixed(2)}
        </h3>
      </div>
    </div>
  );
};

export default GradeForm;
