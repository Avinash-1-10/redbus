import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className="h-[60px] flex justify-between items-center md:px-[130px] px-[10px] text-blue-500 bg-white shadow-lg">
      <span className="text-[20px] font-semibold">Rapidbus.</span>
      <div className="lg:flex hidden justify-between items-center gap-8">
        <NavLink to="/" className="font-bold">
          Home
        </NavLink>
        <NavLink to="/tickets">Tickets</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/about">About us</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </div>
      <div className="lg:hidden flex items-center">
        {isMenuOpen ? (
          <IoCloseOutline
            className="text-2xl cursor-pointer"
            onClick={handleMenuToggle}
          />
        ) : (
          <CiMenuBurger
            className="text-2xl cursor-pointer"
            onClick={handleMenuToggle}
          />
        )}
      </div>
      {isMenuOpen && (
        <div className="lg:hidden absolute top-[60px] right-0 left-0 bg-white flex flex-col items-center shadow-lg">
          <NavLink to="/" className="py-2">
            Home
          </NavLink>
          <NavLink to="/tickets" className="py-2">
            Tickets
          </NavLink>
          <NavLink to="/contact" className="py-2">
            Contact
          </NavLink>
          <NavLink to="/about" className="py-2">
            About us
          </NavLink>
          <NavLink to="/profile" className="py-2">
            Profile
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Navbar;
