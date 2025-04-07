import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import WebFooter from "../Notices/WebFooter";
import Header from "../Home/HomeHeader";

const Register = () => {
  const [userType, setUserType] = useState("personal");
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    location: "",
    password: "",
    confirmPassword: "",
    department: "",
    companyName: "",
    uinNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = async () => {
    setLoading(true);

    // Password validation
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }
    // https://api.epublicnotices.in
    const apiUrl = "http://localhost:8004/api/webuser/register";

    // Prepare request payload based on userType
    const userPayload = {
      name: formData.name,
      phone: formData.number,
      email: formData.email,
      location: formData.location,
      password: formData.password,
      userType,
    };

    if (userType === "corporate") {
      userPayload.companyName = formData.companyName;
      userPayload.uinNumber = formData.uinNumber;
    } else if (userType === "government") {
      userPayload.department = formData.department;
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userPayload),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Registration successful! Redirecting to login...", { autoClose: 3000 });
        setTimeout(() => {
          navigate("/login");
        }, 3000);
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

  // Content mapping for left side based on user type
  const leftSideContent = {
    personal: (
      <div className="relative h-full w-full">
        <div className="absolute inset-0 bg-white">
          <div className="h-full flex flex-col justify-center p-8 relative">
            <div className="absolute bottom-15 left-10">
              <img src="/leftframe1.png" alt="Business person" />
            </div>
          </div>
        </div>
      </div>
    ),
    corporate: (
      <div className="relative h-full w-full">
        <div className="absolute inset-0 bg-white">
          <div className="h-full flex flex-col justify-center p-8 relative">
            <div className="absolute bottom-15 left-10">
              <img src="/leftframe2.png" alt="Business person" />
            </div>
          </div>
        </div>
      </div>
    ),
    government: (
      <div className="relative h-full w-full">
        <div className="absolute inset-0 bg-white">
          <div className="h-full flex flex-col justify-center p-8 relative">
            <div className="absolute bottom-15 left-10">
              <img src="/leftframe3.png" alt="Business person" />
            </div>
          </div>
        </div>
      </div>
    )
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="flex flex-col md:flex-row shadow-xl rounded-lg overflow-hidden w-full max-w-6xl bg-white">
          {/* Left section with images and stats - hidden on mobile */}
          <div className="hidden md:block md:w-1/2 bg-cover bg-center relative">
            {leftSideContent[userType]}
          </div>

          {/* Form Section */}
          <div className="bg-white w-full md:w-1/2 p-6 md:p-10">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Create Your Account
            </h3>

            <div className="mb-6">
              <p className="text-gray-700 mb-2">Select Your Profile Type</p>
              <div className="flex rounded-lg overflow-hidden bg-[#B8D7F4] p-3">
                {["Personal", "Corporate", "Government"].map((type) => (
                  <button
                    key={type.toLowerCase()}
                    onClick={() => setUserType(type.toLowerCase())}
                    className={`flex-1 py-3 mx-1 rounded-lg text-center transition ${userType === type.toLowerCase()
                      ? "bg-white text-gray-800 font-medium"
                      : "bg-transparent text-gray-600"
                      }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSignUp();
              }}
              className="space-y-4"
            >
              {/* Common Fields - Two Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg text-sm"
                    placeholder="Name"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Phone Number<span className="text-red-500">*</span>
                  </label>
                  <input
                    name="number"
                    value={formData.number}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg text-sm"
                    placeholder="Number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Email<span className="text-red-500">*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg text-sm"
                    placeholder="Email"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Location<span className="text-red-500">*</span>
                  </label>
                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg text-sm"
                    placeholder="Location"
                  />
                </div>
              </div>

              {/* Conditional Fields based on user type */}
              {userType === "corporate" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                      Company Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border rounded-lg text-sm"
                      placeholder="Company Name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                      UIN Number<span className="text-red-500">*</span>
                    </label>
                    <input
                      name="uinNumber"
                      value={formData.uinNumber}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border rounded-lg text-sm"
                      placeholder="UIN Number"
                    />
                  </div>
                </div>
              )}

              {userType === "government" && (
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Department<span className="text-red-500">*</span>
                  </label>
                  <input
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg text-sm"
                    placeholder="Department"
                  />
                </div>
              )}

              {/* Password fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Password<span className="text-red-500">*</span>
                  </label>
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg text-sm"
                    placeholder="Password"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Confirm Password<span className="text-red-500">*</span>
                  </label>
                  <input
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg text-sm"
                    placeholder="Confirm Password"
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-row items-center space-x-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="py-2 px-4 w-64 text-white text-md font-medium bg-[#1a4b7c] rounded-lg transition"
                >
                  {loading ? "Signing up..." : "Sign Up"}
                </button>

                <div>
                  <a href="/login" className="text-[#1a4b7c] text-md hover:underline">
                    I already have an account
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <WebFooter />
    </>
  );
};

export default Register;