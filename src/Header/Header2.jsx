import React, { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative">
      {/* Top border line */}
      <div className="h-0.5 bg-gray-600" />

      <div className="bg-[#021A39] px-4 py-3">
        <div className="flex items-center justify-between w-full h-16">
          {/* Logo - Left */}
          <div className="flex-shrink-0">
            <a href="/home2">
            <img src="/logo.svg" alt="EERA Logo" className="h-14 w-auto" />
            </a>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex flex-col items-center justify-center px-3">
            <div className="w-[650px] h-[0.5px] bg-white mb-3" />
            <div className="flex items-center justify-center space-x-8 lg:space-x-16">
              <a href="/home2" className="text-white font-semibold text-lg">Home</a>
              <a href="/about" className="text-white font-semibold text-lg">About</a>
              <a href="/all-notices" className="text-white font-semibold text-lg">All Notices</a>
              <a href="/contact" className="text-white font-semibold text-lg">Contact</a>
              <a href="/all-notices" className="text-white flex flex-row font-semibold items-center text-lg">
                <Search className="h-5 w-5 text-white mr-1" /> Search
              </a>
            </div>
            <div className="w-[650px] h-[0.5px] bg-white mt-3" />
          </nav>

          {/* Auth Buttons - Right */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="px-3 py-1 bg-white text-[#021A39] rounded-md hover:bg-[#021A39] hover:text-white border border-white transition text-lg">
              <Link to="/home2">Get Started</Link>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#021A39] p-4 flex flex-col items-center space-y-4 z-50">
          <a href="/home2" className="text-white font-semibold text-lg">Home</a>
          <a href="/about" className="text-white font-semibold text-lg">About</a>
          <a href="/all-notices" className="text-white font-semibold text-lg">All Notices</a>
          <a href="/contact" className="text-white font-semibold text-lg">Contact</a>
          <a href="/all-notices" className="text-white flex flex-row font-semibold items-center text-lg">
            <Search className="h-5 w-5 text-white mr-1" /> Search
          </a>
          <button className="px-3 py-1 bg-white text-[#021A39] rounded-md hover:bg-[#021A39] hover:text-white border border-white transition text-lg">
            <Link to="/home2">Get Started</Link>
          </button>
        </div>
      )}

      {/* Bottom border line */}
      <div className="h-0.5 bg-gray-600" />
    </header>
  );
};

export default Header;
