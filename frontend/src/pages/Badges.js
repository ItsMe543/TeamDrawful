import React from "react";
import "../styles/Badges.css"
import { Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import minion from "../minion.png";
import validator from "validator";



function Badges() {

  const [badgesData, setBadges] = useState([]);
  const [badgesEarned, setBadgesEarned] = useState([]);

  const username = sessionStorage.getItem("token");

  const getBadgeData = (badgesEarned) => {
    axios.get("/api/badges/").then((badgesData) => {
      setBadges(badgesData?.data);


      // set badge unlocked value from user data
      for (let i = 0; i < badgesData.data.length; i++) {
        if (badgesEarned.toString()[i] == 1)
          badgesData.data[i].badgeUnlocked = true;
        else if (badgesEarned.toString()[i] == 0)
          badgesData.data[i].badgeUnlocked = false;
      }
    },[]);
  };

  
const updateBadgesEarned = (badgesEarned) => {
  console.log("actual",badgesEarned);
  axios.get("updateBadges", {params: {username, badgesEarned}})
  getBadgesEarned();
};


  const getBadgesEarned = () => {
    axios.get("getBadgesEarned", {params: {username}}).then((badgesEarned) => {
      unlockBadges(badgesEarned.data);
      getBadgeData(badgesEarned.data);

      
      
    },[username]);
  };

  function changeBadgesEarned(badgesEarned, index){
    console.log("before", badgesEarned, typeof(badgesEarned));
    badgesEarned = badgesEarned.toString().split('');
    badgesEarned[index] = '1';
    badgesEarned = badgesEarned.join('');
    console.log("after", badgesEarned, typeof(badgesEarned));
    return badgesEarned;
  }

  function findLargestNumber(data) {
    const values = data.split(')(');
    let max = -Infinity;
    for (let i = 0; i < values.length; i++) {
      const value = parseFloat(values[i].replace(/\(|\)/g, ''));
      if (!isNaN(value) && value > max) {
        max = value;
      }
    }
    return max;
  }
  


  const unlockBadges = (badgesEarned) => {
    var change = 0;
    axios.get("getTotalDrawings", {params: {username}}).then((totalDrawings) => {
      
      totalDrawings = totalDrawings.data;

      if (totalDrawings >= 1 && badgesEarned.toString()[0] !== "1") { 
        badgesEarned = changeBadgesEarned(badgesEarned, 0);
        setBadgesEarned(badgesEarned);
        console.log("unlocked 1 drawings completed", badgesEarned);
        change = 1;
        
      }
      if (totalDrawings >= 5 && badgesEarned.toString()[1] !== "1") {
        badgesEarned = changeBadgesEarned(badgesEarned, 1);
        setBadgesEarned(badgesEarned);
        console.log("unlocked 5 drawings completed");
        change = 1;
      }
      if (totalDrawings >= 20 && badgesEarned.toString()[2] !== "1") {
        badgesEarned = changeBadgesEarned(badgesEarned, 2);
        setBadgesEarned(badgesEarned);
        console.log("unlocked 20 drawings completed");
        change = 1;
      }

      axios.get("getAvgRating", {params: {username}}).then((avgRating) => {
        const largestAvgRating = findLargestNumber(avgRating.data);
        if (largestAvgRating >= "4" && (avgRating.length/6) && badgesEarned.toString()[3] !== "1"){
          badgesEarned = changeBadgesEarned(badgesEarned, 3);
          setBadgesEarned(badgesEarned);
          console.log("unlocked high rating badge");
          change = 1;
        }
      });
  
      if (change == 1){
        console.log("update");
        updateBadgesEarned(badgesEarned);
      }
      
      
    });
  };
  

  
  useEffect(() => {
    console.log(username);
    getBadgesEarned();
    
    
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
            <img className="badgeIcon" src={minion} alt={name} />
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
