import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
// import successGif from '../assets/system-regular-green.gif';  
import { Link } from 'react-router-dom';

export default function LoginSuccess({ open, setOpen }) {
    return (
        <Transition show={open}>
            <Dialog className="fixed inset-0 flex items-center justify-center z-50" onClose={() => setOpen(false)}>
                <TransitionChild
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-40" />
                </TransitionChild>

                <TransitionChild
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <DialogPanel className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full z-50">
                        <div className="px-4 py-5 sm:p-6 text-center">
                            <img alt="Success" className="mx-auto mb-4 w-20 h-20" />
                            <div className="sm:flex sm:items-start justify-center">
                                {/* <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10"> */}
                                    {/* <CheckCircleIcon className="h-6 w-6 text-green-600" aria-hidden="true" /> */}
                                {/* </div> */}
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-center">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Login Successful</h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">Congratulations, you've successfully logged in! Feel free to browse around, update your profile, and take advantage of our services.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:justify-center">
                        <Link to="/profile"> {/* Wrap the button with Link */}
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm"
                                    onClick={() => setOpen(false)}
                                >
                                    Go to Profile
                                </button>
                            </Link>
                        </div>
                    </DialogPanel>
                </TransitionChild>
            </Dialog>
        </Transition>
    );
}
