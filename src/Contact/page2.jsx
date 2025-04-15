import React, { useState, useEffect } from 'react';
import Header from '../Webapp/Home/HomeHeader';
import Footer from '../LandingPage/Footer';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

// Initialize EmailJS
emailjs.init("F-yH4f6cqJ3iC_L6z");

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
    <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
);

const MessageIcon = () => (
    <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
);

const UserIcon = () => (
    <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

const HelpDeskContactPage = () => {
    const [openIndex, setOpenIndex] = useState(0);
    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        department: 'general'
    });

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const templateParams = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                subject: formData.subject,
                message: formData.message,
                department: formData.department,
                time: new Date().toLocaleString()
            };

            const response = await emailjs.send(
                'service_3h6fhwq',
                'template_43u0ivp',
                templateParams
            );

            if (response.status === 200) {
                setFormSubmitted(true);
                
                // Reset form after 3 seconds
                setTimeout(() => {
                    setFormSubmitted(false);
                    setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        subject: '',
                        message: '',
                        department: 'general'
                    });
                }, 3000);
            } else {
                throw new Error('Failed to send email');
            }
        } catch (err) {
            console.error('Error sending email:', err);
            setError('Failed to send message. Please try again later or contact support directly.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#e3ecfb] text-[#004b80]">
            <Header />
            {/* Header */}
            <div className=" py-6 px-4 text-center ">
                <h1 className="text-6xl font-bold">Contact Us</h1>
                <p className="mt-2">We're here to assist you!</p>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8 md:px-8">
                <h2 className="text-3xl font-bold pb-2 border-b-4 border-[#b8d7f4] inline-block">Help Desk</h2>

                {/* Contact Info and Map Section */}
                <div className="flex flex-col lg:flex-row gap-8 mt-7">

                    {/* Contact Info Card */}
                    <div className="bg-white rounded-2xl pt-8 pl-8 shadow-lg transition-transform duration-300 hover:-translate-y-1 lg:w-1/3">

                        {/* Address Section */}
                        <div className="mb-8">
                            <h3 className="flex items-center text-xl font-semibold text-[#004b80] mb-2">
                                <LocationIcon />
                                Our Address
                            </h3>
                            <p className="ml-8 text-gray-700 leading-relaxed">
                                Kohinoor World Tower, <br />
                                Pune, Maharashtra,<br />
                                411018<br />

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
                                    contact@epublicnotices.in
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
                        </div>

                        {/* Hours Section */}
                        <div>
                            <h3 className="flex items-center text-xl font-semibold text-[#004b80] mb-2">
                                <CalendarIcon />
                                Hours
                            </h3>
                            <div className="ml-8 text-gray-700">
                                <div className="flex justify-between max-w-xs">
                                    <span className="font-medium">Monday - Friday :</span>
                                    <span>9AM - 6PM IST</span>
                                </div>
                                <div className="flex justify-between max-w-xs mt-2">
                                    <span className="font-medium">Saturday :</span>
                                    <span>10AM - 4PM IST</span>
                                </div>
                                <div className="flex justify-between max-w-xs mt-2">
                                    <span className="font-medium">Sunday :</span>
                                    <span className="text-red-500">Closed</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form Section - MOVED HERE FROM BELOW */}
                    <div className="lg:w-2/3">
                        <h2 className="text-3xl font-bold pb-2 border-b-4 border-[#b8d7f4] inline-block mb-6">
                            Send Us a Message
                        </h2>

                        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
                            {formSubmitted ? (
                                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-green-800 mb-2">Message Sent Successfully!</h3>
                                    <p className="text-green-700">Thank you for reaching out. Our team will get back to you shortly.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {error && (
                                        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-center">
                                            <p className="text-red-700">{error}</p>
                                        </div>
                                    )}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {/* Left column */}
                                        <div className="space-y-6">
                                            {/* Name field */}
                                            <div>
                                                <label htmlFor="name" className="flex items-center text-base font-medium text-[#001A3B] mb-2">
                                                    <UserIcon />
                                                    Your Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b8d7f4] focus:border-[#004b80] transition-colors"
                                                    placeholder="John Doe"
                                                />
                                            </div>

                                            {/* Email field */}
                                            <div>
                                                <label htmlFor="email" className="flex items-center text-base font-medium text-[#001A3B] mb-2">
                                                    <EmailIcon />
                                                    Your Email
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b8d7f4] focus:border-[#004b80] transition-colors"
                                                    placeholder="john.doe@example.com"
                                                />
                                            </div>

                                            {/* Phone field */}
                                            <div>
                                                <label htmlFor="phone" className="flex items-center text-base font-medium text-[#001A3B] mb-2">
                                                    <PhoneIcon />
                                                    Phone Number
                                                </label>
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b8d7f4] focus:border-[#004b80] transition-colors"
                                                    placeholder="+91 1234567890"
                                                />
                                            </div>

                                            {/* Department field */}
                                            <div>
                                                <label htmlFor="department" className="flex items-center text-base font-medium text-[#001A3B] mb-2">
                                                    Department
                                                </label>
                                                <select
                                                    id="department"
                                                    name="department"
                                                    value={formData.department}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b8d7f4] focus:border-[#004b80] transition-colors"
                                                >
                                                    <option value="general">General Inquiry</option>
                                                    <option value="technical">Technical Support</option>
                                                    <option value="billing">Billing & Payments</option>
                                                    <option value="notices">Notice Publishing</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Right column */}
                                        <div className="space-y-6">
                                            {/* Subject field */}
                                            <div>
                                                <label htmlFor="subject" className="flex items-center text-base font-medium text-[#001A3B] mb-2">
                                                    <ChatIcon />
                                                    Subject
                                                </label>
                                                <input
                                                    type="text"
                                                    id="subject"
                                                    name="subject"
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b8d7f4] focus:border-[#004b80] transition-colors"
                                                    placeholder="How can we help you?"
                                                />
                                            </div>

                                            {/* Message field */}
                                            <div>
                                                <label htmlFor="message" className="flex items-center text-base font-medium text-[#001A3B] mb-2">
                                                    <MessageIcon />
                                                    Your Message
                                                </label>
                                                <textarea
                                                    id="message"
                                                    name="message"
                                                    rows="9"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b8d7f4] focus:border-[#004b80] transition-colors resize-none"
                                                    placeholder="Please describe your inquiry in detail..."
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Submit button */}
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className={`px-8 py-3 bg-[#004b80] text-white font-semibold rounded-lg shadow-md hover:bg-[#003b66] transform transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#b8d7f4] focus:ring-opacity-50 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            {isSubmitting ? 'Sending...' : 'Send Message'}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>

                {/* Map Section - MOVED HERE FROM ABOVE */}
                <div className="mt-12">
                    <h2 className="text-3xl font-bold pb-2 border-b-4 border-[#b8d7f4] inline-block mb-6">Our Location</h2>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg h-full min-h-96">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.650343622792!2d73.79664587519447!3d18.6347903824811!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b92d986822d9%3A0x13b0437cbf911d4a!2sKohinoor%20World%20Towers!5e0!3m2!1sen!2sin!4v1739359789161!5m2!1sen!2sin&z=15"
                            width="100%"
                            height="400"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>

                {/* FAQ Section */}
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
            </div>
            <Footer />
        </div>
    );
};

export default HelpDeskContactPage;