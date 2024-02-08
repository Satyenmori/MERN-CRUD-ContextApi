import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Contect from "./components/Contect";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Logout from "./components/Logout";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contect" element={<Contect />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
