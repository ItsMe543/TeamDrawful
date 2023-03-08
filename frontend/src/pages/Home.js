import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>Home!
      <div className="Drawings">
          <Link to="/drawing">
            <div>Drawing</div>
          </Link>
      </div>
    </div>
  );
}
export default Home;
