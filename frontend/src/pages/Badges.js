import React from "react";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import "../styles/Badges.css"

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

      <div class="badgesContainer">
        <svg class="badgesContainer" className="rect">
          <rect></rect>
        </svg>

        <div class="badgesContainer" className="badgesUnlocked">
            <svg class="headingBar">
              <rect></rect>
            </svg>
            <h1 className="heading">
              Badges (Unlocked)
            </h1>
            <svg className="seperator2">
              <rect></rect>
            </svg>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
        </div>
        <div class="badgesContainer" className="badgesLocked">
            <svg class="headingBar">
              <rect></rect>
            </svg>
            <h1 className="heading">
              Badges (Locked)
            </h1>
            <svg className="seperator3">
              <rect></rect>
            </svg>
          <EmojiEventsIcon className="icon">

          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>

        </div>
      </div>
    </div>
  );
}

export default Badges;
