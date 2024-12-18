import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoginModal from "../../Webapp/LoginModal";
import SignUpModal from "../SignUpModal";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import logo from "../../assets/logo/WhatsApp Image 2024-10-09 at 4.07.14 PM (1) 2.svg";

const Homeheader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); // State for logout confirmation modal
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
    setIsLogoutModalOpen(false); // Close modal after logout
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
                        onClick={() => setIsLogoutModalOpen(true)} // Open modal
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
                <Link to='/Login'
                  className="bg-white text-[#004B80] px-4 py-2 border border-white rounded shadow-md"
               
                >
                  Login
                </Link>
                <Link to="/Register"
                  className="bg-[#004B80] text-white px-4 py-2 rounded shadow-md"
                 
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </section>
      </header>

      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen && (
        <Dialog open={isLogoutModalOpen} onClose={() => setIsLogoutModalOpen(false)} className="relative z-10">
          <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Confirm Logout
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to log out? You will need to log in again to access your account.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-4 py-2 text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  onClick={handleLogout}
                >
                  Logout
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-gray-100 px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-200 sm:mt-0 sm:w-auto"
                  onClick={() => setIsLogoutModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      )}

    </>
  );
};

export default Homeheader;
