import React from 'react';
import { Search } from 'lucide-react';
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation(); // Get current route

  // Function to check if the link is active and apply styles
  const isActive = (path) =>
    location.pathname === path ? "text-[#A99067] border-b-2 border-[#A99067] pb-1" : "text-white";

  return (
    <header className="relative">
      {/* Top border line */}
      <div className="h-0.5 bg-gray-600" />

      <div className="bg-[#004B80] px-2 py-3">
        <div className="flex items-center w-full h-16">
          {/* Logo - Extreme Left */}
          <div className="flex-shrink-0 pl-2">
            <div className="flex items-center space-x-2">
              <img src="/logo.svg" alt="EERA Logo" className="h-14 w-auto" />
            </div>
          </div>

          {/* Navigation - Centered with lines */}
          <nav className="flex-grow flex flex-col items-center justify-center px-3">
            <div className="w-[650px] h-[0.5px] bg-white mb-3" />
            <div className="flex items-center justify-center space-x-16">
              <Link to="/home2" className={`font-semibold text-lg ${isActive('/home2')}`}>Home</Link>
              <Link to="/about" className={`font-semibold text-lg ${isActive('/about')}`}>About</Link>
              <Link to="/all-notices" className={`font-semibold text-lg ${isActive('/all-notices')}`}>All Notices</Link>
              <Link to="/contact" className={`font-semibold text-lg ${isActive('/contact')}`}>Contact</Link>
              <div className="flex items-center space-x-2">
                <Link to="/all-notices" className="flex flex-row font-semibold items-center text-lg text-white">
                  <Search className="h-5 w-5 text-white mr-1" />
                  Search
                </Link>

              </div>
            </div>
            <div className="w-[650px] h-[0.5px] bg-white mt-3" />
          </nav>

          {/* Auth Buttons - Extreme Right */}
          <div className="flex-shrink-0 flex items-center space-x-4 mr-2">
            <button className="px-3 py-1 text-white border rounded-md border-white hover:text-[#021A39] hover:bg-white transition text-lg">
              <Link to="/register">Sign Up</Link>
            </button>
            <button className="px-3 py-1 bg-white text-[#021A39] rounded-md hover:bg-[#021A39] hover:text-white border border-white transition text-lg">
              <Link to="/login">Log In</Link>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom border line */}
      <div className="h-0.5 bg-gray-600" />
    </header>
  );
};

export default Header;
