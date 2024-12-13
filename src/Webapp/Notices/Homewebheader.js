import React, { useState, useEffect } from "react";
import logo from "../../assets/logo/WhatsApp Image 2024-10-09 at 4.07.14 PM (1) 2.svg";
import saved from "../../assets/logo/Shape.png";
import { Link } from "react-router-dom";
import LoginModal from "../../Webapp/LoginModal";

const Homeheader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalMode, setModalMode] = useState("login");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header
        className="absolute top-0 left-0 right-0 z-50 tracking-wide bg-opacity-70"
        style={{ backgroundColor: "rgba(0, 26, 59, 0.7)" }}
      >
        {/* Main Header Section */}
        <section className="flex items-center justify-between py-3 lg:px-10 px-4">
          {/* Logo */}
          <Link to="/home" className="shrink-0">
            <img src={logo} alt="logo" className="w-10 sm:w-14" />
          </Link>

          {/* Navbar Toggle Button (Only for Mobile View) */}
          <button onClick={toggleMenu} className="lg:hidden p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#004B80"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 5h16M4 12h16M4 19h16" />
            </svg>
          </button>

          {/* Desktop Nav Links and Buttons (hidden on mobile) */}
          <div className="hidden lg:flex items-center justify-between flex-grow text-center space-x-6">
            <ul className="flex space-x-6 flex-grow justify-center">
              {/* <li>
                <Link
                  to="/home"
                  href="#"
                  className="text-white text-[15px] font-medium"
                >
                  Home
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <Link
                  to="/about"
                  className="text-white text-[15px] font-medium"
                >
                  About
                </Link>
              </li>
              <li>
                <a href="#" className="text-white text-[15px] font-medium">
                  Saved
                </a>
              </li> */}
              {/* <li>
                <Link to="/WebappPricing" className="text-white text-[15px] font-medium">
                  Pricing
                </Link>
              </li> */}
            </ul>
            <div className="flex space-x-3">
              <button
                className="bg-white text-[#004B80] px-4 py-2 border border-white rounded shadow-md"
                onClick={() => {
                  setModalMode("login");
                  setOpen(true);
                }}
              >
                Login
              </button>
              <button
                className="bg-[#004B80] text-white px-4 py-2 rounded shadow-md"
                onClick={() => {
                  setModalMode("signup");
                  setOpen(true);
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </section>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-gray-100 py-4 px-6">
            <ul className="flex flex-col space-y-4">
              <li>
                <a href="#" className="text-[#004B80] text-sm font-medium">
                  Home
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <img src={saved} className="w-3" alt="Saved icon" />
                <Link
                  to="/about"
                  className="text-[#004B80] text-sm font-medium"
                >
                  About
                </Link>
              </li>
              <li>
                <a href="#" className="text-[#004B80] text-sm font-medium">
                  Saved
                </a>
              </li>
              <li>
                <a href="#" className="text-[#004B80] text-sm font-medium">
                  Pricing
                </a>
              </li>
              <div className="flex space-x-2 mt-4">
                <button
                  className="bg-[#004B80] text-white px-4 py-2 rounded"
                  onClick={() => {
                    setModalMode("login");
                    setOpen(true);
                  }}
                >
                  Login
                </button>
                <button
                  className="bg-[#004B80] text-white px-4 py-2 rounded"
                  onClick={() => {
                    setModalMode("signup");
                    setOpen(true);
                  }}
                >
                  Sign Up
                </button>
              </div>
            </ul>
          </div>
        )}
      </header>

      {/* Login Modal */}
      <LoginModal open={open} setOpen={setOpen} mode={modalMode} />
    </>
  );
};

export default Homeheader;
