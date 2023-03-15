import React from "react";
import { Route, Routes } from "react-router-dom";
import Badges from "../pages/Badges";
import Comments from "../pages/Comments";
import DifficultyPage from "../pages/DifficultyPage";
import Drawing from "../pages/Drawing";
import Friends from "../pages/Friends";
import Home from "../pages/Home";
import Memories from "../pages/Memories";
import Notifications from "../pages/Notifications";
import Settings from "../pages/Settings";
import ViewDrawings from "../pages/ViewDraws";
//Import func from "path";

function Main() {
  // Main component 
  //{" "}
  // When a url is visited, the corroponding page will be shown as defined below:
  // <Route path="/NametodisplayOnBar" element={<functionName/>}</Route>
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
    </Routes>
  );
}

export default Main;
