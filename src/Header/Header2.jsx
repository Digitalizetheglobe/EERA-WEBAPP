import React from 'react';
import { Search } from 'lucide-react';
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="relative">
      {/* Top border line */}
      <div className="h-0.5 bg-gray-600" />

      <div className="bg-[#021A39] px-2 py-3">
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
              <a href="/home" className="text-white font-semibold text-lg">Home</a>
              <a href="/about" className="text-white font-semibold text-lg">About</a>
              <a href="/all-notices" className="text-white font-semibold text-lg">All Notices</a>
              <a href="/contact" className="text-white font-semibold text-lg">Contact</a>
              <div className="flex items-center space-x-2">
                <a href="/all-notices" className="text-white flex flex-row font-semibold items-center text-lg">
                  <Search className="h-5 w-5 text-white mr-1" />
                  Search</a>
              </div>
            </div>
            <div className="w-[650px] h-[0.5px] bg-white mt-3" />
          </nav>

          {/* Auth Buttons - Extreme Right */}
          <div className="flex-shrink-0  flex items-center space-x-4">
          
<button className="px-3 py-1 bg-white text-[#021A39] rounded-md hover:bg-[#021A39] hover:text-white border border-white transition text-lg">
  <Link to="/home">Get Started</Link>
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