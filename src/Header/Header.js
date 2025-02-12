import React, { useState } from "react";
import logo from "../assets/logo/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <header
        className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-10 bg-opacity-70"
        style={{ backgroundColor: "rgba(0, 26, 59, 0.7)" }}
      >
        <div className="flex items-center gap-5 w-full">
          {/* Logo */}
          <Link to="/">
            <img src={logo} alt="logo" className="w-14 max-lg:mr-5" />
          </Link>

          {/* Navigation Links for Desktop */}
          <div className="hidden lg:flex lg:ml-auto gap-8 list-none ml-auto">
            <li className="group">
              <Link
                to="/home"
                className="block text-lg font-semibold lg:text-white lg:text-xl transition-all duration-300 transform group-hover:scale-105 group-hover:text-[#A99067] group-hover:underline"
              >
                Home
              </Link>
            </li>
            <li className="group">
              <Link
                to="/about"
                className="block text-lg font-semibold lg:text-white lg:text-xl transition-all duration-300 transform group-hover:scale-105 group-hover:text-[#A99067] group-hover:underline"
              >
                About
              </Link>
            </li>
            <li className="group">
              <Link
                to="/all-notices"
                className="block text-lg font-semibold lg:text-white lg:text-xl transition-all duration-300 transform group-hover:scale-105 group-hover:text-[#A99067] group-hover:underline"
              >
                All Notices
              </Link>
            </li>
            <li className="group">
              <a
                href="/contact"
                className="block text-lg font-semibold lg:text-white lg:text-xl transition-all duration-300 transform group-hover:scale-105 group-hover:text-[#A99067] group-hover:underline"
              >
                Contact
              </a>
            </li>
            
          </div>

          {/* Right Section with Buttons */}
          <div className="flex items-center ml-auto space-x-4">
            <Link
              to="/home"
              className="px-4 py-2 text-sm rounded font-semibold text-black bg-[#A99067] transition-all duration-300 hover:bg-white hover:text-black"
            >
              Get Started
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              id="toggleOpen"
              onClick={toggleMenu}
              className="lg:hidden"
            >
              <svg
                className="w-7 h-7 text-white"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div
        id="collapseMenu"
        className={`${
          menuOpen ? "max-lg:flex" : "max-lg:hidden"
        } lg:hidden max-lg:fixed max-lg:bg-white max-lg:w-3/4 max-lg:min-w-[250px] max-lg:top-0 max-lg:right-0 max-lg:h-full max-lg:p-6 max-lg:shadow-lg max-lg:z-50 transition-transform transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Menu Button */}
        <button
          id="toggleClose"
          onClick={toggleMenu}
          className="lg:hidden fixed top-4 right-4 z-[100] rounded-full bg-white p-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 fill-black"
            viewBox="0 0 320.591 320.591"
          >
            <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"></path>
            <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"></path>
          </svg>
        </button>

        {/* Navigation Menu */}
        <ul className="flex flex-col gap-6">
          <li className="group">
            <Link
              to="/home"
              className="block text-lg font-semibold max-lg:text-gray-900 lg:text-white lg:text-xl max-lg:text-center transition-all duration-300 transform group-hover:scale-105 group-hover:text-[#A99067] group-hover:underline"
            >
              Home
            </Link>
          </li>
          <li className="group">
            <Link
              to="/about"
              className="block text-lg font-semibold max-lg:text-gray-900 lg:text-white lg:text-xl max-lg:text-center transition-all duration-300 transform group-hover:scale-105 group-hover:text-[#A99067] group-hover:underline"
            >
              About
            </Link>
          </li>
          <li className="group">
            <Link
              to="/all-notices"
              className="block text-lg font-semibold max-lg:text-gray-900 lg:text-white lg:text-xl max-lg:text-center transition-all duration-300 transform group-hover:scale-105 group-hover:text-[#A99067] group-hover:underline"
            >
              All Notices
            </Link>
          </li>
          <li className="group">
            <a
              href="/contact"
              className="block text-lg font-semibold max-lg:text-gray-900 lg:text-white lg:text-xl max-lg:text-center transition-all duration-300 transform group-hover:scale-105 group-hover:text-[#A99067] group-hover:underline"
            >
              Contact
            </a>
          </li>
          
        </ul>
      </div>
    </>
  );
};

export default Header;
