import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LocationsCarousel = () => {
  const [locations, setLocations] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setCurrentSlide(0);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch location data
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get("https://api.epublicnotices.in/notices");

        const locationMap = new Map();

        response.data.forEach((notice) => {
          if (notice.location?.trim()) {
            if (!locationMap.has(notice.location)) {
              locationMap.set(notice.location, { count: 0 });
            }
            locationMap.get(notice.location).count += 1;
          }
        });

        const locationArray = Array.from(locationMap, ([name, data]) => ({
          name,
          count: data.count,
        }));

        setLocations(locationArray);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  const cardsPerSlide = isMobile ? 1 : 4;
  const totalSlides = Math.ceil(locations.length / cardsPerSlide);

  const handleNext = () => {
    if (currentSlide < totalSlides - 1) setCurrentSlide(currentSlide + 1);
  };

  const handlePrev = () => {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  };

  const handleLocationClick = (location) => {
    navigate(`/locations/${encodeURIComponent(location)}`);
  };

  // Updated to properly handle single card movement on mobile and 4 cards on web
  const calculateSlideTransform = () => {
    if (isMobile) {
      // For mobile: move exactly one card at a time
      return currentSlide * (100 / locations.length);
    } else {
      // For desktop: move exactly 4 cards at a time
      return currentSlide * (400 / locations.length);
    }
  };

  return (
    <div className="bg-[#E5EAEE] px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8">
      {/* Heading */}
      <div className="flex items-center space-x-2 font-bold mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-[#001A3B]">Browse by</h1>
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-[#A99067]">Locations</h1>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-end items-center mb-4 space-x-2">
        <button
          onClick={handlePrev}
          disabled={currentSlide === 0}
          className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full shadow transition-opacity hover:bg-gray-50 ${
            currentSlide === 0 ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"
          }`}
        >
          <FiChevronLeft className="text-[#A99067] text-xl sm:text-2xl" />
        </button>
        <button
          onClick={handleNext}
          disabled={currentSlide === totalSlides - 1}
          className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full shadow transition-opacity hover:bg-gray-50 ${
            currentSlide === totalSlides - 1 ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"
          }`}
        >
          <FiChevronRight className="text-[#A99067] text-xl sm:text-2xl" />
        </button>
      </div>

      {/* Card Slider - Updated with slower transition */}
      {locations.length > 0 ? (
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${calculateSlideTransform()}%)`,
              width: `${locations.length * (100 / cardsPerSlide)}%`,
              transitionDuration: "500ms", // Slower transition (1.5 seconds)
            }}
          >
            {locations.map((location, index) => (
              <div
                key={index}
                style={{
                  width: `${100 / locations.length}%`,
                }}
                className="px-2"
              >
                <div className="cursor-pointer" onClick={() => handleLocationClick(location.name)}>
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden h-48 flex flex-col justify-center items-center p-6 group hover:bg-gray-50 transition-colors duration-300">
                    <h2 className="text-xl sm:text-2xl font-semibold text-[#001A3B] mb-2 text-center">{location.name}</h2>
                    <span className="text-sm sm:text-base text-gray-600 mb-4">{location.count} notices available</span>
                    <div className="inline-block bg-[#A99067] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#8A7549] transition-colors duration-200">
                      View Notices
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-600">Loading locations...</p>
        </div>
      )}
    </div>
  );
};

export default LocationsCarousel;