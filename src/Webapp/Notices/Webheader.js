import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo/WhatsApp Image 2024-10-09 at 4.07.14 PM (1) 2.svg";
import saved from "../../assets/logo/Shape.png";
import { Link } from "react-router-dom";

const Webheader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set `isLoggedIn` to true if the token exists
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
      <header className="tracking-wide relative z-50">
        <section className="flex items-center justify-between py-3 lg:px-10 px-4 border-b bg-white lg:min-h-[80px] max-lg:min-h-[60px]">
          {/* Logo */}
          <Link to="/home" className="shrink-0">
            <img src={logo} alt="logo" className="w-10 sm:w-14" />
          </Link>
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
          <div className="hidden lg:flex items-center space-x-6">
            <ul className="flex space-x-6">
              <li>
                {/* <Link to="/home" className="text-[#004B80] text-[15px] font-medium">
                  Home
                </Link> */}
              </li>
              {isLoggedIn && (
                <>
                  {/* <li className="flex items-center space-x-2">
                    <img src={saved} className="w-3" alt="Saved icon" />
                    <Link to="/saved" className="text-[#004B80] text-[15px] font-medium">
                      Saved
                    </Link>
                  </li>
                  <li>
                    <Link to="/account" className="text-[#004B80] text-[15px] font-medium">
                      Account
                    </Link>
                  </li> */}
                </>
              )}
              {/* <li>
                <Link to="/WebappPricing" className="text-[#004B80] text-[15px] font-medium">
                  Pricing
                </Link>
              </li> */}
            </ul>
            <div className="flex space-x-3">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="bg-[#004B80] text-white px-4 py-2 rounded"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/home" className="bg-[#004B80] text-white px-4 py-2 rounded">
                    Login
                  </Link>
                  <Link to="/home" className="bg-[#004B80] text-white px-4 py-2 rounded">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-gray-100 py-4 px-6">
            <ul className="flex flex-col space-y-4">
              {/* <li>
                <Link to="/home" className="text-[#004B80] text-sm font-medium">
                  Home
                </Link>
              </li> */}
              {isLoggedIn && (
                <>
                  {/* <li className="flex items-center space-x-2">
                    <img src={saved} className="w-3" alt="Saved icon" />
                    <Link to="/saved" className="text-[#004B80] text-sm font-medium">
                      Saved
                    </Link>
                  </li>
                  <li>
                    <Link to="/account" className="text-[#004B80] text-sm font-medium">
                      Account
                    </Link>
                  </li> */}
                </>
              )}
              <li>
                {/* <Link to="/WebappPricing" className="text-[#004B80] text-sm font-medium">
                  Pricing
                </Link> */}
              </li>
              <div className="flex space-x-2 mt-4">
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="bg-[#004B80] text-white px-4 py-2 rounded"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link to="/login" className="bg-[#004B80] text-white px-4 py-2 rounded">
                      Login
                    </Link>
                    <Link to="/signup" className="bg-[#004B80] text-white px-4 py-2 rounded">
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </ul>
          </div>
        )}
      </header>
    </>
  );
};

export default Webheader;
