import React, { useState, useEffect } from "react";
import logo from "../../assets/logo/WhatsApp Image 2024-10-09 at 4.07.14 PM (1) 2.svg";
import { Link } from "react-router-dom";
import LoginModal from "../../Webapp/LoginModal";
import SignUpModal from "../SignUpModal";
import user from '../../assets/user.png';


const Homeheader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const [modalMode, setModalMode] = useState("login");
  const [popoverVisible, setPopoverVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const togglePopover = () => {
    setPopoverVisible(!popoverVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setPopoverVisible(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      // Mock user data; replace with actual API call
      const userInfo = {
      };
      setUser(userInfo);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <header
        className="absolute top-0 left-0 right-0 z-50 tracking-wide bg-opacity-70"
        style={{ backgroundColor: "rgba(0, 26, 59, 0.7)" }}
      >
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

          {/* Desktop Nav Links and Buttons */}
          <div className="hidden lg:flex items-center justify-end flex-grow text-left space-x-6">
            {isLoggedIn ? (
              <div className="flex space-x-3">
                <button
                  onClick={togglePopover}
                  className="bg-white text-[#004B80] px-4 py-2 border border-white rounded shadow-md"
                >

                  Profile
                </button>
                {popoverVisible && (
                  <div
                    className="absolute right-0 z-10 w-80 mt-12 ml-5 bg-white border border-gray-200 rounded-lg shadow-lg"
                    role="tooltip"
                  >
                    <div className="p-4">
                      <p className="text-base font-semibold text-gray-900">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <button
                        onClick={handleLogout}
                        className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-lg"
                      >
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex-none space-x-3 items-center">
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
            )}
          </div>

        </section>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-gray-100 py-4 px-6">
            {/* Add mobile menu items */}
          </div>
        )}
      </header>

      {/* Login and Signup Modals */}
      {modalMode === "login" && <LoginModal open={open} setOpen={setOpen} />}
      {modalMode === "signup" && <SignUpModal open={open} setOpen={setOpen} />}
    </>
  );
};

export default Homeheader;
