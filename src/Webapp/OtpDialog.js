import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useState, useRef } from 'react';
// import emailgif from '../assets/emailgif.gif';
import LoginSuccess from './LoginSuccess';

export default function () {
    const [open, setOpen] = useState(true)
    const [otp, setOtp] = useState(new Array(6).fill(''));
    const [successOpen, setSuccessOpen] = useState(false);

    const inputRefs = useRef([]);

    const handleOtpChange = (e, index) => {
        const value = e.target.value;
        if (/^[0-9]$/.test(value) || value === '') {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value !== '' && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleVerifyOtp = () => {
        const otpValue = otp.join('');
        // Handle OTP verification logic here
        console.log('OTP entered:', otpValue);
        // Simulate successful OTP verification
        setOpen(false);
        setSuccessOpen(true);
    };

    return (
        <>
            <Transition show={open}>
                <Dialog className="relative z-50" onClose={() => setOpen(false)}>
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

                    <div className="fixed inset-0 overflow-hidden z-50">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <TransitionChild
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <DialogPanel className="pointer-events-auto relative w-screen max-w-sm z-50">
                                        <TransitionChild
                                            enter="ease-in-out duration-500"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="ease-in-out duration-500"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4 z-50">
                                                <button
                                                    type="button"
                                                    className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                    onClick={() => setOpen(false)}
                                                >
                                                    <span className="absolute -inset-2.5" />
                                                    <span className="sr-only">Close panel</span>
                                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </TransitionChild>
                                        <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl z-50">
                                            <div className="px-4 sm:px-6">
                                                <div className="flex justify-center mb-4">
                                                    <img alt="Loading..." className="w-20 h-20" style={{ marginTop: '21px' }} />
                                                </div>
                                            </div>
                                            <div className="relative mt-6 flex-1 px-4 sm:px-6" style={{ marginTop: '-11px' }}>
                                                <h3 className="tracking-tight text-center" style={{ fontWeight: 600, fontSize: '22px', color: '#454578' }}>Check your email</h3>
                                                <div className="flex justify-center">
                                                    <span className="tracking-tight text-gray text-center" style={{ alignItems: 'center', marginTop: '10px' }}> We have sent an email to </span>
                                                </div>
                                                <div className="flex justify-center">
                                                    <span className="tracking-tight text-gray text-center" style={{ alignItems: 'center' }}><strong>aswarprasad2000@gmail.com</strong> </span>
                                                </div>
                                                <br />
                                                <br />
                                                <h4 className="tracking-tight text-gray-600 text-center" style={{ fontSize: '22px', fontWeight: 600, marginBottom: '-17px' }}>
                                                    <b>Enter OTP</b>
                                                </h4>
                                                <br />
                                                <hr />
                                                <br />
                                                <span className="tracking-tight text-gray text-center">
                                                    Enter the OTP sent to your email to verify your account.
                                                </span>
                                                <div className="mt-4 flex justify-center">
                                                    <div className="w-full max-w-xs">
                                                        <div className="flex justify-between">
                                                            {otp.map((_, index) => (
                                                                <input
                                                                    key={index}
                                                                    type="text"
                                                                    value={otp[index]}
                                                                    onChange={(e) => handleOtpChange(e, index)}
                                                                    className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                                                                    maxLength="1"
                                                                    ref={(el) => (inputRefs.current[index] = el)}
                                                                />
                                                            ))}
                                                        </div>
                                                        <div className="flex justify-center mt-4">
                                                            <button
                                                                type="button"
                                                                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center text-center w-full"
                                                                onClick={handleVerifyOtp}
                                                            >
                                                                Verify OTP
                                                            </button>
                                                        </div>
                                                        <div className="flex justify-center">
                                                            <span style={{ marginTop: '10px' }}>Didn't receive code? <a style={{ color: 'blue' }}>Resend</a></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </DialogPanel>
                                </TransitionChild>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <LoginSuccess open={successOpen} setOpen={setSuccessOpen} />
        </>
    );
}
