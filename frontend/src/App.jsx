import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Trips from "./pages/Trips";
import Navbar from "./components/Navbar";
import PassengerInfo from "./pages/PassengerInfo";
import { useDispatch, useSelector } from "react-redux";
import Success from "./pages/Success";
import Fail from "./pages/Fail";
import { removeTicket } from "./redux/actionCreators/ticket";
import { clearFilter } from "./redux/actionCreators/filter";

const App = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(removeTicket());
  //   dispatch(clearFilter());
  // }, [dispatch]);
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/trips" element={<Trips/>} />
        <Route path="/passenger-info" element={<PassengerInfo />} />
        <Route path="/success" element={<Success/>} />
        <Route path="/fail" element={<Fail/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
