import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Home/HomeHeader";
import banner1 from "../../assets/banner/3AvzPg1jSKKvKcHh6YfTfw 1.svg";
import AllNotices from "./AllNotices";
import RecentLatestNotice from "./Recentlatestnotice";
import Faq from "../../LandingPage/Faq";
import WebFooter from "./WebFooter";
import Webtestimonial from "./Webtestimonial";
import CTA from "../CTA";
import SearchBar from '../SearchBar/SearchBar';
import StickyNotice from "../../PostNoticesSticky/page";

const Home = () => {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const navigate = useNavigate();

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

  const handleSearch = (searchData) => {
    const { keyword, location, layerName, newspaperName, date } = searchData;
    navigate("/search-notices", {
      state: { keyword, location, layerName, newspaperName, date },
    });
  };

  const handleSuggestionClick = (title) => {
    setKeyword(title);
    setFilteredSuggestions([]);
  };

  return (
    <>
      <Header />
      <StickyNotice />
      
      {/* Banner Section with Centered Content */}
      <section className="relative w-full h-[80vh] sm:h-screen">
        <img
          src={banner1}
          alt="banner"
          className="w-full h-full object-cover"
        />
        
        {/* Centered Heading & Search Bar */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold mb-6 leading-tight sm:leading-normal max-w-xs sm:max-w-2xl">
            All Your Essential Notices in One Place
          </h1>
          <SearchBar onSearch={handleSearch} />
        </div>
      </section>

      <AllNotices />
      <RecentLatestNotice />
      <CTA />
      <Faq />
      <Webtestimonial />
      <WebFooter />
    </>
  );
};

export default Home;
