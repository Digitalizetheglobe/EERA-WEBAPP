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
import Webheader from "./Webheader";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import axios from "axios";
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
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get("https://api.epublicnotices.in/notices");

        // Sort notices by date in descending order
        const sortedNotices = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));

        setNotices(sortedNotices.slice(0, 6)); // Keep only the latest 5 notices
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

  const downloadAsPDF = () => {
    if (notice && notice.notices_images) {
      const pdf = new jsPDF();
      const imgUrl = `https://api.epublicnotices.in/noticesimage/${notice.notices_images}`;
      const imgWidth = 190;
      const imgHeight = 160;

      pdf.text("Source : - EERA epublicnotices.in", 10, 10);
      pdf.addImage(imgUrl, "JPEG", 10, 20, imgWidth, imgHeight);
      pdf.save("notice.pdf");
      toast.success("Notice downloaded successfully!");
    } else {
      toast.error("Notice image not available");
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
  const cardsPerSlide = 2;
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
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!notice) return <p>Notice not found</p>;

  return (
    <>
      <Webheader />
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
              </div>
            </section>
          </div>
        </div>

        {/* Similar Notices Section */}
          <div className="bg-[#E5EAEE] px-10 py-8">
              {/* Heading */}
              <div className="flex items-center space-x-2 font-bold ">
                <h1 className="text-4xl text-[#001A3B]">Similar</h1>
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
                          src={`https://api.epublicnotices.in/noticesimage/${notice.notices_images}`} 
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