import React from "react";
import "../styles/Badges.css"
import drawingData from "../drawingData";
import { Col, Row } from "react-bootstrap";

function Badge(props) {
  const { name, image, unlocked } = props;
  return (
    <div className={`badge ${unlocked ? 'unlocked' : 'locked'}`}>
      <img src={image} alt={name} />
      <div className="badge-name">{name}</div>
    </div>
  );
}

function Badges() {

  const [activeSortButton, setActiveSortButton] = React.useState(null);

  const handleSort = (option) => {
    setActiveSortButton(option);
    // sort the data based on the selected option
    if (option === "rarest") {
      // sort by rarest
    } else if (option === "recent") {
      // sort by most recent
    } else {
      // sort by oldest
    }
  };


  const badgesArray = [
    // example badges
    {
      name: "badge1",
      image: "/drawings/star.png",
      unlocked: false,
    },
    {
      name: "badge2",
      image: "/drawings/award.png",
      unlocked: true,
    },
    {
      name: "badge3",
      image: "/drawings/car.jpg",
      unlocked: true,
    }
  ];

  function createBadgeElements(badges) {
    return (
      <div className="badgesIcons">
        <Col>
          {badges.map((badge, id) => (
            <div className="badges" key={id}>
              <img className="badgeIcon" src={badge.image} alt={badge.name} />
            </div>
          ))}
        </Col>
      </div>
    );
  }
  

  const unlockedBadges = badgesArray.filter(badge => badge.unlocked);
  const lockedBadges = badgesArray.filter(badge => !badge.unlocked);

  return (
    <div className="Badges">

      <div className="filtersBar">
          <h2 className="filters" id="button">
            Filters
          </h2>
          <svg className="seperator">
            <rect></rect>
          </svg> 

          <div className="sortButtons">
            <button
              className={`sortRarest ${activeSortButton === "rarest" ? "toggled" : ""}`}
              onClick={() => {
                console.log("rarest")
                handleSort("rarest")}}
            >
              Rarest
            </button>
            <button
              className={`sortRecent ${activeSortButton === "recent" ? "toggled" : ""}`}
              onClick={() => {
                console.log("recent")
                handleSort("recent")}}
            >
              Most Recent
            </button>
            <button
              className={`sortOldest ${activeSortButton === "oldest" ? "toggled" : ""}`}
              onClick={() => {
                console.log("oldest")
                handleSort("oldest")}}
            >
              Oldest
            </button>
          </div>
        </div>

      <div className="badgesContainer">
        <div className="badgesUnlocked">
          <h1 className="heading">
            Badges (Unlocked)
          </h1>
          <svg className="seperator2">
            <rect></rect>
          </svg>
          <div className="badgesIcons">
            {createBadgeElements(unlockedBadges)}
          </div>
        </div>

        <div className="badgesLocked">
          <h1 className="heading">
            Badges (Locked)
          </h1>
          <svg className="seperator3">
              <rect></rect>
          </svg>
          <div className="badgesIcons">
            {createBadgeElements(lockedBadges)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Badges;
