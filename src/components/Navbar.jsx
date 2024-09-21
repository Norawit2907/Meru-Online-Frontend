import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="p-7 bg-gray-800 text-white relative w-full h-fit">
      <div className="fixed top-0 left-0">
        <ul className="flex justify-between fixed top-0 left-0 p-4 w-full bg-gray-800">
          <li>
            <Link to="/" className="hover:text-blue-400">
              Home
            </Link>
          </li>
          <li>
            <Link to="/profile" className="hover:text-blue-400">
              Profile
            </Link>
          </li>
        </ul>
      </div>
        
    </nav>
  );
};

export default Navbar;
