import { React, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { HiArrowCircleLeft, HiArrowCircleRight } from "react-icons/hi";
import drawings from "../drawingData";
import "../styles/Memories.css";
function Memories() {
  const [ID, setID] = useState(0);
  const [date, setDate] = useState(new Date());
  const onDateChange = (newDate) => {
    const formattedDate = newDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    console.log("Selected date: " + formattedDate);
    const found = drawings.find((x) => {
      const formattedCompletedDate = new Date(
        x.dateCompleted
      ).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      return formattedCompletedDate === formattedDate;
    });
    console.log("Found? " + (found !== undefined));
    if (found) {
      console.log("Matching element: ", found);
    }
  };

  useEffect(() => {
    //convertDates();
  });
  const downloadImage = (URL) => {
    const link = document.createElement("a");
    link.href = URL;
    link.download = "image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const convertDates = () => {
    let count = 0;
    const highlightedDates = [];
    drawings.map((drawing, id) => {
      //  console.log(drawing.completedDate);
      const date = drawing.completedDate.split("/");
      highlightedDates[count] = new Date(
        parseInt(date[2]),
        parseInt(date[1]) - 1,
        parseInt(date[0])
      );
      count += 1;
      // console.log(date[0]);
      // console.log(date[1] - 1);
      // console.log(date[2]);
    });

    return highlightedDates;
    // console.log(date[0]);
  };
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      // Check if the date is in the array of highlighted dates
      if (highlightedDates.some((d) => d.getTime() === date.getTime())) {
        // If the date is in the array of highlighted dates, return a div with a class name
        return "highlight";
      } else {
        return null;
      }
    }
  };

  const handleLeftClick = () => {
    if (ID === 0) {
      setID(drawings.length - 1);
    } else {
      setID(ID - 1);
    }
  };
  const handleRightClick = () => {
    if (ID === drawings.length - 1) {
      setID(0);
    } else {
      setID(ID + 1);
    }
  };
  const highlightedDates = convertDates();

  return (
    <div className="m-memories">
      <div className="m-title">Memories Page!</div>
      <div className="calanderDrawing">
        <div>
          <Calendar
            onChange={onDateChange}
            value={date}
            tileClassName={tileContent}
            // className="cal"
          />
          <div className="date">Date selected is: {date.toDateString()}</div>

          <div className="twoButtons">
            <div className="downloadButton">
              <Button onClick={() => downloadImage(drawings[ID].drawing)}>
                Download Drawing
              </Button>
            </div>
            <div className="setProfileButton">
              <Button>Set Drawing as Profile Picture</Button>
            </div>
          </div>
        </div>
        <div className="drawingContainer">
          <HiArrowCircleLeft
            className="arrow"
            size={45}
            onClick={() => handleLeftClick()}
          />
          <div className="m-drawing">
            <img src={drawings[ID].drawing} alt={"drawing image"} />
          </div>
          <HiArrowCircleRight
            className="arrow"
            size={45}
            onClick={() => handleRightClick()}
          />
        </div>
      </div>
      <div className="disclaimer1">
        "Alpha Project Disclaimer This server is provided by the School of
        Computer Science at the University of Birmingham to allow users to
        provide feedback on software developed by students as part of an
        assignment. While we take reasonable precautions, we cannot guarantee
        the security of the data entered into the system. Do NOT enter any real
        personal data (e.g., financial information or otherwise) into the
        system. The assignment runs until May 31st 2023, at which time the
        server and all associated data will be destroyed."
      </div>
    </div>
  );
}

export default Memories;
