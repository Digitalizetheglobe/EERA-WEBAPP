import React from "react";
import Homeheader from "../Notices/Homewebheader";
import banner1 from "../../assets/banner/3AvzPg1jSKKvKcHh6YfTfw 1.svg";
import readmore from "../../assets/banner/Group 2.png";
import "../../Banner/Banner.css";
import AllNotices from "./AllNotices";
import RecentLatestNotice from "./Recentlatestnotice";
import Faq from "../../LandingPage/Faq";
import Testimonial from "../../LandingPage/Testimonial";
import WebFooter from "./WebFooter";
import Webtestimonial from "./Webtestimonial";

const Home = () => {
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

        {/* Text and Button Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center items-center p-8 sm:p-20 text-white">
          {/* Centered Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-4xl text-center font-bold mt-4 mb-4 leading-tight sm:leading-normal max-w-xs sm:max-w-2xl">
            All Your Essential Notices in One Place
          </h1>

          {/* Centered Subheading */}
          <p className="text-base sm:text-lg text-center max-w-sm sm:max-w-lg mb-6">
            Public Notices Made Simple, Fast, and Accessible.
          </p>

          {/* Search Bar Placeholder */}
          <div className="w-full max-w-2xl mt-6 flex items-center bg-gray-200 bg-opacity-40 p-4 rounded-lg space-x-2">
            {/* Title or Keyword Input with Icon */}
            <div className="relative w-full">
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
              <input
                type="text"
                placeholder="Title or keyword"
                className="w-full pl-10 p-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#A99067] placeholder-gray-500"
              />
            </div>

            {/* Location Input with Icon */}
            <div className="relative w-full">
              <i className="fas fa-map-marker-alt absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
              <input
                type="text"
                placeholder="Select Location"
                className="w-full pl-10 p-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#A99067] placeholder-gray-500"
              />
            </div>

            {/* Search Button */}
            <button className="bg-[#004B80] text-white px-6 py-3 rounded-md shadow-md hover:bg-[#003B65] transition whitespace-nowrap">
              Search Notice
            </button>
          </div>
        </div>
      </section>

      <AllNotices />
      <RecentLatestNotice />
      <Faq />
      <Webtestimonial />
      <WebFooter />
    </>
  );
};

export default Home;
