import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Badges from "../pages/Badges";
import Comments from "../pages/Comments";
import DifficultyPage from "../pages/DifficultyPage";
import Drawing from "../pages/Drawing";
import Friends from "../pages/Friends";
import FriendsMemories from "../pages/FriendsMemories";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Memories from "../pages/Memories";
import Notifications from "../pages/Notifications";
import Settings from "../pages/Settings";
import Accessibility from "../pages/Settings/Accessibility";
import SignUp from "../pages/SignUp";
import ViewDrawings from "../pages/ViewDraws";

function Main() {
  useEffect(() => {
    const isLightMode = localStorage.getItem("isLightMode") === "true";
    const isContrast = localStorage.getItem("isContrast") === "true";
    const isFont = localStorage.getItem("isFont") === "true";
    const isPog = localStorage.getItem("isPog") === "true";

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

    if (isPog) {
      document.body.classList.add("pog");
    } else {
      document.body.classList.remove("pog");
    }
  }, []);

  return (
    <Routes>
      <Route path="*" element={<Home />}></Route>
      <Route path="/" element={<Login />}></Route>
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
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signUp" element={<SignUp />}></Route>
    </Routes>
  );
}

export default Main;
