import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ fontSize: '25px', color: "white" }}>Home!
      <div className="Drawings">
        <Link to="/drawing">
          <div style={{ fontSize: '25px', color: "white" }}>Drawing</div>
        </Link>
      </div>
    </div>
  );
}
export default Home;
