import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import axios from "axios";
import defaultImage from "../assets/banner/latestnotics1.png";
import { Link } from "react-router-dom";

const LatestNotices = () => {
  const [notices, setNotices] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 768;
      setIsMobile(newIsMobile);
      // Reset current slide when switching between mobile and desktop
      setCurrentSlide(0);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get("https://api.epublicnotices.in/notices");
        const sortedNotices = response.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setNotices(sortedNotices.slice(0, 6));
      } catch (error) {
        console.error("Error fetching notices:", error);
      }
    };

    fetchNotices();
  }, []);

  // Responsive cards per slide
  const cardsPerSlide = isMobile ? 1 : 3;
  const totalSlides = Math.ceil(notices.length / cardsPerSlide);

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

  // Updated to properly handle single card movement on mobile and 3 cards on web
  const calculateSlideTransform = () => {
    if (isMobile) {
      // For mobile: move exactly one card at a time
      return currentSlide * (100 / notices.length);
    } else {
      // For desktop: move exactly 3 cards at a time
      return currentSlide * (300 / notices.length);
    }
  };

  return (
    <div className="bg-[#E5EAEE] px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8">
      {/* Heading */}
      <div className="flex items-center space-x-2 font-bold mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-[#001A3B]">Latest</h1>
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-[#A99067]">Notices</h1>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-end items-center mb-4 space-x-2">
        <button
          onClick={handlePrev}
          disabled={currentSlide === 0}
          className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full shadow transition-opacity hover:bg-gray-50 ${
            currentSlide === 0 ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"
          }`}
          aria-label="Previous slide"
        >
          <FiChevronLeft className="text-[#A99067] text-xl sm:text-2xl" />
        </button>
        <button
          onClick={handleNext}
          disabled={currentSlide === totalSlides - 1}
          className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full shadow transition-opacity hover:bg-gray-50 ${
            currentSlide === totalSlides - 1 ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"
          }`}
          aria-label="Next slide"
        >
          <FiChevronRight className="text-[#A99067] text-xl sm:text-2xl" />
        </button>
      </div>

      {/* Card Slider - Updated with slower transition */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform ease-in-out"
          style={{
            transform: `translateX(-${calculateSlideTransform()}%)`,
            width: `${notices.length * (100 / cardsPerSlide)}%`,
            transitionDuration: "1500ms", // Slower transition (1.5 seconds)
          }}
        >
          {notices.map((notice, index) => (
            <div
              key={index}
              style={{ width: `${100 / notices.length}%` }}
              className="px-2"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
                <div className="relative pt-[60%] sm:pt-[50%] overflow-hidden">
                  <img
                    src={`https://api.epublicnotices.in/noticesimage/${notice.notices_images}`}
                    alt={notice.notice_title || "Notice image"}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = defaultImage;
                    }}
                  />
                </div>
                <div className="p-4 sm:p-6 flex flex-col flex-grow">
                  <h2 className="text-lg sm:text-xl font-semibold text-[#001A3B] mb-2 line-clamp-2">
                    {notice.notice_title}
                  </h2>
                  <div className="flex flex-wrap items-center text-xs sm:text-sm text-gray-500 gap-2 sm:gap-4 mb-3 sm:mb-4">
                    <span>{new Date(notice.date).toLocaleDateString()}</span>
                    {notice.location && <span>{notice.location}</span>}
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 line-clamp-3">
                    {notice.notice_description || ''}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-auto">
                    <Link
                      to={`/notices/${notice.id}`}
                      className="flex-1 bg-[#001A3B] text-white px-4 py-2 rounded text-center text-sm sm:text-base 
                                hover:bg-[#002a5c] transition-transform transform hover:scale-105"
                    >
                      Read Notice
                    </Link>
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