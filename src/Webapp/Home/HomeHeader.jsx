import React, { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) =>
    location.pathname === path ? "text-[#A99067] border-b-2 border-[#A99067] pb-1" : "text-white";

  return (
    <header className="relative w-full">
      {/* Top border line */}
      <div className="h-0.5 bg-gray-600" />

      <div className="bg-[#004B80] px-4 py-3 md:px-2">
        <div className="flex items-center justify-between h-16 w-full">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/home2">
              <img src="/logo.svg" alt="EERA Logo" className="h-12 w-auto" />
            </a>
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
              {menuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex flex-col items-center justify-center px-3 flex-grow">
            <div className="w-[650px] h-[0.5px] bg-white mb-3" />
            <div className="flex items-center justify-center space-x-10">
              <Link to="/home2" className={`font-semibold text-lg ${isActive('/home2')}`}>Home</Link>
              <Link to="/about" className={`font-semibold text-lg ${isActive('/about')}`}>About</Link>
              <Link to="/all-notices" className={`font-semibold text-lg ${isActive('/all-notices')}`}>All Notices</Link>
              <Link to="/contact" className={`font-semibold text-lg ${isActive('/contact')}`}>Contact</Link>
              <Link to="/all-notices" className="flex items-center font-semibold text-lg text-white">
                <Search className="h-5 w-5 text-white mr-1" />
                Search
              </Link>
            </div>
            <div className="w-[650px] h-[0.5px] bg-white mt-3" />
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex space-x-4">
            <Link to="/register" className="px-3 py-1 text-white border rounded-md border-white hover:text-[#021A39] hover:bg-white transition text-lg">Sign Up</Link>
            <Link to="/login" className="px-3 py-1 bg-white text-[#021A39] rounded-md hover:bg-[#004B80] hover:text-white border border-white transition text-lg">Log In</Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden bg-[#004B80] flex flex-col items-center space-y-4 py-4">
          <Link to="/home2" className={`text-lg ${isActive('/home2')}`} onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" className={`text-lg ${isActive('/about')}`} onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/all-notices" className={`text-lg ${isActive('/all-notices')}`} onClick={() => setMenuOpen(false)}>All Notices</Link>
          <Link to="/contact" className={`text-lg ${isActive('/contact')}`} onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link to="/all-notices" className="flex items-center text-lg text-white" onClick={() => setMenuOpen(false)}>
            <Search className="h-5 w-5 text-white mr-1" />
            Search
          </Link>
          <div className="flex flex-col space-y-2">
            <Link to="/register" className="px-4 py-2 text-white border rounded-md border-white hover:text-[#021A39] hover:bg-white transition text-lg" onClick={() => setMenuOpen(false)}>Sign Up</Link>
            <Link to="/login" className="px-4 py-2 bg-white text-[#021A39] rounded-md hover:bg-[#021A39] hover:text-white border border-white transition text-lg" onClick={() => setMenuOpen(false)}>Log In</Link>
          </div>
        </div>
      )}

      {/* Bottom border line */}
      <div className="h-0.5 bg-gray-600" />
    </header>
  );
};

export default Header;