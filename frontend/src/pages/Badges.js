import React from "react";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import "../styles/Badges.css"

function Badges() {

  const [activeSortButton, setActiveSortButton] = React.useState(null);

  

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
              onClick={() => setActiveSortButton("rarest")}
            >
              Rarest
            </button>
            <button
              className={`sortRecent ${activeSortButton === "recent" ? "toggled" : ""}`}
              onClick={() => setActiveSortButton("recent")}
            >
              Most Recent
            </button>
            <button
              className={`sortOldest ${activeSortButton === "oldest" ? "toggled" : ""}`}
              onClick={() => setActiveSortButton("oldest")}
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
          <h1 className="heading">
            Badges (Unlocked)
          </h1>
          <svg className="seperator2">
            <rect></rect>
          </svg>
          <EmojiEventsIcon className="icon">
          </EmojiEventsIcon>
        </div>
        <div class="badgesContainer" className="badgesLocked">
          <h1 className="heading">
            Badges (Locked)
          </h1>
          <svg className="seperator3">
            <rect></rect>
          </svg>
          <EmojiEventsIcon className="icon">

          </EmojiEventsIcon>

        </div>
      </div>
    </div>
  );
}

export default Badges;
