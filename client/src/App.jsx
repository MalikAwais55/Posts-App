import React from "react";
import Navbar from "./Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import ViewPost from "./Components/ViewPost";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view" element={<ViewPost />} />
      </Routes>
    </div>
  );
}

export default App;
