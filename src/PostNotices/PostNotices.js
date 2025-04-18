import React, { useState } from "react";
import steimg from "../assets/banner/steps image.png";
import bgimg1 from "../assets/banner/Backgroundimage.png";
import WebFooter from "../Webapp/Notices/WebFooter";
import Header from "../Webapp/Home/HomeHeader";
import { useNavigate } from "react-router-dom";
import Warn from '../assets/warn.gif';

const PostNotices = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    description: "",
  });
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedFormats = ["image/jpeg", "image/jpg", "image/png"];

    if (selectedFile && !allowedFormats.includes(selectedFile.type)) {
      setFileError("Only JPG, JPEG, and PNG files are allowed.");
      setFile(null);
      setFileName("");
      return;
    }

    setFileError(""); // Clear any previous error
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the user is logged in
    const token = localStorage.getItem("authToken");
    if (!token) {
      setIsLoginModalOpen(true);
      return;
    }

    // Ensure file is valid
    if (!file) {
      setFileError("Please upload a document.");
      return;
    }

    setLoading(true);

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("email", formData.email);
    payload.append("phone", formData.phone);
    payload.append("location", formData.location);
    payload.append("city", formData.city || "");
    payload.append("message", formData.description || "");
    payload.append("document", file);

    try {
      const response = await fetch("https://api.epublicnotices.in/api/request-upload-notice", {
        method: "POST",
        body: payload,
      });
      const result = await response.json();
      if (result.success) {
        setMessage("Notice uploaded successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          location: "",
          city: "",
          description: "",
        });
        setFile(null);
        setFileName("");
        setIsModalOpen(true);
      } else {
        setMessage(result.message || "Failed to upload notice.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("An error occurred while submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div
        className="flex justify-center items-center h-full min-h-screen p-4"
        style={{
          backgroundImage: `url(${bgimg1})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="grid md:grid-cols-2 items-center gap-8 mt-20">
          <div className="">
            <h1 className="text-white text-center items-center justify-center mb-6 text-3xl font-bold">
              <span className="text-[#A99067]">Be Seen:</span> Post Your Notice
              Now
            </h1>
            <div className="max-md:order-1 lg:min-w-[450px] mt-14">
              <img
                src={steimg}
                className="lg:w-11/14 w-full object-cover"
                alt="login-image"
              />
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="md:max-w-md w-full mx-auto bg-[#001A3B] p-6"
          >
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-white">
                {" "}
                Submit Your Notice Details
              </h3>
            </div>
            <div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    for="floating_first_name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Name
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder=""
                    className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    required
                  />
                  <label
                    for="floating_last_name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Email Address
                  </label>
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    for="floating_first_name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Phone Number
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder="City"
                    required
                  />
                  <label
                    for="floating_first_name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    
                  </label>
                </div>
              </div>
              <div className="grid md:grid-cols md:gap-6">
                <div class="relative z-0 w-full  group">
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    for="floating_last_name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Location
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder=""
                    className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    required
                  />
                  <label
                    for="floating_first_name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Description
                  </label>
                </div>
              </div>
              {/* Other Inputs */}
              <div className="flex items-center justify-between gap-4 border-b border-gray-300 pb-2 mb-4 mt-4">
                <label htmlFor="file-upload" className="text-sm text-gray-500">
                  Attach Documents
                </label>
                <label
                  htmlFor="file-upload"
                  className="text-sm text-gray-500 cursor-pointer"
                >
                  Choose File
                </label>
              </div>
              <input
                type="file"
                id="file-upload"
                name="file-upload"
                className="hidden"
                onChange={handleFileChange}
              />
              {fileError && <div className="text-red-500 text-sm">{fileError}</div>}
              {fileName && (
                <div className="mt-2 text-sm text-gray-600">
                  Selected file: <span className="font-medium">{fileName}</span>
                </div>
              )}
            </div>
            <div className="mt-12">
              <button
                type="submit"
                className="w-full shadow-xl py-2.5 px-5 text-md font-semibold text-white bg-[#A99067]"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Send Notice for Verification"}
              </button>
            </div>
            {message && (
              <div className="mt-4 text-center text-white">{message}</div>
            )}
          </form>
        </div>
      </div>
      {/* Submission Success Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-md w-96">
            <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
              Thank You for Your Submission
            </h2>
            <p className="text-center text-gray-600">
              Your notice has been successfully submitted! It will be live in the next 4 hours.
            </p>
            <div className="mt-6 flex justify-center">
              <button
                className="bg-[#A99067] text-white px-6 py-2 rounded-md"
                onClick={() => {
                  setIsModalOpen(false);
                  navigate("/home"); // Navigate to '/home' on close
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-md w-96 shadow-lg">
            {/* GIF Display */}
            <div className="flex justify-center mb-4">
              <img src={Warn} alt="Warning" className="w-20 h-20" />
            </div>

            {/* Heading */}
            <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
              Login Required
            </h2>

            {/* Description */}
            <p className="text-center text-gray-600">
              Sorry, you need to log in first to use this feature.
            </p>

            {/* Button */}
            <div className="mt-6 flex justify-center">
              <button
                className="bg-[#A99067] hover:bg-[#8a7c5b] text-white px-6 py-2 rounded-md transition duration-300"
                onClick={() => {
                  setIsLoginModalOpen(false);
                  navigate("/login");
                }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
      <WebFooter />
    </>
  );
};

export default PostNotices;
