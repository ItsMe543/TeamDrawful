import axios from "axios";
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
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const onDateChange = (newDate) => {
    const formattedDate = newDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const found = data.find((x) => x.date === formattedDate);
    if (found) {
      setID(data.indexOf(found));
    }
    setDate(newDate);
  };
  const findrecentDate = () => {
    const recent = data
      .map((obj) => new Date(obj.date.split("/").reverse().join("-")))
      .reduce((prev, curr) => (curr > prev ? curr : prev), 0);

    return recent;
  };

  const getData = () => {
    axios.get("https://drawful.bham.team/api/user_memories/").then((data) => {
      // data.data.sort((a, b) => a.date - b.date);
      setData(data?.data);
      setLoaded(true);
    });
  };

  useEffect(() => {
    getData();
    setDate(findrecentDate());
  }, []);
  const downloadImage = async (imgURL) => {
    imgURL = imgURL;
    imgURL = imgURL.slice(0, 4) + "s" + imgURL.slice(4);

    const response = await fetch(imgURL);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = data[ID].date;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const convertDates = () => {
    let count = 0;
    const highlightedDates = [];
    data.map((drawing, id) => {
      highlightedDates[count] = convertDateStringtoObj(drawing.date);
      count += 1;
    });
    return highlightedDates;
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

  const convertDateStringtoObj = (dateStr) => {
    let date = dateStr.split("/");
    let newDate = new Date(
      parseInt(date[2]),
      parseInt(date[1]) - 1,
      parseInt(date[0])
    );
    return newDate;
  };

  const handleLeftClick = () => {
    setID((prevID) => {
      const newID = prevID === 0 ? data.length - 1 : prevID - 1;
      setDate(convertDateStringtoObj(data[newID].date));
      return newID;
    });
  };
  const handleRightClick = () => {
    setID((prevID) => {
      const newID = (prevID + 1) % data.length;
      setDate(convertDateStringtoObj(data[newID].date));
      return newID;
    });
  };
  const isDateAllowed = (date) => {
    return highlightedDates.some(
      (allowedDate) =>
        allowedDate.getDate() === date.getDate() &&
        allowedDate.getMonth() === date.getMonth() &&
        allowedDate.getFullYear() === date.getFullYear()
    );
  };
  const highlightedDates = convertDates();
  // console.log(data[0].drawing);
  console.log(ID);
  console.log(data);
  if (!loaded) return <p>Loading...</p>;

  return (
    <div className="m-memories">
      <div className="m-title">Memories Page!</div>
      <div className="calanderDrawing">
        <div>
          <Calendar
            onChange={onDateChange}
            value={date}
            tileClassName={tileContent}
            //  tileDisabled={({ date }) => !isDateAllowed(date)}
            showWeekDays={false}
            className="cal"
          />
          {/* <div className="date">Date selected is: {date}</div> */}

          <div className="twoButtons">
            <div className="downloadButton">
              <Button onClick={() => downloadImage(data[ID].drawing)}>
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
            <img src={data[ID]?.drawing} alt={"drawing image"} />
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
