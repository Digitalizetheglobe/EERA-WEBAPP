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
                setNotices(sortedNotices.slice(0, 8)); // Get 8 notices to have enough cards
            } catch (error) {
                console.error("Error fetching notices:", error);
            }
        };

        fetchNotices();
    }, []);

    // Responsive cards per slide
    const cardsPerSlide = isMobile ? 1 : 4;
    // Calculate total slides properly based on cards per slide
    const totalSlides = Math.max(1, Math.ceil(notices.length / cardsPerSlide));

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

    // Fixed height based on device
    const cardHeight = isMobile ? "400px" : "400px";

    // Calculate the correct transform percentage for sliding
    const calculateSlideTransform = () => {
        // Calculate percentage for each card
        const cardWidthPercent = 100 / notices.length;
        
        // Move by number of cards per slide
        return currentSlide * (cardWidthPercent * cardsPerSlide);
    };

    // Calculate correct width for the slider container
    const calculateSliderWidth = () => {
        return `${(notices.length / cardsPerSlide) * 100}%`;
    };

    // Calculate width for each card
    const calculateCardWidth = () => {
        return `${100 / notices.length}%`;
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

            {/* Card Slider */}
            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-1000 ease-in-out" /* Increased duration from 500ms to 1000ms for slower movement */
                    style={{
                        transform: `translateX(-${calculateSlideTransform()}%)`,
                        width: calculateSliderWidth()
                    }}
                >
                    {notices.map((notice, index) => (
                        <div
                            key={index}
                            style={{ width: calculateCardWidth() }}
                            className="px-2"
                        >
                            <Link to={`/notices/${notice.id}`} className="block">
                                <div
                                    className="bg-white rounded-lg shadow-lg overflow-hidden relative group"
                                    style={{ height: cardHeight }}
                                >
                                    {/* Image takes up the entire card */}
                                    <div className="h-full w-full relative">
                                        <img
                                            src={`https://public-notices-bucket.s3.ap-south-1.amazonaws.com/${notice.notices_images}`}
                                            alt={notice.notice_title || "Notice image"}
                                            className="w-full h-full object-cover object-top"
                                            onError={(e) => {
                                                e.target.src = defaultImage;
                                            }}
                                        />
                                        {/* Full-image overlay with black background on hover (desktop only) */}
                                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 hidden md:block"></div>
                                    </div>

                                    {/* Desktop: Overlay content that appears on hover */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 sm:p-6 
                                  transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out
                                  hidden md:block z-10">
                                        <h2 className="text-lg sm:text-xl font-semibold text-white mb-2 line-clamp-2">
                                            {notice.notice_title}
                                        </h2>
                                        <div className="flex flex-wrap items-center text-xs sm:text-sm text-gray-200 gap-2 sm:gap-4">
                                            <span>{new Date(notice.date).toLocaleDateString()}</span>
                                            {notice.location && <span>{notice.location}</span>}
                                        </div>
                                        <Link to={`/notices/${notice.id}`} className="mt-2 inline-block bg-[#A99067] text-white px-4 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">Read More</Link>
                                    </div>

                                    {/* Mobile: Always visible overlay at bottom */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4
                                  md:hidden">
                                        <h2 className="text-base font-semibold text-white mb-1 line-clamp-2">
                                            {notice.notice_title}
                                        </h2>
                                        <div className="flex flex-wrap items-center text-xs text-gray-200 gap-2">
                                            <span>{new Date(notice.date).toLocaleDateString()}</span>
                                            {notice.location && <span>{notice.location}</span>}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LatestNotices;