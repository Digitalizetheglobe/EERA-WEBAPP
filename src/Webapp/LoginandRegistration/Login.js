import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Webheader from "../Notices/Webheader";
import WebFooter from "../Notices/WebFooter";
import Google from "../../assets/google.png";
import Facebook from "../../assets/facebook.png"
import coverImage from "../../assets/banner/groupdiscussion.jpg"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://api.epublicnotices.in/api/webapp/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        // Save token to local storage
        localStorage.setItem("authToken", result.token);
        toast.success("Login successful!");

        // Navigate to home
        navigate("/home");
      } else {
        toast.error(result.message || "Login failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Webheader />
      <ToastContainer />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="flex flex-col md:flex-row shadow-2xl rounded-lg overflow-hidden w-full max-w-5xl">
          {/* Left Side - Image/Intro */}
          <div
            className="hidden md:block md:w-1/2 bg-cover bg-center"
            style={{ backgroundImage: `url(${coverImage})` }}
          >
            <div className="h-full flex items-center justify-center bg-black bg-opacity-40 text-white p-8">
              <div>
                <h2 className="text-4xl font-bold mb-4">EERA Notices</h2>
                <p className="text-sm">All Your Essential Notices in One Place.</p>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white md:w-1/2 p-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">Welcome Back!</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
              className="space-y-5"
            >
              <div>
                <label htmlFor="email" className="text-sm font-semibold text-gray-600 block mb-2">
                  Email Address
                </label>
                <input
                  value={email}
                  onChange={handleEmailChange}
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="password" className="text-sm font-semibold text-gray-600 block mb-2">
                  Password
                </label>
                <input
                  value={password}
                  onChange={handlePasswordChange}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                  <span className="ml-2">Remember me</span>
                </label>
                {/* <a href="/forgot-password" className="text-blue-500 hover:underline">
                  Forgot Password?
                </a> */}
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg text-white text-sm font-semibold transition ${loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                  }`}
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              <p>
                Don’t have an account?{" "}
                <a href="/register" className="text-blue-500 hover:underline font-semibold">
                  Register here
                </a>
              </p>
            </div>

            {/* Social Media Login */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm text-gray-700 hover:shadow-md">
                <img src={Google} alt="Google" className="h-5 w-5" />
                Google
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm text-gray-700 hover:shadow-md">
                <img src={Facebook} alt="Apple" className="h-5 w-5" />
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

export default Login;
