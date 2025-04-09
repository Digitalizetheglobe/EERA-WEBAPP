import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Webheader from "../Notices/Webheader";
import WebFooter from "../Notices/WebFooter";
import Google from "../../assets/google.png";
import Facebook from "../../assets/facebook.png";
import coverImage from "../../assets/banner/groupdiscussion.jpg";
import Header from "../Home/HomeHeader";

const Login = () => {
  const [identifier, setIdentifier] = useState(""); 
  const [password, setPassword] = useState("");
  const [loginMethod, setLoginMethod] = useState("email"); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleIdentifierChange = (e) => setIdentifier(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async () => {
    setLoading(true);
    try {
      // http://localhost:8004/
      // https://api.epublicnotices.in

      const response = await fetch("https://api.epublicnotices.in/api/webuser/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier, password }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        localStorage.setItem("authToken", result.token); // Store the token
        localStorage.setItem("user", JSON.stringify(result.user)); // Store user details (optional)
        
        toast.success("Login successful!");
        navigate("/home"); // Redirect after login
      } else {
        toast.error(result.error || "Login failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ToastContainer />
      
      <main className="flex-grow bg-gray-100 px-4 py-8 sm:py-12">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row shadow-2xl rounded-lg overflow-hidden bg-white">
            {/* Left Side - Image/Intro */}
            <div className="md:w-1/2 relative">
              {/* Mobile view banner */}
              <div className="md:hidden bg-[#004b80] text-white p-6 text-center">
                <h2 className="text-2xl font-bold mb-2">EERA Notices</h2>
                <p className="text-sm">All Your Essential Notices in One Place.</p>
              </div>
              
              {/* Desktop view background image */}
              <div
                className="hidden md:block absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${coverImage})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="text-white p-8 text-center">
                    <h2 className="text-4xl font-bold mb-4">EERA Notices</h2>
                    <p className="text-sm">All Your Essential Notices in One Place.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="md:w-1/2 p-6 sm:p-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
                Welcome Back!
              </h3>
              
              {/* Login Method Toggle */}
              <div className="flex justify-center gap-4 mb-6">
                <button
                  onClick={() => setLoginMethod("email")}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                    loginMethod === "email" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                  }`}
                >
                  Login with Email
                </button>
                <button
                  onClick={() => setLoginMethod("mobile")}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                    loginMethod === "mobile" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                  }`}
                >
                  Login with Mobile
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
                className="space-y-4 sm:space-y-5"
              >
                <div>
                  <label className="text-sm font-semibold text-gray-600 block mb-2">
                    {loginMethod === "email" ? "Email Address" : "Mobile Number"}
                  </label>
                  <input
                    value={identifier}
                    onChange={handleIdentifierChange}
                    type={loginMethod === "email" ? "email" : "text"}
                    autoComplete={loginMethod === "email" ? "email" : "tel"}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder={
                      loginMethod === "email" ? "Enter your email" : "Enter your mobile number"
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600 block mb-2">
                    Password
                  </label>
                  <input
                    value={password}
                    onChange={handlePasswordChange}
                    type="password"
                    autoComplete="current-password"
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter your password"
                  />
                </div>

                <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600">
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                    <span className="ml-2">Remember me</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2.5 sm:py-3 rounded-lg text-white text-sm font-semibold transition ${
                    loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {loading ? "Logging in..." : "Log In"}
                </button>
              </form>

              <div className="mt-6 text-center text-xs sm:text-sm text-gray-600">
                <p>
                  Don't have an account?{" "}
                  <a href="/register" className="text-blue-500 hover:underline font-semibold">
                    Register here
                  </a>
                </p>
              </div>

              {/* Social Media Login */}
              {/* <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6">
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 border rounded-lg text-sm text-gray-700 hover:shadow-md transition">
                  <img src={Google} alt="Google" className="h-5 w-5" />
                  <span>Google</span>
                </button>
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 border rounded-lg text-sm text-gray-700 hover:shadow-md transition">
                  <img src={Facebook} alt="Facebook" className="h-5 w-5" />
                  <span>Facebook</span>
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </main>
      
      <WebFooter />
    </div>
  );
};

export default Login;