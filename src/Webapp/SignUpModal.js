import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { LockClosedIcon, UserIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import logo from "../assets/logo/WhatsApp Image 2024-10-09 at 4.07.14 PM (1) 2.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginModal from "./LoginModal";

export default function SignUpModal({ open, setOpen, setLoginModalOpen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);

  const handleSignUp = async () => {
    const apiUrl = "https://api.epublicnotices.in/api/webapp/register";
    const payload = {
      firstName,
      lastName,
      email,
      password,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data);

        // Save token to local storage
        if (data.token) {
          localStorage.setItem("authToken", data.token);
          console.log("Token saved to local storage");
        }

        toast.success("Registration successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setSuccessModalOpen(true); // Open success modal after registration
        setOpen(false); // Close sign-up modal
      } else {
        const error = await response.json();
        console.error("Error:", error);

        // Display error toast
        toast.error(`Registration failed: ${error.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (err) {
      console.error("Network error:", err);

      // Display network error toast
      toast.error("Something went wrong. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleLoginRedirect = () => {
    setSuccessModalOpen(false); // Close success modal
    setLoginModalOpen(true); // Open login modal
  };

  return (
    <>
      <ToastContainer />

      {/* Success Modal after Registration */}
      <Transition show={successModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setSuccessModalOpen(false)}>
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-sm">
                    <div className="relative flex h-full flex-col bg-white shadow-xl">
                      <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setSuccessModalOpen(false)}
                        >
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                      <div className="flex flex-col items-center py-6 px-4 sm:px-6">
                        <h4 className="text-lg font-semibold text-gray-600 mb-2">
                          Your Registration is Done Successfully!
                        </h4>
                        <p className="text-center text-sm text-gray-500">
                          You need to login to proceed.
                        </p>
                        <button
                          type="button"
                          className="w-full py-2 mt-4 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none"
                          onClick={handleLoginRedirect} // Open login modal here
                        >
                          Login
                        </button>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Sign Up Modal */}
      <Transition show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setOpen(false)}>
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-sm">
                    <div className="relative flex h-full flex-col bg-white shadow-xl">
                      <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setOpen(false)}
                        >
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                      <div className="flex flex-col items-center py-6 px-4 sm:px-6">
                        <img src={logo} alt="Logo" className="w-20 h-20 mb-4" />
                        <h4 className="text-lg font-semibold text-gray-600 mb-2">
                          Sign In or Register
                        </h4>
                        <p className="text-center text-sm text-gray-500">
                          Sign in or register with EERA Public Notice Portal to
                          save searches and set up email alerts.
                        </p>
                        <div className="mt-4 w-full max-w-xs">
                          {/* Email and Password Inputs */}
                          <div className="space-y-4">
                            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                              <span className="px-3">
                                <UserIcon className="h-5 w-5 text-gray-400" />
                              </span>
                              <input
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={handleFirstNameChange}
                                className="w-full py-2 pl-2 pr-3 text-gray-700 focus:outline-none"
                              />
                            </div>
                            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                              <span className="px-3">
                                <UserIcon className="h-5 w-5 text-gray-400" />
                              </span>
                              <input
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={handleLastNameChange}
                                className="w-full py-2 pl-2 pr-3 text-gray-700 focus:outline-none"
                              />
                            </div>
                            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                              <span className="px-3">
                                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                              </span>
                              <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={handleEmailChange}
                                className="w-full py-2 pl-2 pr-3 text-gray-700 focus:outline-none"
                              />
                            </div>
                            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                              <span className="px-3">
                                <LockClosedIcon className="h-5 w-5 text-gray-400" />
                              </span>
                              <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                                className="w-full py-2 pl-2 pr-3 text-gray-700 focus:outline-none"
                              />
                            </div>
                          </div>
                          <button
                            type="button"
                            className="w-full py-2 mt-4 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none"
                            onClick={handleSignUp}
                          >
                            Sign Up
                          </button>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Login Modal */}
      <LoginModal open={successModalOpen} setOpen={setLoginModalOpen} />
    </>
  );
}
