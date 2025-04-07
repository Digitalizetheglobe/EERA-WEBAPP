"use client";

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Home, UserPen, ChevronRight, Ellipsis, Menu, X } from "lucide-react";
import logo from '../../assets/logo/logo.png'; // Ensure the path is correct

// NavItem Component with hover animation
function NavItem({ icon, label, active = false, onClick }) {
  const Icon = icon;
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#b8d7f4] hover:translate-x-1 ${
        active ? "bg-[#b8d7f4] text-[#004B80] font-semibold" : "text-[#004B80]"
      }`}
      onClick={onClick}
    >
      <Icon className={`h-5 w-5 transition-all duration-300 ${active ? "text-[#004B80]" : ""}`} />
      <span className="font-medium">{label}</span>
    </div>
  );
}

// Left Sidebar Component
export default function LeftSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setIsOpen(false);
    navigate("/Home");
  };

  // Check if the current path matches
  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  // Close mobile menu after navigation
  const handleNavigation = (path) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-0 left-0 z-50 p-4">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-white shadow-md text-[#004B80] hover:bg-[#b8d7f4] transition-colors duration-200"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Sidebar Container */}
      <div className={`
        fixed top-0 left-0 h-screen bg-white shadow-lg border-r border-[#b8d7f4] transition-all duration-300 ease-in-out z-40
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:w-64
      `}>
        <div className="w-64 p-6 flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center gap-2 mb-10 group">
            <div className="h-12 w-12 rounded-lg flex items-center justify-center overflow-hidden shadow-md transition-transform duration-300 group-hover:scale-105">
              <a href="/home">
                <img
                  src={logo}
                  alt="Logo"
                  className="h-full w-full object-contain transition-all duration-500 group-hover:brightness-110"
                />
              </a>
            </div>
            <a href="/home">
              <span className="text-xl font-bold text-[#004B80] transition-all duration-300 group-hover:tracking-wide">
                EERA
              </span>
            </a>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-2">
            <NavItem
              icon={Home}
              label="Home"
              active={isActive("/dashboard") && !isActive("/profile")}
              onClick={() => handleNavigation("/dashboard")}
            />
            <NavItem
              icon={UserPen}
              label="Profile"
              active={isActive("/profile")}
              onClick={() => handleNavigation("/dashboard/profile")}
            />
            <NavItem
              icon={Ellipsis}
              label="Notice Status"
              active={isActive("/notice-status")}
              onClick={() => handleNavigation("/mynotices")}
            />
          </nav>

          {/* Publish Notice Section */}
          <div className="mt-auto transform transition-all duration-300 hover:scale-102 hover:shadow-md">
            <div className="bg-[#b8d7f4] p-4 rounded-lg text-center border border-[#004B80]/10">
              <p className="text-sm text-[#004B80] font-medium mb-3">
                Publish Your Own Notice Now!
              </p>
              <a href="/mynotices">
                <button className="w-full bg-[#004B80] text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 hover:bg-[#003b66] transition-all duration-300 group">
                  Publish
                  <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </a>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="bg-red-500 text-white w-full py-2 mt-4 rounded-md transition-all duration-300 hover:bg-red-600 hover:shadow-md"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Logout Confirmation Modal */}
      <Dialog open={isOpen} onClose={setIsOpen} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity backdrop-blur-sm" />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto flex items-center justify-center">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg animate-fadeIn">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                  <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle as="h3" className="text-base font-semibold text-[#004B80]">
                    Logout Confirmation
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to log out? You will need to log in again to access your account.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#b8d7f4]/30 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-red-500 transition-all duration-300 sm:ml-3 sm:w-auto"
              >
                Confirm
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-[#004B80] ring-1 shadow-md ring-[#004B80]/20 ring-inset hover:bg-[#b8d7f4]/20 transition-all duration-300 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}