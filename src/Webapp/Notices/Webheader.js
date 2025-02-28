import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo/WhatsApp Image 2024-10-09 at 4.07.14 PM (1) 2.svg";
import saved from "../../assets/logo/Shape.png";
import { Link } from "react-router-dom";

const Webheader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const scrollToTop = () => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  };
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
          <Link to="/home" className="shrink-0" onClick={scrollToTop}>
            <img src={logo} alt="logo" className="w-15 sm:w-22" />
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
            <div className="flex space-x-3" onClick={scrollToTop}>
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="bg-[#004B80] text-white px-4 py-2 rounded"
                >
                  Logout
                </button>
              ) : (
                <div className="flex items-center gap-4" onClick={scrollToTop}>
                  <a
                    className="group relative inline-flex items-center overflow-hidden rounded bg-[#A99067] hover:bg-[#001A3B] hover:border-[#A99067] border hover:text-[#A99067] px-8 py-3 text-white"
                    href="/login"
                  >
                    <span className="absolute -end-full transition-all group-hover:end-4">
                    <svg
                        className="size-5 rtl:rotate-180"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>

                    </span>
                    <span className="text-sm transition-all group-hover:me-4 font-bold" onClick={scrollToTop}>
                      Login
                    </span>
                  </a>
                  <a
                    className="group relative inline-flex items-center overflow-hidden rounded bg-[#A99067] hover:bg-[#001A3B] hover:border-[#A99067] border hover:text-[#A99067] px-8 py-3 text-white"
                    href="/register"
                  >
                    <span className="absolute -end-full transition-all group-hover:end-4">
                      <svg
                        className="size-5 rtl:rotate-180"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                    <span className="text-sm transition-all group-hover:me-4 font-bold" onClick={scrollToTop}>
                      Register
                    </span>
                  </a>
                </div>
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
              <div className="flex space-x-2 mt-4" onClick={scrollToTop}>
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
                    <Link to="/register" className="bg-[#004B80] text-white px-4 py-2 rounded">
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
