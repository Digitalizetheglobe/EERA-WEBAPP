import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { LockClosedIcon, UserIcon } from "@heroicons/react/24/solid"; 
import { EnvelopeIcon } from '@heroicons/react/24/solid';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/logo/WhatsApp Image 2024-10-09 at 4.07.14 PM (1) 2.svg';

export default function LoginModal({ open, setOpen }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // const handleLogin = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch('https://api.epublicnotices.in/api/webapp/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     const result = await response.json();

  //     if (response.ok) {
  //       // Save token to local storage
  //       localStorage.setItem('authToken', result.token);

  //       toast.success('Login successful!');
  //       setTimeout(() => {
  //         setOpen(false); // Close the modal
  //       }, 1500);
  //     } else {
  //       toast.error(result.message || 'Login failed. Please try again.');
  //     }
  //   } catch (error) {
  //     toast.error('An error occurred. Please check your connection.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.epublicnotices.in/api/webapp/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        // Save token to local storage
        localStorage.setItem('authToken', result.token);
  
        toast.success('Login successful!');
        setTimeout(() => {
          setOpen(false); // Close the modal
          window.location.reload(); // Refresh the page
        }, 1500);
      } else {
        toast.error(result.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <ToastContainer />
      <Transition show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

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
                        <h4 className="text-lg font-semibold text-gray-600 mb-2">Sign In</h4>
                        <p className="text-center text-sm text-gray-500">
                          Sign in or register with EERA Public Notice Portal to save searches and set up email alerts.
                        </p>
                        <div className="mt-4 w-full max-w-xs">
                          <div className="space-y-4">
                            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                              <span className="px-3">
                                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                              </span>
                              <input
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                className="flex-1 px-3 py-2 text-gray-700 focus:outline-none"
                                placeholder="Enter your email"
                              />
                            </div>
                            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                              <span className="px-3">
                              <LockClosedIcon className="h-5 w-5 text-gray-400" />
                              </span>
                              <input
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                className="flex-1 px-3 py-2 text-gray-700 focus:outline-none"
                                placeholder="Enter your password"
                              />
                            </div>
                            <button
                              type="button"
                              className={`w-full py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none ${
                                !email || !password || loading ? 'opacity-50 cursor-not-allowed' : ''
                              }`}
                              disabled={!email || !password || loading}
                              onClick={handleLogin}
                            >
                              {loading ? 'Loading...' : 'Login'}
                            </button>
                          </div>
                          <p className="mt-4 text-xs text-justify text-gray-500">
                            By signing up, you agree to the Terms of Service and Privacy Policy of <strong>EERA Public Notice Portal</strong>.
                          </p>
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
    </>
  );
}
