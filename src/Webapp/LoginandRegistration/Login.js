import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Webheader from "../Notices/Webheader";
import WebFooter from "../Notices/WebFooter";

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
    <Webheader/>
    <div className="font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
          <div>
            <h2 className="lg:text-5xl text-4xl font-extrabold lg:leading-[55px] text-gray-800">
              Welcome Back!
            </h2>
            <p className="text-sm mt-6 text-gray-800">
              Access your account to unlock exclusive features and manage your preferences.
            </p>
            <p className="text-sm mt-12 text-gray-800">
              Don’t have an account?{" "}
              <a
                href="/register"
                className="text-blue-600 font-semibold hover:underline ml-1"
              >
                Register here
              </a>
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="max-w-md md:ml-auto w-full"
          >
            <h3 className="text-gray-800 text-3xl font-extrabold mb-8">
              Sign In
            </h3>

            <div className="space-y-4">
              <div>
                <input
                  value={email}
                  type="email"
                  autoComplete="email"
                  onChange={handleEmailChange}
                  required
                  className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent"
                  placeholder="Email address"
                />
              </div>
              <div>
                <input
                  value={password}
                  type="password"
                  autoComplete="current-password"
                  onChange={handlePasswordChange}
                  required
                  className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent"
                  placeholder="Password"
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 block text-sm text-gray-800"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="/forgot-password"
                    className="text-blue-600 hover:text-blue-500 font-semibold"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                disabled={loading}
                className={`w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white ${
                  loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                } focus:outline-none`}
              >
                {loading ? "Logging in..." : "Log in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <WebFooter/>
    </>
  );
};

export default Login;
