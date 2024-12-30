import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Homeheader from "../Notices/Homewebheader";
import banner1 from "../../assets/banner/3AvzPg1jSKKvKcHh6YfTfw 1.svg";
import AllNotices from "./AllNotices";
import RecentLatestNotice from "./Recentlatestnotice";
import Faq from "../../LandingPage/Faq";
import Testimonial from "../../LandingPage/Testimonial";
import WebFooter from "./WebFooter";
import Webtestimonial from "./Webtestimonial";
import PostNotices from "../../PostNotices/PostNotices";
import CTA from "../CTA";

const Home = () => {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const navigate = useNavigate();

  // Fetch suggestions from the API
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await fetch("https://api.epublicnotices.in/notices");
        if (response.ok) {
          const data = await response.json();
          setSuggestions(data);
        }
      } catch (error) {
        console.error("Failed to fetch notices:", error);
      }
    };

    fetchSuggestions();
  }, []);

  // Filter suggestions based on keyword input
  useEffect(() => {
    if (keyword) {
      setFilteredSuggestions(
        suggestions.filter((notice) =>
          notice.notice_title.toLowerCase().includes(keyword.toLowerCase())
        )
      );
    } else {
      setFilteredSuggestions([]);
    }
  }, [keyword, suggestions]);

  const handleSearch = () => {
    navigate("/search-notices", {
      state: { keyword, location },
    });
  };

  const handleSuggestionClick = (title) => {
    setKeyword(title);
    setFilteredSuggestions([]); // Hide suggestions
  };

  return (
    <>
      <section className="relative">
        {/* Header */}
        <Homeheader />

        {/* Banner Image */}
        <img
          src={banner1}
          alt="banner"
          className="w-full h-[80vh] sm:h-full object-cover"
        />

        {/* Search Bar */}
        <div className="absolute inset-0 flex flex-col justify-center items-center p-8 sm:p-20 text-white">
            <h1 className="text-3xl sm:text-4xl lg:text-4xl text-center font-bold mt-4 mb-4 leading-tight sm:leading-normal max-w-xs sm:max-w-2xl">
            All Your Essential Notices in One Place
          </h1>
          <div className="w-full max-w-2xl mt-6 flex items-center bg-gray-200 bg-opacity-40 p-4 rounded-lg space-x-2">
          <div className="relative w-full">
          
              <input
                type="text"
                placeholder="Title or keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full p-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#A99067] placeholder-gray-500"
              />
              {/* Suggestions Dropdown */}
              {filteredSuggestions.length > 0 && (
                <ul className="absolute z-10 bg-white border border-gray-300 rounded-md w-full mt-1 max-h-40 overflow-y-auto">
                  {filteredSuggestions.map((suggestion) => (
                    <li
                      key={suggestion.id}
                      className=" text-black p-2 bg-gray-200 cursor-pointer"
                      onClick={() => handleSuggestionClick(suggestion.notice_title)}
                    >
                      {suggestion.notice_title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Select Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                 className="w-full pl-10 p-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#A99067] placeholder-gray-500"
              />
            </div>
            <button
              className="bg-[#004B80] text-white px-6 py-3 rounded-md shadow-md hover:bg-[#003B65] transition whitespace-nowrap"
              onClick={handleSearch}
            >

              Search Notice
            </button>
          </div>
        </div>
      </section>
      <AllNotices />
      <RecentLatestNotice />
      <CTA/>
      <Faq />
      <Webtestimonial />
      <WebFooter />
    </>
  );
};

export default Home;
