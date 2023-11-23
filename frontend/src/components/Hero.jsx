import React from "react";
import bgImg from "../assets/images/bgImage.jpg";
import SearchTrip from "./SearchTrip";

const Hero = ({ setFilters }) => {
  return (
    <div className="relative">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <SearchTrip setFilters={setFilters} />
      </div>
      <img
        src={bgImg}
        className="h-[400px] w-[100%] object-cover object-bottom"
        alt="background image"
      />
    </div>
  );
};

export default Hero;



{/* <p className="absolute z-50 font-sans text-white font-bold text-[50px] left-[30%] top-[40%]">
Travel Smart, Travel Now!
</p> */}