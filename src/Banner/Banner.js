import React from "react";
import banner from "../assets/banner/1HIMW2VTQLimGQKOEOzmaw 1.png";
import readmore from "../assets/banner/Group 2.png";
import Header from "../Header/Header";
import Feature from "../LandingPage/Feature";
import Aboutus from "../LandingPage/Aboutus";
import Weserve from "../LandingPage/Weserve";
import Latestnotics from "../LandingPage/Latestnotics";
import Faq from "../LandingPage/Faq";
import Testimonial from "../LandingPage/Testimonial";
import Footer from "../LandingPage/Footer";
import "./Banner.css";
import Pricing from "../LandingPage/Pricing";
import { Link } from "react-router-dom";
import NoticesSection from "../LandingPage/Noticecount";
import StickyNotice from "../PostNoticesSticky/page";
const BannerSection = () => {
  return (
    <>
      <section className="relative">
        <Header />

        {/* Banner Image */}
        <img
          src={banner}
          alt="banner"
          className="w-full h-full sm:h-full object-cover"
        />

        {/* Text and Button Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center p-8 sm:p-20 text-white">
          {/* Heading and Subtext */}
          <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold mt-4 mb-4 leading-tight sm:leading-normal max-w-xs sm:max-w-2xl">
            Professional Notices Delivered Fast and Efficiently
          </h1>
          <p className="text-base sm:text-lg max-w-sm sm:max-w-lg mb-6">
            Your trusted source for real estate, corporate, and legal notices —
            connecting professionals with the information that matters
          </p>

          {/* Buttons Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Left Side Buttons */}
            <div className="flex space-x-0 sm:space-x-4 sm:flex-row flex-col">
              {/* <button className="px-6 py-3 bg-[#A99067] text-black font-semibold rounded hover:bg-opacity-90 transition">
                Post Notice
              </button> */}
              <Link to="/Home">
                <button className="px-6 py-3 bg-[#A99067] text-[#001A3B] font-semibold rounded hover:bg-white hover:text-black transition mt-4 sm:mt-0">
                  Explore Notices
                </button>
              </Link>
            </div>

            {/* Right Side - Read More Image Button */}
            <div className="w-32 sm:w-40 h-12 sm:h-20 mr-auto flex items-center justify-start">
              <Link to="/about">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-12 h-12 sm:w-11 sm:h-11 text-[#A99067] transition-transform transform hover:scale-110"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12h8" />
                  <path d="m12 16 4-4-4-4" />
                </svg>
              </Link>
            </div>




          </div>
        </div>
      </section>
      {/* Main Content Sections */}
      <StickyNotice/>
      <Aboutus />
      <NoticesSection/>
      <Feature />
      <Latestnotics />
      <Weserve />
      {/* <Pricing /> */}
      <Faq />
      <Testimonial />
      <Footer />
    </>
  );
};

export default BannerSection;
