// Header.js
import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <header className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Zero Hunger</h1>
        </div>
        <nav className="flex space-x-4">
          <NavLink to="/" className="text-white hover:text-gray-300">
            News
          </NavLink>
          <NavLink to="/nutrition-info" className="text-white hover:text-gray-300">
            Nutrition Info
          </NavLink>
          <NavLink to="/order-food" className="text-white hover:text-gray-300">
            Order Food
          </NavLink>
        </nav>
        <div>
          <button className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue">
            <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
            <span className="hidden md:inline-block">Log In</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
