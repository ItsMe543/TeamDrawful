import { useEffect, useState } from "react";
import validator from "validator";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import "./styles/App.css";

function App() {
  // Displays the main component and the navbar
  return (
    <div className="App">
      <div className="Nav">
        <Navbar />
      </div>
      <div className="Main">
        <Main />
      </div>
    </div>
  );
}

export default App;
