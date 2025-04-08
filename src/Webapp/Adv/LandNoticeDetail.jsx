import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import save from "../../assets/logo/save.png";
import download from "../../assets/logo/download.png";
import arrow from "../../assets/logo/arrow.png";
import WebFooter from "../Notices/WebFooter";
import axios from "axios";
import Header from "../Home/HomeHeader";
import jsPDF from "jspdf";

const LandNoticeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomPoint, setZoomPoint] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  const imageRef = useRef(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.epublicnotices.in/api/land-notices/approved/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch notice details");
        }
        const data = await response.json();

        // Check if data exists and has the expected structure
        if (data && data.notice) {
          setNotice(data.notice);
        } else {
          throw new Error("Invalid notice data structure");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching notice:", err);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

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

      const pdf = new jsPDF();
      const imgUrl = notice.notice_image;
      const imgWidth = 190;
      const imgHeight = 160;

      pdf.text("Source : - EERA epublicnotices.in", 10, 10);
      pdf.addImage(imgUrl, "JPEG", 10, 20, imgWidth, imgHeight);
      pdf.save("land-notice.pdf");

      toast.success("Notice downloaded successfully!");
    } catch (error) {
      console.error(
        "Error downloading notice:",
        error.response?.data || error.message
      );
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

  const handleZoomIn = () => {
    if (!isZoomed) {
      setZoomPoint({ x: 0.5, y: 0.5 });
      setIsZoomed(true);
    }
  };

  const handleZoomOut = () => {
    setIsZoomed(false);
  };

  const getTransformStyle = () => {
    if (!isZoomed) return { transform: "scale(1)" };
    return {
      transform: `scale(2.5)`,
      transformOrigin: `${zoomPoint.x * 100}% ${zoomPoint.y * 100}%`,
      transition: "transform 0.3s ease-in-out",
    };
  };

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

      if (response.data.success) {
        toast.success("Notice saved successfully!");
      } else {
        toast.error(response.data.message || "Failed to save notice.");
      }
    } catch (error) {
      console.error(
        "Error saving notice:",
        error.response?.data || error.message
      );
      if (error.response?.status === 401) {
        toast.error("Unauthorized! Please log in again.");
        localStorage.removeItem("authToken");
      } else {
        toast.error("Something went wrong! Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-8 h-8 border-4 border-t-transparent border-[#001A3B] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) return <p className="text-red-500">{error}</p>;
  if (!notice) return <p>Notice not found</p>;

  return (
    <>
      <Header />
      <ToastContainer />
      <nav className="bg-gray-100 py-2 px-4 text-sm flex items-center space-x-2">
        <div className="flex items-center space-x-2 mr-6">
          <button
            onClick={() => navigate(-1)}
            className="text-[#004B80] flex items-center space-x-2"
          >
            <img src={arrow} className="w-3 h-3" alt="Back Arrow" />
            <span>Back</span>
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={() => navigate("/")} className="text-gray-500">
            Home
          </button>
          <span className="text-gray-400">&gt;</span>
          <button
            onClick={() => navigate("/land-notices")}
            className="text-gray-500"
          >
            Land Notices
          </button>
          <span className="text-gray-400">&gt;</span>
          <span className="text-[#004B80]">Notice Details</span>
        </div>
      </nav>

      <section className="py-8 max-w-6xl mx-auto bg-white space-y-6">
        <h1 className="text-[#004B80] text-4xl font-semibold">
          {notice.notice_title}
        </h1>

        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8">
          <div className="lg:w-1/2 bg-gray-100 flex justify-center items-start">
            <div
              className="relative bg-white shadow-md mt-5 rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
              onClick={() => setIsModalOpen(true)}
            >
              {notice.notice_image ? (
                <img
                  src={notice.notice_image}
                  alt="Land Notice"
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
                {new Date(notice.createdAt).toLocaleDateString()}
              </span>
              <span className="text-[#A99067] border border-[#A99067] rounded-full px-3 ml-2 py-1 text-md font-medium">
                {notice.ownershipType}
              </span>
              <span className="text-[#A99067] border border-[#A99067] rounded-full px-3 py-1 ml-2 text-md font-medium">
                {notice.occupantClass}
              </span>
            </div>

            <section className="max-w-6xl mx-auto bg-white space-y-6">
              <div className="border-t border-gray-300 pt-4 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold">Survey Number:</p>
                    <p className="text-gray-700">{notice.surveyNumber}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Hissa Number:</p>
                    <p className="text-gray-700">{notice.hissaNumber}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Owner Name:</p>
                    <p className="text-gray-700">{notice.ownerName}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Land Area:</p>
                    <p className="text-gray-700">{notice.landArea}</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  {showFullDescription
                    ? notice.landDescription
                    : `${notice.landDescription.slice(0, 150)}...`}
                </p>
                {notice.landDescription.length > 150 && (
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-[#A99067] font-medium hover:underline"
                  >
                    {showFullDescription ? "Read Less" : "Read More"}
                  </button>
                )}
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-[#A99067] text-white px-6 py-2 rounded-md font-medium hover:bg-[#8c6f42] transition"
                >
                  View Notice
                </button>
                <button
                  onClick={downloadAsPDF}
                  className="border border-[#A99067] px-4 py-2 rounded-md hover:bg-gray-100 transition"
                >
                  <img src={download} className="w-4 h-4" alt="Download" />
                </button>
                <button
                  onClick={() => handleSaveNotice(notice.id)}
                  className="border border-[#A99067] px-4 py-2 rounded-md hover:bg-gray-100 transition"
                >
                  <img src={save} className="w-4 h-4" alt="Save" />
                </button>
              </div>
            </section>
          </div>
        </div>
      </section>

      {/* Zoom Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50 p-4">
          <div className="relative max-w-[90%] max-h-[90%]">
            <div className="absolute top-0 right-0 flex space-x-2 z-50 transform -translate-y-full">
              <button
                onClick={handleZoomIn}
                className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
                title="Zoom In"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                  />
                </svg>
              </button>
              <button
                onClick={handleZoomOut}
                className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
                title="Zoom Out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM7 10h6"
                  />
                </svg>
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setIsZoomed(false);
                }}
                className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
                title="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="overflow-auto max-h-[80vh]">
              <img
                ref={imageRef}
                src={notice.notice_image}
                alt="Land Notice"
                className={`max-w-full object-contain transition-transform duration-300 ${
                  isZoomed ? "scale-150" : "scale-100"
                }`}
                style={{
                  transformOrigin: `${zoomPoint.x * 100}% ${
                    zoomPoint.y * 100
                  }%`,
                  cursor: isZoomed ? "zoom-out" : "zoom-in",
                }}
                onClick={handleImageClick}
              />
            </div>
            {isZoomed && (
              <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm">
                Click anywhere to zoom out or use the zoom controls
              </div>
            )}
          </div>
        </div>
      )}
      <WebFooter />
    </>
  );
};

export default LandNoticeDetail;
