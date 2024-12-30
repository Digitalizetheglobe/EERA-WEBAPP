import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import jsPDF from "jspdf"; // Import jsPDF
import save from "../../assets/logo/save.png";
import download from "../../assets/logo/download.png";
import Footer from "../../LandingPage/Footer";
import WebFooter from "./WebFooter";
import Webheader from "./Webheader";
import arrow from '../../assets/logo/arrow.png';
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const Notice = () => {
  const { id } = useParams();
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await fetch(`https://api.epublicnotices.in/notices/${id}`);
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

  const downloadAsPDF = () => {
    if (notice && notice.notices_images) {
      const pdf = new jsPDF();
      const imgUrl = `https://api.epublicnotices.in/noticesimage/${notice.notices_images}`;
      const imgWidth = 190; // Adjust as needed
      const imgHeight = 160; // Adjust as needed

      pdf.text("Source : - EERA epublicnotices.in", 10, 10); // Add optional title
      pdf.addImage(imgUrl, "JPEG", 10, 20, imgWidth, imgHeight); // Add image to PDF
      pdf.save("notice.pdf"); // Trigger download
      toast.success("Notice downloaded successfully!");
    } else {
      toast.error("Notice image not available");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

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
      <section className="p-8 max-w-4xl mx-auto bg-white space-y-6">
        <span className="text-[#A99067] border border-[#A99067] rounded-full px-3 py-1 text-md font-medium">
        {new Date(notice.date).toLocaleDateString()} 
        </span>
        <span className="text-[#A99067] border border-[#A99067] rounded-full px-3 ml-2 py-1 text-md font-medium">
          {notice.location}
        </span>
        <span className="text-[#A99067] border border-[#A99067] rounded-full px-3 py-1 ml-2 text-md font-medium">
           {notice.newspaper_name}
        </span>
        <h1 className="text-[#004B80] text-4xl font-semibold">
          {notice.notice_title}
        </h1>
        <p className="text-[#004B80] text-md font-semibold">
         
        </p>

        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8">
          <div className="lg:w-1/2 bg-gray-100 flex justify-center items-start">
            <div
              className="relative bg-white shadow-md mt-5 rounded-lg overflow-hidden cursor-pointer"
              onClick={() => setIsModalOpen(true)} // Open modal on click
            >
              {notice.notices_images ? (
                <img
                  src={`https://api.epublicnotices.in/noticesimage/${notice.notices_images}`}
                  alt="Notice Indicator"
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
              <h3 className="text-lg font-semibold text-gray-800">About Notice</h3>
              <p className="text-gray-600 text-justify">{notice.notice_description}</p>
            </div>
            <div className="border-t border-gray-300 pt-4 space-y-3">
              {/* <div className="text-gray-600">
                <p>
                  <strong>Location:</strong> {notice.location}
                </p>
                <p>
                  <strong>Address:</strong> {notice.address || "Not available"}
                </p>
              </div> */}
              <div className="flex space-x-4 pt-4">
                <button onClick={() => setIsModalOpen(true)} className="bg-[#A99067] text-white px-6 py-2 rounded-md font-medium hover:bg-[#8c6f42] transition flex items-center space-x-2">
                  <span>View Notice</span>
                </button>
                <button onClick={downloadAsPDF} className="border border-[#A99067] px-4 py-2 rounded-md hover:bg-gray-100 transition">
                  <img src={download} className="w-4 h-4" alt="Download" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div
            className="bg-white p-4 rounded-lg relative"
            style={{ width: "50%", height: "80%" }} // Custom width and height
          >
            <button
              onClick={() => setIsModalOpen(false)} // Close modal
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl"
            >
              &times;
            </button>
            {notice.notices_images && (
              <img
                src={`https://api.epublicnotices.in/noticesimage/${notice.notices_images}`}
                alt="Notice Indicator"
                className="object-contain w-full h-full" // Ensures the image fits within the modal
              />
            )}
          </div>
        </div>
      )}

      <WebFooter />
    </>
  );
};

export default Notice;
