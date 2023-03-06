import { React, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { BsFillCalendarDateFill } from "react-icons/bs";
function Memories() {
  const [date, setDate] = useState(new Date());
  const onDateChange = (newDate) => {
    setDate(newDate);
  };
  return (
    <div className="memories">
      <div className="m-titel">Memories Page!</div>
      <BsFillCalendarDateFill size={30} />
      <div className="calender">
        <Calendar onChange={onDateChange} value={date} />
      </div>
      <div className="date">Date selected is: {date.toDateString()}</div>
    </div>
  );
}

export default Memories;
