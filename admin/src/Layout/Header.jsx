import React from "react";
import { FaUserCircle } from "react-icons/fa";
import logo from "/images/logo-3.png";
import UserDropdown from "../components/Home/UserDropdown";
import { Link } from "react-router-dom";


const Header = () => {
  return (
    <header className="bg-white text-black px-3 py-1 flex justify-between items-center fixed top-0 w-full shadow-md"
      style={{ zIndex: 1000, position: "fixed", backgroundColor: "white" }}>

      {/* Left Side - Logo */}
      <Link to="/">
        <div className="flex items-center mx-3">
          <img src={logo} alt="Logo" className="h-15.5 w-15.5 mr-2" />
          <span className="text-[#C0A26D] text-md font-bold">HQ PERFUME</span>
        </div>
      </Link>

      {/* Right Side - User Info & Dropdown */}
      <div className="flex items-center">
        <UserDropdown /> {/* Perfectly aligned dropdown */}
      </div>
    </header>
  );
};

export default Header;
