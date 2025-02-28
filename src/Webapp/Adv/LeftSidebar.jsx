"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { BookOpen, Home, UserPen, ChevronRight } from "lucide-react";
import logo from '../../assets/logo/logo.png'; // Ensure the path is correct

// NavItem Component
function NavItem({ icon, label, active = false }) {
  const Icon = icon;
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-[#E4ECFB] ${
        active ? "bg-[#E4ECFB] text-[#00335a]" : "text-[#00335a]"
      }`}
    >
      <Icon className="h-5 w-5" />
      <span className="font-medium">{label}</span>
    </div>
  );
}

// Left Sidebar Component
export default function LeftSidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setIsOpen(false);
    navigate("/Home");
  };

  return (
    <div className="w-64 bg-white p-6 flex flex-col h-screen sticky top-0 shadow-lg">
      {/* Logo Section */}
      <div className="flex items-center gap-2 mb-10">
        <div className="h-12 w-12 bg-[#00335a] rounded-lg flex items-center justify-center overflow-hidden">
          <img
            src={logo}
            alt="Logo"
            className="h-full w-full object-contain"
          />
        </div>
        <span className="text-xl font-bold text-[#00335a]">EERA</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1">
        <NavItem icon={Home} label="Home" />
        <NavItem icon={UserPen} label="Profile" />
      </nav>

      {/* Publish Notice Section */}
      <div className="mt-auto">
        <div className="bg-[#E4ECFB] p-4 rounded-lg text-center">
          <p className="text-sm text-[#00335a] mb-2">Publish Your Own Notice Now!</p>
          <button className="w-full bg-[#a99067] text-white py-2     px-4 rounded-md flex items-center justify-center gap-2 hover:bg-[#8c775a] transition">
            Publish
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-red-500 text-white w-full py-2 mt-4 rounded-md hover:bg-[#8c775a] transition"
      >
        Log Out
      </button>

      {/* Logout Confirmation Modal */}
      <Dialog open={isOpen} onClose={setIsOpen} className="relative z-10">
        <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity" />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto flex items-center justify-center">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                  <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle as="h3" className="text-base font-semibold text-[#00335a]">
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
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Confirm
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}