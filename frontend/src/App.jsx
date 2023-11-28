import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Trips from "./pages/Trips";
import Navbar from "./components/Navbar";
import PassengerInfo from "./pages/PassengerInfo";

const App = () => {
  const [filters, setFilters] = useState({});
  console.log(filters);
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home setFilters={setFilters} />} />
        <Route path="/trips" element={<Trips/>} />
        <Route path="/passenger-info" element={<PassengerInfo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
