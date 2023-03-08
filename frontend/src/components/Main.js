import React from "react";
import { Route, Routes } from "react-router-dom";
import Drawing from "../pages/Drawing";
import Friends from "../pages/Friends";
import Home from "../pages/Home";
import Memories from "../pages/Memories";
import Settings from "../pages/Settings";
import Notifications from "../pages/Notifications"
import Badges from "../pages/Badges"
import ViewDrawings from "../pages/ViewDraws";
//Import func from "path";

function Main() {
  // Main component
  // When a url is visited, the corroponding page will be shown as defined below:
  return (
    <Routes>
      <Route path="*" element={<Home />}></Route>
      <Route path="/viewingDrawings" element={<ViewDrawings />}></Route>
      <Route path="/settings" element={<Settings />}></Route>
      <Route path="/friends" element={<Friends />}></Route>
      <Route path="/memories" element={<Memories />}></Route>
      <Route path="/notifications" element={<Notifications />}></Route>
      <Route path="/badges" element={<Badges />}></Route>
    </Routes>
  );
}

export default Main;
