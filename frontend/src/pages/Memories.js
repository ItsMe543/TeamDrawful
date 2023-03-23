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
      <div className="disclaimer1">
          "Alpha Project Disclaimer This server is provided by the School of Computer Science at the University of Birmingham to allow users to provide feedback on software developed by students as part of an assignment. While we take reasonable precautions, we cannot guarantee the security of the data entered into the system. Do NOT enter any real personal data (e.g., financial information or otherwise) into the system. The assignment runs until May 31st 2023, at which time the server and all associated data will be destroyed."
      </div>
    </div>
  );
}

export default Memories;
