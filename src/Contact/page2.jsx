import React, { useState } from 'react';
import Homeheader from '../Webapp/Notices/Homewebheader';
import Header from '../Webapp/Home/HomeHeader';
import Footer from '../LandingPage/Footer';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

// Icons
const LocationIcon = () => (
    <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
    </svg>
);

const EmailIcon = () => (
    <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
);

const PhoneIcon = () => (
    <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
);

const CalendarIcon = () => (
    <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
);

const ChatIcon = () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
);




const HelpDeskContactPage = () => {
    const [openIndex, setOpenIndex] = useState(0);
    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    return (
        <div className="min-h-screen bg-[#e3ecfb] text-[#004b80]">
            <Header />
            {/* Header */}
            <div className=" py-6 px-4 text-center ">
                <h1 className="text-6xl font-bold">Help Desk</h1>
                <p className="mt-2">We're here to assist you!</p>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8 md:px-8">
                <h2 className="text-3xl font-bold pb-2 border-b-4 border-[#b8d7f4] inline-block">Contact Us</h2>

                {/* Contact Info and Map Section */}
                <div className="flex flex-col lg:flex-row gap-8 mt-8">

                    {/* Contact Info Card */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg transition-transform duration-300 hover:-translate-y-1 lg:w-1/3">

                        {/* Address Section */}
                        <div className="mb-8">
                            <h3 className="flex items-center text-xl font-semibold text-[#004b80] mb-2">
                                <LocationIcon />
                                Our Address
                            </h3>
                            <p className="ml-8 text-gray-700 leading-relaxed">
                                Kohinoor World Tower, <br />
                                Pune, Maharashtra<br />
                                411018
                            </p>
                        </div>

                        {/* Email Section */}
                        <div className="mb-8">
                            <h3 className="flex items-center text-xl font-semibold text-[#004b80] mb-2">
                                <EmailIcon />
                                Email Us
                            </h3>
                            <div className="ml-8">
                                <a href="mailto:support@helpdesk.com" className="block mb-2 text-[#004b80] hover:text-blue-600 hover:underline transition-colors">
                                    support@helpdesk.com
                                </a>
                                <a href="mailto:business@helpdesk.com" className="block mb-2 text-[#004b80] hover:text-blue-600 hover:underline transition-colors">
                                    business@helpdesk.com
                                </a>
                                <a href="mailto:inquiries@helpdesk.com" className="block mb-2 text-[#004b80] hover:text-blue-600 hover:underline transition-colors">
                                    inquiries@helpdesk.com
                                </a>
                            </div>
                        </div>

                        {/* Phone Section */}
                        <div className="mb-8">
                            <h3 className="flex items-center text-xl font-semibold text-[#004b80] mb-2">
                                <PhoneIcon />
                                Call Us
                            </h3>
                            <p className="ml-8 text-gray-700">+91 7391092093</p>
                            <p className="ml-8 text-gray-700">+91 7391092093</p>
                            <p className="ml-8 text-gray-700">+91 7391092093</p>
                        </div>

                        {/* Hours Section */}
                        <div className="mb-4">
                            <h3 className="flex items-center text-xl font-semibold text-[#004b80] mb-2">
                                <CalendarIcon />
                                Hours
                            </h3>
                            <p className="ml-8 text-gray-700">
                                Monday - Friday: 9AM - 6PM IST<br />
                                Saturday: 10AM - 4PM IST<br />
                                Sunday: Closed
                            </p>
                        </div>
                    </div>

                    {/* Map Container */}
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg lg:w-2/3 h-full min-h-96">
                        {/* Placeholder for map - in a real app, you would use a map component here */}
                        <div className="w-full h-full min-h-96 bg-gray-200 flex items-center justify-center">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.650343622792!2d73.79664587519447!3d18.6347903824811!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b92d986822d9%3A0x13b0437cbf911d4a!2sKohinoor%20World%20Towers!5e0!3m2!1sen!2sin!4v1739359789161!5m2!1sen!2sin&z=15"
                                width="100%"
                                height="350"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
                
                {/* FAQ Section - Now placed below the map and contact info */}
                <div className="mt-12">
                    <h2 className="text-3xl font-bold pb-2 border-b-4 border-[#b8d7f4] inline-block mb-6">Frequently Asked Questions</h2>
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <div className="space-y-4">
                            {/* FAQ 1 */}
                            <div className={`border-b ${openIndex === 0 ? 'bg-gray-100' : ''}`}>
                                <div
                                    className="flex justify-between items-center cursor-pointer py-4 p-6"
                                    onClick={() => toggleFAQ(0)}
                                >
                                    <h2 className="text-lg font-semibold text-[#001A3B]">
                                        How do I post a notice on the platform?
                                    </h2>
                                    <span className="text-[#A99067]">{openIndex === 0 ? <FaChevronUp /> : <FaChevronDown />}</span>
                                </div>
                                {openIndex === 0 && (
                                    <div className="text-[#001A3B]">
                                        <p className="py-2 p-6">
                                            To post a notice, first log in or create an account, then navigate to the "Post Notice" button. Choose the notice category (Real Estate, Corporate, Legal), and fill in essential details like title, description, date, and location. Upload any relevant documents if necessary, review your notice, and click "Submit." Once approved, your notice will be visible to the public.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* FAQ 2 */}
                            <div className={`border-b ${openIndex === 1 ? 'bg-gray-100' : ''}`}>
                                <div
                                    className="flex justify-between items-center cursor-pointer py-4 p-6"
                                    onClick={() => toggleFAQ(1)}
                                >
                                    <h2 className="text-lg font-semibold text-[#001A3B]">
                                        What types of notices can I post?
                                    </h2>
                                    <span className="text-[#A99067]">{openIndex === 1 ? <FaChevronUp /> : <FaChevronDown />}</span>
                                </div>
                                {openIndex === 1 && (
                                    <div className="text-[#001A3B]">
                                        <p className="p-6 py-2">You can post notices related to real estate, corporate, legal, or any other categories we support.</p>
                                    </div>
                                )}
                            </div>

                            {/* FAQ 3 */}
                            <div className={`border-b ${openIndex === 2 ? 'bg-gray-100' : ''}`}>
                                <div
                                    className="flex justify-between items-center cursor-pointer py-4 p-6"
                                    onClick={() => toggleFAQ(2)}
                                >
                                    <h2 className="text-lg font-semibold text-[#001A3B]">
                                        How can I download or save a notice?
                                    </h2>
                                    <span className="text-[#A99067]">{openIndex === 2 ? <FaChevronUp /> : <FaChevronDown />}</span>
                                </div>
                                {openIndex === 2 && (
                                    <div className="text-[#001A3B]">
                                        <p className="py-2 p-6">To download or save a notice, click on the "Save" or "Download" button located on the notice page.</p>
                                    </div>
                                )}
                            </div>

                            {/* FAQ 4 */}
                            <div className={`border-b ${openIndex === 3 ? 'bg-gray-100' : ''}`}>
                                <div
                                    className="flex justify-between items-center cursor-pointer py-4 p-6"
                                    onClick={() => toggleFAQ(3)}
                                >
                                    <h2 className="text-lg font-semibold text-[#001A3B]">
                                        How long does it take for a notice to be approved?
                                    </h2>
                                    <span className="text-[#A99067]">{openIndex === 3 ? <FaChevronUp /> : <FaChevronDown />}</span>
                                </div>
                                {openIndex === 3 && (
                                    <div className="text-[#001A3B]">
                                        <p className="p-6 py-2">It typically takes 1-2 business days for a notice to be reviewed and approved by our team.</p>
                                    </div>
                                )}
                            </div>

                            {/* FAQ 5 */}
                            <div className={`border-b ${openIndex === 4 ? 'bg-gray-100' : ''}`}>
                                <div
                                    className="flex justify-between items-center cursor-pointer py-4 p-6"
                                    onClick={() => toggleFAQ(4)}
                                >
                                    <h2 className="text-lg font-semibold text-[#001A3B]">
                                        Can I meet the team members and the Senior Consultant?
                                    </h2>
                                    <span className="text-[#A99067]">{openIndex === 4 ? <FaChevronUp /> : <FaChevronDown />}</span>
                                </div>
                                {openIndex === 4 && (
                                    <div className="text-[#001A3B]">
                                        <p className="p-6 py-2">Yes, you can schedule a meeting with our team or the Senior Consultant by contacting us through the platform.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>


                
                <div className="grid md:grid-cols-3 gap-6 mt-12">
                    {/* Technical Support Card */}
                    {/* <div className="bg-[#b8d7f4] rounded-xl p-6 text-center shadow-md transition-all duration-300 hover:scale-103 hover:bg-[#004b80] hover:text-white">
                        <h3 className="text-xl font-bold mb-4">Technical Support</h3>
                        <p className="mb-4">Get help with product issues and technical difficulties</p>
                        <a href="#" className="inline-block px-4 py-2 bg-white text-[#004b80] font-semibold rounded hover:bg-[#e3ecfb] transition-colors">
                            Get Help
                        </a>
                    </div> */}

                    {/* Billing Inquiries Card */}
                    {/* <div className="bg-[#b8d7f4] rounded-xl p-6 text-center shadow-md transition-all duration-300 hover:scale-103 hover:bg-[#004b80] hover:text-white">
                        <h3 className="text-xl font-bold mb-4">Billing Inquiries</h3>
                        <p className="mb-4">Questions about your invoice or payment options</p>
                        <a href="#" className="inline-block px-4 py-2 bg-white text-[#004b80] font-semibold rounded hover:bg-[#e3ecfb] transition-colors">
                            Inquire Now
                        </a>
                    </div> */}

                    {/* General Information Card */}
                    {/* <div className="bg-[#b8d7f4] rounded-xl p-6 text-center shadow-md transition-all duration-300 hover:scale-103 hover:bg-[#004b80] hover:text-white">
                        <h3 className="text-xl font-bold mb-4">General Information</h3>
                        <p className="mb-4">Learn more about our services and offerings</p>
                        <a href="#" className="inline-block px-4 py-2 bg-white text-[#004b80] font-semibold rounded hover:bg-[#e3ecfb] transition-colors">
                            Learn More
                        </a>
                    </div> */}
                </div>
            </div>

            {/* Floating Chat Button */}
            {/* <div className="fixed bottom-8 right-8 w-16 h-16 bg-[#004b80] rounded-full flex justify-center items-center text-white shadow-lg cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-blue-700">
                <ChatIcon />
            </div> */}
            <Footer />
        </div>

    );
};

export default HelpDeskContactPage;