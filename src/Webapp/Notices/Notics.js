import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import save from "../../assets/logo/save.png";
import download from "../../assets/logo/download.png";
// import arrow from "../../assets/logo/arrow-right(1) 1.png";
import Footer from "../../LandingPage/Footer";
import WebFooter from "./WebFooter";
import Webheader from "./Webheader";
import arrow from '../../assets/logo/arrow.png';

const Notice = () => {


  const { id } = useParams(); // Get the notice ID from the URL
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // State to track which detail is selected
  const [activeSection, setActiveSection] = useState("details");

  // Function to handle section click
  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  const sections = [
    { id: "details", label: "Details" },
    { id: "date", label: "Date: 2024-07-25" },
    { id: "time", label: "Time: 9:00 AM to 12:00 PM" },
    { id: "location", label: "Location: Hingewadi, Pune" },
    {
      id: "venue",
      label: "Venue: Hingewadi Industrial Estate, Conference Room",
    },
  ];


  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await fetch(`http://api.epublicnotices.in/notices/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch notice details");
        }
        const data = await response.json();
        setNotice(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchNotice();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <Webheader />
      <nav className="bg-gray-100 py-2 px-4 text-sm flex items-center space-x-2">
          <div className="flex items-center space-x-2 mr-6">
            <Link to='/home' href="#" className="text-[#004B80] flex items-center space-x-2">
              <img src={arrow} className="w-3 h-3" alt="Back Arrow" />
              <span>Back</span>
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <Link to='/home' className="text-gray-500">Home</Link>
            <span className="text-gray-400">&gt;</span>
            <a href="#" className="text-gray-500">Featured</a>
            <span className="text-gray-400">&gt;</span>
            <a href="#" className="text-[#004B80]">Notices </a>
          </div>
        </nav>
      <section className="p-8 max-w-4xl mx-auto bg-white space-y-6">
        {/* Heading above Real Estate Badge */}
        <button className="text-[#A99067] border border-[#A99067] rounded-full px-3 py-1 text-md font-medium">
          Real estate
        </button>

        <h1 className="text-[#004B80] text-4xl font-semibold">
          {notice.notice_title}
        </h1>
        <p className="text-[#004B80] text-md font-semibold">
          {new Date(notice.date).toLocaleDateString()} • {new Date(notice.date).toLocaleTimeString()}
        </p>

        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8">
          {/* Left Section: Meeting Details with Interactive Progress Bar */}
          <div className="lg:w-1/3 flex space-x-4">
            {/* Vertical Progress Bar with indicator */}
            <div className="relative">
              {sections.map((section, index) => (
                <div
                  key={section.id}
                  onClick={() => handleSectionClick(section.id)}
                  className="cursor-pointer relative z-10 flex items-center"
                >
                  <p
                    className={`pl-6 mb-4 ${activeSection === section.id
                        ? "text-gray-800 font-bold"
                        : "text-gray-600"
                      }`}
                  >
                    {section.label}
                  </p>
                  {/* Progress indicator for active section */}
                  {activeSection === section.id && (
                    <div
                      className="absolute left-0 w-[4px] h-full bg-[#A99067] rounded transition-all duration-300"
                      style={{ height: "100%", top: "0" }}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Section: Main Content */}
          <div className="lg:w-2/3 space-y-6">
            {/* About Meeting */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800">About Notice</h3>
              <p className="text-gray-600 text-justify">{notice.notice_description}</p>
            </div>

            {/* Lawyer Details */}
            <div className="border-t border-gray-300 pt-4 space-y-3">
              <h3 className="text-lg font-semibold text-gray-800">
                {/* Lawyer  */}
                More Details
              </h3>
              <div className="text-gray-600">
                {/* <p>
                  <strong>Lawyer Name:</strong> {notice.lawyer_name}
                </p> */}
                <p>
                  <strong>Location:</strong> {notice.location}
                </p>
                <p>
                  <strong>Address:</strong> {notice.address || "Not available"}
                </p>
                {/* <p className="mt-4">
                  Your input is vital in ensuring that the factory operates in an
                  environmentally responsible manner. Please join us to make your
                  voice heard.
                </p> */}
              </div>
            </div>

            {/* Footer Action Buttons */}
            <div className="flex space-x-4 pt-4">
              <button className="bg-[#A99067] text-white px-6 py-2 rounded-md font-medium hover:bg-[#8c6f42] transition flex items-center space-x-2">
                <span>Take Action</span>
                <img src={arrow} className="w-4 h-4 ml-1" alt="Arrow icon" />
              </button>
              <button className="border border-[#A99067] px-4 py-2 rounded-md hover:bg-gray-100 transition">
                <img src={save} className="w-4 h-4" />
              </button>
              <button className="border border-[#A99067] px-4 py-2 rounded-md hover:bg-gray-100 transition">
                <img src={download} className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
      <WebFooter />
    </>
  );
};

export default Notice;
