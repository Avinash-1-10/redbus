import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SearchTrip from "../components/SearchTrip";

const Home = ({setFilters}) => {
  return (
    <div>
      <Navbar />
        <Hero setFilters={setFilters}/>
    </div>
  );
};

export default Home;
