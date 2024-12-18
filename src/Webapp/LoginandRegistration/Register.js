import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Webheader from "../Notices/Webheader";
import WebFooter from "../Notices/WebFooter";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    const apiUrl = "http://api.epublicnotices.in/api/webapp/register";
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
      <Webheader />
      <div className="font-[sans-serif]">
        <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
          <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
            <div>
              <h2 className="lg:text-5xl text-4xl font-extrabold lg:leading-[55px] text-gray-800">
                Create Your Account
              </h2>
              <p className="text-sm mt-6 text-gray-800">
                Sign up to unlock exclusive features and manage your preferences effortlessly.
              </p>
              <p className="text-sm mt-12 text-gray-800">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-blue-600 font-semibold hover:underline ml-1"
                >
                  Log in here
                </a>
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSignUp();
              }}
              className="max-w-md md:ml-auto w-full"
            >
              <h3 className="text-gray-800 text-3xl font-extrabold mb-8">
                Sign Up
              </h3>

              <div className="space-y-4">
                <div>
                  <input
                    value={firstName}
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent"
                    placeholder="First Name"
                  />
                </div>
                <div>
                  <input
                    value={lastName}
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent"
                    placeholder="Last Name"
                  />
                </div>
                <div>
                  <input
                    value={email}
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent"
                    placeholder="Email Address"
                  />
                </div>
                <div>
                  <input
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent"
                    placeholder="Password"
                  />
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
                  {loading ? "Signing up..." : "Sign Up"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Congratulations!</h2>
            <p className="text-gray-600 mb-6">
              You have successfully registered. Please log in to access all features and functionality.
            </p>
            <button
              onClick={closeModal}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
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
