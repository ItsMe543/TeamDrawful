import React from "react";
import "../styles/Badges.css"
import { Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";



function Badges() {

  const [badgesData, setBadges] = useState([]);

  const getBadgeData = () => {
    axios.get("/api/badges/").then((badgesData) => {
      setBadges(badgesData?.data);
      // console.log(badgesData);
    });
  };

  useEffect(() => {
    getBadgeData();
   
  }, []);


  useEffect(() => {
    setSortedBadgesArray(badgesData);
  }, [badgesData]);


  function createBadgeElements(badges) {
    return (
        <Col>
          {badges.map((badge, id) => (
            <div className="badgeElement" key={id}>
              <Badge 
                name={badge.badgeName} 
                image={badge.badgeIcon}
                description={badge.badgeDescription} 
                unlocked={badge.badgeUnlocked} 
                dateUnlocked={badge.badgeDateUnlocked}
                timeUnlocked={badge.badgeTimeUnlocked} 
              />
            </div>
          ))}
        </Col>
    );
  }

  function Badge(props) {
    const { name, image, unlocked, description} = props;
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

  const [activeSortButton, setActiveSortButton] = React.useState(null);
  const [sortedBadgesArray, setSortedBadgesArray] = React.useState([]);
    
  useEffect(() => {
    setFilteredBadges(sortedBadgesArray);
  }, [sortedBadgesArray]);
  
  

  const handleSort = (option) => {
    setActiveSortButton(option);
    // sort the data based on the selected option
    if (option === "alphabetical") {
      // sort by alphabetical
      const sortedBadges = [...sortedBadgesArray].sort((a, b) => {
        if (a.badgeName < b.badgeName) {
          return -1;
        }
        if (a.badgeName > b.badgeName) {
          return 1;
        }
        return 0;
      });
      
      setSortedBadgesArray(sortedBadges);
    
    }else if (option === "recent") {
      // sort by most recent
      console.log("recent");
      const sortedBadges = [...sortedBadgesArray].sort((a, b) => {
        const dateA = new Date(`${a.badgeDateUnlocked}T${a.badgeTimeUnlocked}Z`).getTime();
        const dateB = new Date(`${b.badgeDateUnlocked}T${b.badgeTimeUnlocked}Z`).getTime();
        return dateB - dateA;
      });
      setSortedBadgesArray(sortedBadges); 
    } else {
      // sort by oldest
      console.log("oldest");
      const sortedBadges = [...sortedBadgesArray].sort((a, b) => {
        const dateA = new Date(`${a.badgeDateUnlocked}T${a.badgeTimeUnlocked}Z`).getTime();
        const dateB = new Date(`${b.badgeDateUnlocked}T${b.badgeTimeUnlocked}Z`).getTime();
        return dateA - dateB;
      });
      setSortedBadgesArray(sortedBadges);
      
    }
  };
  

  //search bar
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBadges, setFilteredBadges] = useState([]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filteredBadges = sortedBadgesArray.filter((filteredBadge) =>
      filteredBadge.badgeName.toLowerCase().includes(event.target.value.toLowerCase()) ||
      filteredBadge.badgeDescription.toLowerCase().includes(event.target.value.toLowerCase())
    );
    console.log(event.target.value);
    console.log(filteredBadges);
    setFilteredBadges(filteredBadges);
  };

  // seperates badges into unlocked and locked with filter and sort
  const unlockedBadges = sortedBadgesArray.filter(badge => badge.badgeUnlocked && filteredBadges.includes(badge));
  const lockedBadges = sortedBadgesArray.filter(badge => !badge.badgeUnlocked && filteredBadges.includes(badge));

  return (
    <div className="Badges">

      <div className="filtersBar">
        <h2 className="filters" id="button">
          Filters
        </h2>
        <svg className="seperator">
          <rect></rect>
        </svg> 

        <div className="searchBar">
          <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Filter Badges..."/>
        </div>

        
        <div className="sortButtons">
          <button
            className={`sortAlphabetical ${activeSortButton === "alphabetical" ? "toggled" : ""}`}
            onClick={() => {
              handleSort("alphabetical")}}
          >
            Alphabetical
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
          <div className="underline">
            <h1 className="badgeHeading">
              Badges (Unlocked)
            </h1>
          </div>

          <div className="badgeElement">
            <Row>
              {createBadgeElements(unlockedBadges)}
            </Row>
          </div>
        </div>

        <div className="badgesLocked">
          <div className="underline">
            <h1 className="badgeHeading">
              Badges (Locked)
            </h1>
          </div>
          <div className="badgeElement">
            <Row>
              {createBadgeElements(lockedBadges)}
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Badges;
