import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Webheader from "../Notices/Webheader";
import WebFooter from "../Notices/WebFooter";
import coverImage from "../../assets/banner/groupdiscussion.jpg";
import Google from "../../assets/google.png";
import Facebook from "../../assets/facebook.png";
import Header from "../Home/HomeHeader";

const Register = () => {
  const [userType, setUserType] = useState("personal");
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    location: "",
    password: "",
    department: "",
    companyName: "",
    uinNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = async () => {
    setLoading(true);

    let apiUrl;
    switch (userType) {
      case "personal":
        apiUrl = "https://api.example1.com/register";
        break;
      case "corporate":
        apiUrl = "https://api.example2.com/register";
        break;
      case "government":
        apiUrl = "https://api.example3.com/register";
        break;
      default:
        toast.error("Invalid user type selected.");
        setLoading(false);
        return;
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, userType }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Registration successful!", { autoClose: 3000 });
        setShowModal(true);
      } else {
        const error = await response.json();
        toast.error(`Registration failed: ${error.message || "Please try again"}`);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    navigate("/login");
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="flex flex-col md:flex-row shadow-2xl rounded-lg overflow-hidden w-full max-w-5xl">
          {/* Cover Image Section - Hidden on mobile, visible on md and up */}
          <div className="hidden md:block md:w-1/2 bg-cover bg-center relative">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${coverImage})` }}
            >
              <div className="h-full flex items-center justify-center bg-black bg-opacity-40 text-white p-8">
                <h2 className="text-4xl font-bold">EERA Notices</h2>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-white w-full md:w-1/2 p-4 md:p-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
              Create Your Account
            </h3>
            <p className="text-center text-gray-600 mb-3 text-sm md:text-base">
              Please select your registration category:
            </p>

            {/* User Type Selection */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6">
              {["personal", "corporate", "government"].map((type) => (
                <button
                  key={type}
                  onClick={() => setUserType(type)}
                  className={`px-3 md:px-4 py-2 rounded-lg text-sm md:text-base ${
                    userType === type ? "bg-[#A99067] text-white" : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>

            {/* Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSignUp();
              }}
              className="w-full max-w-md mx-auto"
            >
              <div className="space-y-3 md:space-y-4">
                {/* Common Fields */}
                <div>
                  <label className="block text-gray-700 text-sm md:text-base font-medium">Name</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg text-sm"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm md:text-base font-medium">Phone Number</label>
                  <input
                    name="number"
                    value={formData.number}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg text-sm"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm md:text-base font-medium">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg text-sm"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm md:text-base font-medium">Location</label>
                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg text-sm"
                    placeholder="Enter your location"
                  />
                </div>

                {/* Conditional Fields */}
                {userType === "corporate" && (
                  <>
                    <div>
                      <label className="block text-gray-700 text-sm md:text-base font-medium">Company Name</label>
                      <input
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg text-sm"
                        placeholder="Enter company name"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm md:text-base font-medium">UIN Number</label>
                      <input
                        name="uinNumber"
                        value={formData.uinNumber}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg text-sm"
                        placeholder="Enter UIN number"
                      />
                    </div>
                  </>
                )}

                {userType === "government" && (
                  <div>
                    <label className="block text-gray-700 text-sm md:text-base font-medium">Department</label>
                    <input
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg text-sm"
                      placeholder="Enter department"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-gray-700 text-sm md:text-base font-medium">Password</label>
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg text-sm"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full shadow-xl py-2 md:py-2.5 px-4 text-sm font-semibold rounded text-white mt-4 ${
                  loading ? "bg-blue-400" : "bg-[#001A3B] hover:bg-[#1A3B5C]"
                }`}
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-4 md:mt-6 text-center text-sm text-gray-600">
              <p>
                Already have an account?{" "}
                <a
                  href="/Login"
                  className="text-blue-500 hover:underline font-semibold"
                  onClick={closeModal}
                >
                  Login here
                </a>
              </p>
            </div>

            {/* Social Login Buttons */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 mt-4 md:mt-6">
              <button className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 border rounded-lg text-sm text-gray-700 hover:shadow-md">
                <img src={Google} alt="Google" className="h-5 w-5" />
                Google
              </button>
              <button className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 border rounded-lg text-sm text-gray-700 hover:shadow-md">
                <img src={Facebook} alt="Facebook" className="h-5 w-5" />
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
      <WebFooter />
    </>
  );
};

export default Register;