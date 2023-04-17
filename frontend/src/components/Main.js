import { Route, Routes } from "react-router-dom";
import Badges from "../pages/Badges";
import Comments from "../pages/Comments";
import DifficultyPage from "../pages/DifficultyPage";
import Drawing from "../pages/Drawing";
import Friends from "../pages/Friends";
import Home from "../pages/Home";
import Memories from "../pages/Memories";
import Notifications from "../pages/Notifications";
import Accessibility from "../pages/Settings/Accessibility";
import Settings from "../pages/Settings";
import ViewDrawings from "../pages/ViewDraws";
import FriendsMemories from "../pages/FriendsMemories"
import React, { useEffect } from "react";

function Main() {
  useEffect(() => {
    const isLightMode = localStorage.getItem("isLightMode") === "true";
    const isContrast = localStorage.getItem("isContrast") === "true";
    const isFont = localStorage.getItem("isFont") === "true";

    if (isLightMode) {
      document.body.classList.add("light-mode");
    } else {
      document.body.classList.remove("light-mode");
    }

    if (isContrast) {
      document.body.classList.add("contrast");
    } else {
      document.body.classList.remove("contrast");
    }

    if (isFont) {
      document.body.classList.add("font");
    } else {
      document.body.classList.remove("font");
    }
  }, []);

  return (
    <Routes>
      <Route path="*" element={<Home />}></Route>
      <Route path="/viewingDrawings" element={<ViewDrawings />}></Route>
      <Route path="/settings" element={<Settings />}></Route>
      <Route path="/friends" element={<Friends />}></Route>
      <Route path="/memories" element={<Memories />}></Route>
      <Route path="/notifications" element={<Notifications />}></Route>
      <Route path="/badges" element={<Badges />}></Route>
      <Route path="/drawing" element={<Drawing />}></Route>
      <Route path="/difficulty" element={<DifficultyPage />}></Route>
      <Route path="/comments/:ID" element={<Comments />}></Route>
      <Route path="/friends/memories/:ID" element={<FriendsMemories />}></Route>
    </Routes>
  );
}

export default Main;
