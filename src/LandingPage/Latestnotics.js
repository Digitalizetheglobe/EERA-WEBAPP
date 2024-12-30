import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import axios from "axios";
import defaultImage from "../assets/banner/latestnotics1.png"; 
import { Link } from "react-router-dom";

const LatestNotices = () => {
  const [notices, setNotices] = useState([]); 
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get("https://api.epublicnotices.in/notices");
        setNotices(response.data.slice(0, 5)); 
      } catch (error) {
        console.error("Error fetching notices:", error);
      }
    };

    fetchNotices();
  }, []);

  // Number of cards per slide
  const cardsPerSlide = 3;
  const totalSlides = Math.ceil(notices.length / cardsPerSlide);

  // Handle navigation
  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  return (
    <div className="bg-[#E5EAEE] px-10 py-8">
      {/* Heading */}
      <div className="flex items-center space-x-2 font-bold ">
        <h1 className="text-4xl text-[#001A3B]">Latest</h1>
        <h1 className="text-4xl text-[#A99067]">Notices</h1>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-end items-center mb-4 space-x-2">
        <button
          onClick={handlePrev}
          disabled={currentSlide === 0}
          className={`flex items-center justify-center w-10 h-10 bg-white rounded-full shadow cursor-pointer ${currentSlide === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          <FiChevronLeft className="text-[#A99067] text-2xl" />
        </button>
        <button
          onClick={handleNext}
          disabled={currentSlide === totalSlides - 1}
          className={`flex items-center justify-center w-10 h-10 bg-white rounded-full shadow cursor-pointer ${currentSlide === totalSlides - 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          <FiChevronRight className="text-[#A99067] text-2xl" />
        </button>
      </div>

      {/* Card Slider */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {notices.map((notice, index) => (
            <div key={index} className="w-full md:w-1/3 flex-shrink-0 px-2">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
                <img
                  src={notice.image || defaultImage} 
                  alt={notice.notice_title || "Default Notice"}
                  className="w-full h-40 object-cover"
                />
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-xl font-semibold text-[#001A3B] mb-2">
                    {notice.notice_title}
                  </h2>
                  <div className="flex items-center text-sm text-gray-500 space-x-4 mb-4">
                    <span>{new Date(notice.date).toLocaleDateString()}</span>
                    <span>{notice.location}</span>
                  </div>
                  <p className="text-gray-600 mb-6">
                    {notice.notice_description
                      ? notice.notice_description.split(' ').slice(0, 40).join(' ') + '...'
                      : ''}
                  </p>

                  <div className="flex justify-between mt-auto">
                    <Link to={`/notices/${notice.id}`} className="bg-[#001A3B] text-white px-4 py-2 rounded">
                      Read Notice
                    </Link>
                    <button className="text-[#A99067] border border-[#A99067] px-4 py-2 rounded">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestNotices;
