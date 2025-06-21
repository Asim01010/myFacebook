import React from "react";
import "./globals.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Home from "./pages/home/Home";
import Navbar from "./component/home/Navbar";
import Register from "./pages/auth/Register";

const App = () => {
  return (
    <>
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="home" element={<Home />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
