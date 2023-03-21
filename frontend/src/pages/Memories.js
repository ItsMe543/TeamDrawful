import { React, useState } from "react";
import { Button } from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { BsFillCalendarDateFill } from "react-icons/bs";
import drawings from "../drawingData";
import "../styles/Memories.css";
function Memories() {
  const [date, setDate] = useState(new Date());
  const onDateChange = (newDate) => {
    setDate(newDate);
  };
  console.log(drawings);
  return (
    <div className="m-memories">
      <div className="m-title">Memories Page!</div>
      <div className="calanderDrawing">
        <div className="calender">
          <Calendar onChange={onDateChange} value={date} />
          <div className="date">Date selected is: {date.toDateString()}</div>

          <div className="twoButtons">
            <div className="downloadButton">
              <Button>Download Drawing</Button>
            </div>
            <div className="setProfileButton">
              <Button>Set Drawing as Profile Picture</Button>
            </div>
          </div>
        </div>

        <div className="m-drawing">Display drawing from database</div>
      </div>
    </div>
  );
}

export default Memories;
