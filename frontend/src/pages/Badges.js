import React from "react";
import "../styles/Badges.css"
import { Col, Row } from "react-bootstrap";


function Badges() {

  const [activeSortButton, setActiveSortButton] = React.useState(null);
  const [sortedBadgesArray, setSortedBadgesArray] = React.useState(null);

  const badgesArray = [
    // example badges
    {
      name: "Badge 1",
      description: "Completed a drawing!",
      image: "/drawings/star.png",
      unlocked: true,
      timeUnlocked: 7,
    },
    {
      name: "Badge 2",
      description: "Completed 5 drawings!",
      image: "/drawings/award.png",
      unlocked: true,
      timeUnlocked: 2,
    },
    {
      name: "Badge 3",
      description: "Completed 5 drawings!",
      image: "/drawings/award.png",
      unlocked: true,
      timeUnlocked: 10,
    },
    {
      name: "Badge 4",
      description: "Completed 5 drawings!",
      image: "/drawings/award.png",
      unlocked: false,
      timeUnlocked: 2,
    },
    {
      name: "Badge 5",
      description: "Completed 5 drawings!",
      image: "/drawings/award.png",
      unlocked: true,
      timeUnlocked: 1,
    },
    {
      name: "Badge 6",
      description: "Completed 5 drawings!",
      image: "/drawings/award.png",
      unlocked: false,
      timeUnlocked: 8,
    },
    {
      name: "Badge 7",
      description: "Completed a motorsport drawing!",
      image: "/drawings/car.jpg",
      unlocked: false,
      timeUnlocked: 0,
    }
  ];

  const handleSort = (option) => {
    setActiveSortButton(option);
    // sort the data based on the selected option
    if (option === "rarest") {
      // sort by rarest
    } else if (option === "recent") {
      // sort by most recent
      console.log("recent");
      badgesArray.sort((a, b) => a.timeUnlocked - b.timeUnlocked);
    } else {
      console.log("oldest");
      badgesArray.sort((a, b) => b.timeUnlocked - a.timeUnlocked);
      // sort by oldest
    }
    setSortedBadgesArray([...badgesArray]);
  };


  

  function Badge(props) {
    const { name, image, unlocked, description } = props;
    return (
      <div className={`badge ${unlocked ? 'unlocked' : 'locked'}`}>
        <Row>
          <Col>
            <img className="badgeIcon" src={image} alt={name} />
          </Col>
          <Col>
            <Row>
              <div className="badgeName">{name}</div>
            </Row>
            <Row>
              <div className="badgeDescription">{description}</div>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
  

  function createBadgeElements(badges) {
    return (
        <Col>
          {badges.map((badge, id) => (
            <div className="badgeElement" key={id}>
              <Badge name={badge.name} image={badge.image} unlocked={badge.unlocked} description={badge.description} />
            </div>
          ))}
        </Col>
    );
  }
  

  const unlockedBadgesIcons = badgesArray.filter(badge => badge.unlocked);
  const lockedBadgesIcons = badgesArray.filter(badge => !badge.unlocked);

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
                handleSort("rarest")}}
            >
              Rarest
            </button>
            <button
              className={`sortRecent ${activeSortButton === "recent" ? "toggled" : ""}`}
              onClick={() => {
                handleSort("recent")}}
            >
              Most Recent
            </button>
            <button
              className={`sortOldest ${activeSortButton === "oldest" ? "toggled" : ""}`}
              onClick={() => {
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
          <div className="badgeElement">
            <Row>
              {createBadgeElements(unlockedBadgesIcons)}
            </Row>
          </div>
        </div>

        <div className="badgesLocked">
          <h1 className="heading">
            Badges (Locked)
          </h1>
          <svg className="seperator3">
              <rect></rect>
          </svg>
          <div className="badgeElement">
            <Row>
              {createBadgeElements(lockedBadgesIcons)}
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Badges;
