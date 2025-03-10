import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import jsPDF from "jspdf";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import save from "../../assets/logo/save.png";
import download from "../../assets/logo/download.png";
import arrow from "../../assets/logo/arrow.png";
import Footer from "../../LandingPage/Footer";
import WebFooter from "./WebFooter";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import axios from "axios";
import defaultImage from "../../assets/banner/latestnotics1.png"
import Header from "../Home/HomeHeader";

const Notice = () => {
  const { id } = useParams();
  const [notice, setNotice] = useState(null);
  const [similarNotices, setSimilarNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomPoint, setZoomPoint] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  const imageRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [notices, setNotices] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get("https://api.epublicnotices.in/notices");

        // Sort notices by date in descending order
        const sortedNotices = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));

        setNotices(sortedNotices.slice(0, 12)); // Get more notices to have enough for slider
      } catch (error) {
        console.error("Error fetching notices:", error);
      }
    };

    fetchNotices();
    const fetchData = async () => {
      try {
        // Fetch current notice
        const noticeResponse = await fetch(`https://api.epublicnotices.in/notices/${id}`);
        if (!noticeResponse.ok) {
          throw new Error("Failed to fetch notice details");
        }
        const noticeData = await noticeResponse.json();
        setNotice(noticeData);

        // Fetch similar notices
        const similarResponse = await fetch('https://api.epublicnotices.in/notices');
        if (!similarResponse.ok) {
          throw new Error("Failed to fetch similar notices");
        }
        const similarData = await similarResponse.json();

        // Sort notices by date in descending order and filter out current notice
        const sortedAndFilteredNotices = similarData
          .filter(item => item.id !== id)
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 10);

        setSimilarNotices(sortedAndFilteredNotices);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollPosition =
        scrollContainerRef.current.scrollLeft +
        (direction === 'left' ? -scrollAmount : scrollAmount);

      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };
  
  const cardHeight = isMobile ? "400px" : "400px";
  
  // Define cards per slide
  const cardsPerSlide = isMobile ? 1 : 4;
  
  // Calculate total number of possible slides
  const totalSlides = Math.ceil(notices.length / cardsPerSlide);
  
  // Calculate how much to translate the slider
  const calculateSlideTransform = () => {
    return currentSlide * (100 / (notices.length / cardsPerSlide));
  };
  
  // const downloadAsPDF = () => {
  //   if (notice && notice.notices_images) {
  //     const pdf = new jsPDF();
  //     const imgUrl = `https://api.epublicnotices.in/noticesimage/${notice.notices_images}`;
  //     const imgWidth = 190;
  //     const imgHeight = 160;

  //     pdf.text("Source : - EERA epublicnotices.in", 10, 10);
  //     pdf.addImage(imgUrl, "JPEG", 10, 20, imgWidth, imgHeight);
  //     pdf.save("notice.pdf");
  //     toast.success("Notice downloaded successfully!");
  //   } else {
  //     toast.error("Notice image not available");
  //   }
  // };

  const downloadAsPDF = async () => {
    if (!notice || !notice.id) {
      toast.error("Invalid notice data");
      return;
    }
  
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("authToken");
  
    if (!user || !token) {
      toast.error("You need to log in to download notices!");
      return;
    }
  
    try {
      // Call API to record the download
      await axios.post(
        "https://api.epublicnotices.in/api/webuser/download-notice",
        { noticeId: notice.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      // Proceed with PDF generation
      const pdf = new jsPDF();
      const imgUrl = `https://api.epublicnotices.in/noticesimage/${notice.notices_images}`;
      const imgWidth = 190;
      const imgHeight = 160;
  
      pdf.text("Source : - EERA epublicnotices.in", 10, 10);
      pdf.addImage(imgUrl, "JPEG", 10, 20, imgWidth, imgHeight);
      pdf.save("notice.pdf");
  
      toast.success("Notice downloaded successfully!");
    } catch (error) {
      console.error("Error downloading notice:", error.response?.data || error.message);
      toast.error("Failed to record notice download. Please try again.");
    }
  };
  

  const handleImageClick = (e) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setZoomPoint({ x, y });
    setIsZoomed(!isZoomed);
  };

  const getTransformStyle = () => {
    if (!isZoomed) return { transform: 'scale(1)' };

    return {
      transform: `scale(2.5)`,
      transformOrigin: `${zoomPoint.x * 100}% ${zoomPoint.y * 100}%`
    };
  };

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
  
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-8 h-8 border-4 border-t-transparent border-[#001A3B] rounded-full animate-spin"></div>
      </div>
    );

  if (error) return <p className="text-red-500">{error}</p>;
  if (!notice) return <p>Notice not found</p>;

  const handleSaveNotice = async (id) => { 
    if (!id) {
      toast.error("Invalid notice ID!");
      return;
    }
  
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("authToken");
  
    if (!user || !token) {
      toast.error("You need to log in to save notices!");
      return;
    }
  
    console.log("Token being sent:", token);
  
    try {
      const response = await axios.post(
        "https://api.epublicnotices.in/api/webuser/save-notice",
        { noticeId: id, userId: user.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("Save Notice Response:", response.data);
  
      if (response.data.success) {
        toast.success("Notice saved successfully!");
      } else {
        toast.error(response.data.message || "Failed to save notice.");
      }
    } catch (error) {
      console.error("Error saving notice:", error.response?.data || error.message);
  
      if (error.response?.status === 401) {
        toast.error("Unauthorized! Please log in again.");
        localStorage.removeItem("authToken");
      } else {
        toast.error("Something went wrong! Please try again.");
      }
    }
  };
  
  
  
  return (
    <>
      <Header/>
      <ToastContainer />
      <nav className="bg-gray-100 py-2 px-4 text-sm flex items-center space-x-2">
        <div className="flex items-center space-x-2 mr-6">
          <Link to='/home' className="text-[#004B80] flex items-center space-x-2">
            <img src={arrow} className="w-3 h-3" alt="Back Arrow" />
            <span>Back</span>
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          <Link to='/home' className="text-gray-500">Home</Link>
          <span className="text-gray-400">&gt;</span>
          <a href="#" className="text-gray-500">Featured</a>
          <span className="text-gray-400">&gt;</span>
          <a href="#" className="text-[#004B80]">Notices</a>
        </div>
      </nav>

      <section className="py-8  max-w-6xl mx-auto bg-white space-y-6">
        <h1 className="text-[#004B80] text-4xl font-semibold">
          {notice.notice_title}
        </h1>

        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8">
          <div className="lg:w-1/2 bg-gray-100 flex justify-center items-start">
            <div
              className="relative bg-white shadow-md mt-5 rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
              onClick={() => setIsModalOpen(true)}
            >
              {notice.notices_images ? (
                <img
                  src={`https://api.epublicnotices.in/noticesimage/${notice.notices_images}`}
                  alt="Notice"
                  className="object-cover w-full h-64 sm:h-80 lg:h-96"
                />
              ) : (
                <div className="flex items-center justify-center h-64 sm:h-80 lg:h-96 bg-gray-100">
                  <span className="text-gray-400">Image not available</span>
                </div>
              )}
            </div>
          </div>

          <div className="lg:w-2/3 space-y-6">
            <div className="space-y-3">
              <span className="text-[#A99067] border border-[#A99067] rounded-full mt-10 px-3 py-1 text-md font-medium">
                {new Date(notice.date).toLocaleDateString()}
              </span>
              <span className="text-[#A99067] border border-[#A99067] rounded-full px-3 ml-2 py-1 text-md font-medium">
                {notice.location}
              </span>
              <span className="text-[#A99067] border border-[#A99067] rounded-full px-3 py-1 ml-2 text-md font-medium">
                {notice.newspaper_name}
              </span>
            </div>

            <section className=" max-w-6xl mx-auto bg-white space-y-6">
              <div className="border-t border-gray-300 pt-4 space-y-3">
                <p className="text-gray-700">
                  {showFullDescription ? notice.notice_description : `${notice.notice_description.slice(0, 150)}...`}
                </p>
                {notice.notice_description.length > 150 && (
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-[#A99067] font-medium hover:underline"
                  >
                    {showFullDescription ? "Read Less" : "Read More"}
                  </button>
                )}
              </div>
              <div className="flex space-x-4 ">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-[#A99067] text-white px-6 py-2 rounded-md font-medium hover:bg-[#8c6f42] transition"
                >
                  View Notice
                </button>
                <button onClick={downloadAsPDF} className="border border-[#A99067] px-4 py-2 rounded-md hover:bg-gray-100 transition">
                  <img src={download} className="w-4 h-4" alt="Download" />
                </button>
                <button onClick={() => handleSaveNotice(notice.id)}>Save Notice</button>

              </div>
            </section>
          </div>
        </div>

        {/* Similar Notices Section */}
        <div className="bg-[#E5EAEE] px-10 py-8">
          {/* Heading */}
          <div className="flex items-center space-x-2 font-bold mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl text-[#001A3B]">Similar</h1>
            <h1 className="text-2xl sm:text-3xl md:text-4xl text-[#A99067]">Notices</h1>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-end items-center mb-4 space-x-2">
            <button
              onClick={handlePrev}
              disabled={currentSlide === 0}
              className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full shadow transition-opacity hover:bg-gray-50 ${currentSlide === 0 ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"
                }`}
              aria-label="Previous slide"
            >
              <FiChevronLeft className="text-[#A99067] text-xl sm:text-2xl" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentSlide === totalSlides - 1}
              className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full shadow transition-opacity hover:bg-gray-50 ${currentSlide === totalSlides - 1 ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"
                }`}
              aria-label="Next slide"
            >
              <FiChevronRight className="text-[#A99067] text-xl sm:text-2xl" />
            </button>
          </div>

          {/* Card Slider */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * (100 / Math.ceil(notices.length / cardsPerSlide))}%)`,
                width: isMobile ? `${notices.length * 100}%` : `${notices.length * 25}%` // Each card takes 25% width on desktop (4 cards visible)
              }}
            >
              {notices.map((notice, index) => (
                <div
                  key={index}
                  style={{ width: isMobile ? '100%' : '25%' }} // 25% width means 4 cards visible at once
                  className="px-2"
                >
                  <Link to={`/notices/${notice.id}`} className="block">
                    <div
                      className="bg-white rounded-lg shadow-lg overflow-hidden relative group"
                      style={{ height: cardHeight }}
                    >
                      {/* Image takes up the entire card - object-top ensures cropping from the top */}
                      <div className="h-full w-full relative">
                        <img
                          src={`https://api.epublicnotices.in/noticesimage/${notice.notices_images}`}
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
      </section>

      {/* Zoom Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black flex justify-center items-center z-50 p-4">
          <div className="bg-white p-4 rounded-lg relative max-w-[90%] max-h-[90%] overflow-hidden">
            <button
              onClick={() => {
                setIsModalOpen(false);
                setIsZoomed(false);
              }}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl z-50"
            >
              &times;
            </button>
            <div className="flex justify-center overflow-hidden">
              <img
                ref={imageRef}
                src={`https://api.epublicnotices.in/noticesimage/${notice.notices_images}`}
                alt="Notice"
                className="max-w-full max-h-[80vh] transition-transform duration-300"
                style={{
                  ...getTransformStyle(),
                  cursor: isZoomed ? 'zoom-out' : 'zoom-in'
                }}
                onClick={handleImageClick}
              />
            </div>
          </div>
        </div>
      )}

      <WebFooter />
    </>
  );
};

export default Notice;