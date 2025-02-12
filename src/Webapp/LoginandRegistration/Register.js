import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Webheader from "../Notices/Webheader";
import WebFooter from "../Notices/WebFooter";
import coverImage from "../../assets/banner/groupdiscussion.jpg"
import Google from "../../assets/google.png";
import Facebook from "../../assets/facebook.png";
import Success from "../../assets/success.gif";
import Homeheader from "../Notices/Homewebheader";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    const apiUrl = "https://api.epublicnotices.in/api/webapp/register";
    const payload = {
      firstName,
      lastName,
      email,
      password,
    };

    setLoading(true);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();

        // Save token to local storage
        if (data.token) {
          localStorage.setItem("authToken", data.token);
        }

        toast.success("Registration successful!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });

        setShowModal(true); // Show the modal
      } else {
        const error = await response.json();
        toast.error(`Registration failed: ${error.message}`, {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    navigate("/login"); // Navigate to the login page
  };

  return (
    <>
      <Homeheader/>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="flex flex-col md:flex-row shadow-2xl rounded-lg overflow-hidden w-full max-w-5xl">
          {/* <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4"> */}
          {/* <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full"> */}
          <div
            className="hidden md:block md:w-1/2 bg-cover bg-center"
            style={{ backgroundImage: `url(${coverImage})` }}
          >
            <div className="h-full flex items-center justify-center bg-black bg-opacity-40 text-white p-8">
              <div>
                <h2 className="text-4xl font-bold mb-4">EERA Notices</h2>
                <p className="text-sm">Sign up to unlock exclusive features and manage your preferences effortlessly.</p>
              </div>
            </div>
          </div>

          <div className="bg-white md:w-1/2 p-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create Your Account</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSignUp();
              }}
              className="max-w-md md:ml-auto w-full"
            >
              {/* <h3 className="text-gray-800 text-3xl font-extrabold mb-8">
                Sign Up
              </h3> */}

              <div className="space-y-4">
                <div>
                  <label htmlFor="firstName" className="text-sm font-semibold text-gray-600 block mb-2">
                    First Name
                  </label>
                  <input
                    value={firstName}
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="First Name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="text-sm font-semibold text-gray-600 block mb-2">
                    Last Name
                  </label>
                  <input
                    value={lastName}
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Last Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-semibold text-gray-600 block mb-2">
                    Email Address
                  </label>
                  <input
                    value={email}
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
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
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter Your Password"
                  />
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white ${loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                    } focus:outline-none`}
                >
                  {loading ? "Signing up..." : "Sign Up"}
                </button>
              </div>
            </form>
            <div className="mt-6 text-center text-sm text-gray-600">
              <p>
                Already have an account?{" "}
                <a href="/Login" className="text-blue-500 hover:underline font-semibold">
                  Login here
                </a>
              </p>
            </div>
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
        {/* </div> */}
        {/* </div> */}
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md text-center shadow-lg">
            {/* Success GIF */}
            <div className="flex justify-center mb-4">
              <img src={Success} alt="Success" className="w-30 h-30" />
            </div>

            {/* Modal Heading */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Congratulations!</h2>

            {/* Modal Description */}
            <p className="text-gray-600 mb-6">
              You have successfully registered. Please log in to access all features and functionality.
            </p>

            {/* Button */}
            <button
              onClick={closeModal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition duration-300 focus:outline-none"
            >
              Login Now
            </button>
          </div>
        </div>
      )}

      <WebFooter />
    </>
  );
};

export default Register;
