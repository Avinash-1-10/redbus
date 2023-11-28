import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="h-[60px] flex justify-between items-center px-[130px] text-blue-500 bg-white shadow-lg">
      <span className=" text-[20px] font-semibold">Rapidbus.</span>
      <div className="flex justify-between items-center gap-8">
        <NavLink to="/" className="font-bold">
          Home
        </NavLink>
        <NavLink>Tickets</NavLink>
        <NavLink>Contact</NavLink>
        <NavLink>About us</NavLink>
        <NavLink>Profile</NavLink>
      </div>
    </div>
  );
};

export default Navbar;
