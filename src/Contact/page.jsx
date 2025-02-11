import React from "react";
import Homeheader from "../Webapp/Notices/Homewebheader";
import { Link } from "react-router-dom";

const ContactPage = () => {
  return (
    <div className="min-h-[350px] bg-[#001A3B] relative mx-auto">
      {/* Navigation */}
      <Homeheader />
      <main className="max-w-[1400px] mt-12">
        {/* Left Column - Text Content */}
        <div className="flex justify-start translate-x-30">
        <div className="text-white px-10 py-10 w-1/2">
          <p className="text-sm uppercase tracking-widest opacity-70">Contact Us</p>
          <h1 className="text-4xl font-light mt-2">
            <em className="block">Work for yourself</em>
            <span className="block">not by yourself,</span>
            <span className="block">with Gaspar insurance</span>
          </h1>
          <p className="text-lg opacity-80 mt-4">
            <span className="block">Send us a message and we’ll get your questions </span>
            <span className="block">answered as soon as possible.</span>
          </p>
          <div className="flex items-center gap-6 mt-6">
            <button className="bg-[#A99067] text-white font-bold py-2 px-6 rounded-full">
              Find an agent
            </button>
            <a href="tel:8183023060" className="text-white text-lg flex items-center">
              📞 818.302.3060
            </a>
          </div>
        </div>
        </div>
        
        {/* Right Column - Form */}
        
      </main>
      <div className="mt-14 absolute right-4 top-0 z-10 bg-white rounded-lg shadow-lg p-10 md:w-1/3">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm text-gray-700">Name*</label>
              <input type="text" required className="mt-1 w-full px-3 py-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Email address*</label>
              <input type="email" required className="mt-1 w-full px-3 py-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Phone number*</label>
              <input type="tel" required className="mt-1 w-full px-3 py-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block text-sm text-gray-700">City</label>
              <input type="text" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded" />
            </div>

            <div>
              <label className="block text-sm text-gray-700">Message</label>
              <textarea rows={4} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded"></textarea>
            </div>
            <button type="submit" className="px-6 py-2 bg-[#A99067] text-white rounded-full hover:bg-gray-800">
              Submit
            </button>
          </form>

        </div>
      {/* Bottom Sections */}
      <div className="bg-white p-10 mt-24">
        <div>
          <h2 className="text-xl font-semibold mb-4">General inquiries</h2>
          <p className="text-gray-600">
            Reach us at{" "}
            <Link to="mailto:info@gasparinsurance.com" className="text-[#1C2434] hover:underline">
              info@gasparinsurance.com
            </Link>{" "}
            and we will get back to you asap
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2 mt-4">Working at Gaspar?</h2>
          <p className="text-gray-600">
            Visit our careers page or send us an email at{" "}
            <Link to="mailto:careers@gasparinsurance.com" className="text-[#1C2434] hover:underline">
              careers@gasparinsurance.com
            </Link>
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2 mt-4">Insurance agent?</h2>
          <p className="text-gray-600">
            Become an insurance agent by contacting us at{" "}
            <Link to="mailto:agents@gaspar.com" className="text-[#1C2434] hover:underline">
              agents@gaspar.com
            </Link>
          </p>
        </div>
        <div>
          <p className="text-sm font-medium mb-2 mt-4">Follow us</p>
          <div className="flex space-x-4">
            <Link to="#" className="text-gray-600 hover:text-[#1C2434]">
              Facebook
            </Link>
            <Link to="#" className="text-gray-600 hover:text-[#1C2434]">
              Instagram
            </Link>
            <Link to="#" className="text-gray-600 hover:text-[#1C2434]">
              Twitter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
