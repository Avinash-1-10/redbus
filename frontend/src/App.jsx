import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Trips from "./pages/Trips";

const App = () => {
  const [filters, setFilters] = useState({});
  console.log(filters);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home setFilters={setFilters} />} />
        <Route path="/trips" element={<Trips filters={filters} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
