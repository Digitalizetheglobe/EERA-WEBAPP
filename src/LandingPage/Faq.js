import React, { useState } from 'react';
import faq from '../assets/banner/Faq.png'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Faq = () => {
    const [openIndex, setOpenIndex] = useState(0);
  
    const toggleFAQ = (index) => {
      setOpenIndex(openIndex === index ? null : index);
    };
  
    return (
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 bg-[#F6F8FA] p-10">
        {/* Left Side: Image and Heading */}
        <div className="flex flex-col space-y-6 w-full md:w-1/2 p-8">
          <h1 className="text-4xl font-bold text-[#001A3B]">Frequently Asked Questions </h1>
          <p className='text-4xl font-bold text-[#A99067]'>(FAQ)</p>
          <p className="text-lg font-semibold text-gray-600">
            We address some of the most common questions about our team, services, and approach to care.
          </p>
          <img
            src={faq}
            alt="FAQ"
            className="w-full "
          />
        </div>
  
        {/* Right Side: FAQ Accordion */}
        <div className="w-full md:w-1/2 p-6 ">
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
    );
  };
  
export default Faq;