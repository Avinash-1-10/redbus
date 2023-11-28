import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PopularDestinations from "../components/PopularDestinations";

const Home = ({ setFilters }) => {
  return (
    <div>
      <Hero setFilters={setFilters} />
      <PopularDestinations/>
    </div>
  );
};

export default Home;
