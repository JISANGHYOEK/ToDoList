import React from "react";
import Navbar from "../Nav/Nav";
import ScheduleForm from "./ScheduleForm"

const Schedule = () => {
  return (
    <div className="SchedulePageContainer">
      <Navbar />
      <ScheduleForm/>
    </div>
  );
};

export default Schedule;
