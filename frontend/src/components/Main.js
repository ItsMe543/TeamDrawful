import React from "react";
import { Route, Routes } from "react-router-dom";
import Drawing from "../pages/Drawing";
import Friends from "../pages/Friends";
import Home from "../pages/Home";
import Memories from "../pages/Memories";
import Settings from "../pages/Settings";
function Main() {
  // Main component
  // When a url is visited, the corroponding page will be shown as defined below:
  return (
    <Routes>
      <Route path="*" element={<Home />}></Route>
      <Route path="/drawing" element={<Drawing />}></Route>
      <Route path="/settings" element={<Settings />}></Route>
      <Route path="/friends" element={<Friends />}></Route>
      <Route path="/memories" element={<Memories />}></Route>
    </Routes>
  );
}

export default Main;
