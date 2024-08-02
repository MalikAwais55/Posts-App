import React from "react";
import Navbar from "./Navbar";
import { Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import ErrorComp from "./Components/ErrorComp"
import routes from "./routes";


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={<route.layout><route.element /></route.layout>} />
        ))}
        <Route path="*" element={<ErrorComp />} />
      </Routes>
    </div>
  );
}

export default App;
