import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import logo from "../../assets/logo/WhatsApp Image 2024-10-09 at 4.07.14 PM (1) 2.svg";

const Homeheader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const scrollToTop = () => {
    window.scrollTo(0, 0); // Scroll to the top of the page
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
      setUser({ firstName: "John", lastName: "Doe", email: "john@example.com" });
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 tracking-wide bg-opacity-80 bg-[#001A3BCC] py-3 lg:px-10 px-7 flex items-center justify-between">
        {/* Logo */}
        <Link to="/home" className="shrink-0">
          <img src={logo} alt="logo" className="w-10 sm:w-14" />
        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:flex space-x-6 text-white text-lg">
          <Link to="/home" className="hover:text-[#A99067]" onClick={scrollToTop}>Home</Link>
          <Link to="/about" className="hover:text-[#A99067]" onClick={scrollToTop}>About</Link>
          <Link to="/all-notices" className="hover:text-[#A99067]" onClick={scrollToTop}>All Notices</Link>
          <Link to="/contact" className="hover:text-[#A99067]" onClick={scrollToTop}>Contact</Link>
          
        </nav>

        {/* Profile/Login Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setPopoverVisible(!popoverVisible)}
                className="bg-white text-[#004B80] px-4 py-2 border border-white rounded shadow-md"
              >
                Profile
              </button>
              {popoverVisible && (
                <div className="absolute right-0 z-10 w-56 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <div className="p-4">
                    <p className="text-base font-semibold text-gray-900">{user.firstName} {user.lastName}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <button
                      onClick={() => setIsLogoutModalOpen(true)}
                      className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-lg"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                {/* Login Button */}
                <a
                  className="group relative inline-flex items-center overflow-hidden rounded border border-current px-8 py-3 bg-[#A99067] text-[#001A3B] focus:outline-none focus:ring active:text-[#001A3B] hover:bg-[#dfbc8c] hover:text-[#001A3B]"
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
                  <span className="text-sm transition-all group-hover:me-4 font-bold">
                    {" "}
                    Login{" "}
                  </span>
                </a>

                {/* Register Button */}
                <a
                  className="group relative inline-flex items-center overflow-hidden rounded border border-current px-8 py-3 bg-[#A99067] text-[#001A3B] focus:outline-none focus:ring active:text-[#001A3B] hover:bg-[#dfbc8c] hover:text-[#001A3B]"
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
                  <span className="text-sm transition-all group-hover:me-4 font-bold">
                    {" "}
                    Register{" "}
                  </span>
                </a>
              </div>
              </div>

          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
        <span className="sr-only">Toggle menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-md absolute w-full left-0 top-14 py-4 px-6">
          <Link to="/home" className="block text-[#004B80] py-2">Home</Link>
          <Link to="/about" className="block text-[#004B80] py-2">About</Link>
          <Link to="/all-notices" className="block text-[#004B80] py-2">All Notices</Link>
          <Link to="/contact" className="block text-[#004B80] py-2">Contact</Link>
          
          {isLoggedIn ? (
            <>
              <p className="text-gray-800 font-semibold">{user.firstName} {user.lastName}</p>
              <p className="text-gray-600 text-sm">{user.email}</p>
              <button onClick={() => setIsLogoutModalOpen(true)} className="mt-3 w-full bg-red-500 text-white py-2 px-4 rounded-lg">
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/Login" className="block text-[#004B80] py-2">Login</Link>
              <Link to="/Register" className="block text-[#004B80] py-2">Sign Up</Link>
            </>
          )}
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen && (
        <Dialog open={isLogoutModalOpen} onClose={() => setIsLogoutModalOpen(false)} className="relative z-10">
          <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
              <div className="flex items-center">
                <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
                <DialogTitle className="ml-4 text-lg font-medium text-gray-900">Confirm Logout</DialogTitle>
              </div>
              <p className="text-sm text-gray-500 mt-2">Are you sure you want to log out?</p>
              <div className="mt-4 flex justify-end space-x-2">
                <button className="bg-gray-100 px-4 py-2 rounded shadow" onClick={() => setIsLogoutModalOpen(false)}>Cancel</button>
                <button className="bg-red-600 text-white px-4 py-2 rounded shadow" onClick={() => { setIsLoggedIn(false); setIsLogoutModalOpen(false); }}>Logout</button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default Homeheader;
