import React from "react";
import banner from "../assets/banner/1HIMW2VTQLimGQKOEOzmaw 1.png";
import readmore from "../assets/banner/Group 2.png";
// import Header from "../Header/Header";
import Feature from "../LandingPage/Feature";
//import Aboutus from "../LandingPage/Aboutus";
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
import Header from "../Header/Header2";
import Aboutus from "../LandingPage/Aboutus2";

const BannerSection = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="relative z-50 bg-white shadow-md w-full">
        <Header />
      </div>

      {/* Banner Section */}
      <section className="relative flex-grow">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#051c35] to-transparent z-10"></div>

        {/* Banner Image with responsive handling */}
        <div className="relative h-[60vh] lg:h-[80vh] w-full">
          <img
            src={banner}
            alt="banner"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl lg:max-w-3xl space-y-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Professional Notices Delivered Fast and Efficiently
              </h1>
              
              <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-prose">
                Your trusted source for real estate, corporate, and legal notices —
                connecting professionals with the information that matters
              </p>

              {/* Responsive Button Container */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link
                  to="/home2"
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded px-6 py-3 bg-[#A99067] text-[#001A3B] hover:bg-[#dfbc8c] transition-all duration-300 w-full sm:w-auto"
                >
                  <span className="absolute right-0 translate-x-full transition-transform duration-300 group-hover:translate-x-4">
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                  <span className="text-base sm:text-lg font-bold group-hover:translate-x-[-1rem] transition-transform duration-300">
                    Explore Notices
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <main className="flex-grow">
        <StickyNotice />
        <Aboutus />
        <Feature />
        <Latestnotics />
        <Weserve />
        <Faq />
        <Testimonial />
        <Footer />
      </main>
    </div>
  );
};

export default BannerSection;
