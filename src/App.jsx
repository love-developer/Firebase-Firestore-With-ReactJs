import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Services from "./Pages/Services.jsx";
import Navbar from "./Components/Navbar.jsx";
import MyContextProvider from "./Context/MyContextProvider.jsx";

function App() {
  return (
    <>
      <MyContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
        </Routes>
      </MyContextProvider>
    </>
  );
}

export default App;
