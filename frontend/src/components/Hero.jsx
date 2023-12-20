import React from "react";
import bgImg from "../assets/images/bgImage.jpg";
import SearchTrip from "./SearchTrip";

const Hero = () => {
  return (
    <div className="relative">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <SearchTrip />
      </div>
      <img
        src="https://images.pexels.com/photos/688660/pexels-photo-688660.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        className="h-[500px] w-[100%] object-cover blur-[1.5px]"
        alt="background image"
      />
    </div>
  );
};

export default Hero;



{/* <p className="absolute z-50 font-sans text-white font-bold text-[50px] left-[30%] top-[40%]">
Travel Smart, Travel Now!
</p> */}