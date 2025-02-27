import React from "react";
import groupdiscussion from "../assets/banner/groupdiscussion.jpg";
import Webheader from "./Notices/Webheader";
import Header from "./Home/HomeHeader";
import WebFooter from "./Notices/WebFooter";
import Post from "./PostNotice/post";

const About = () => {
  return (
    <>
      <Header />
      <section 
        className="flex mb-8 mt-2 px-4 md:px-6"
        style={{ 
          fontFamily: "'PT Serif', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif" 
        }}
      >
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* About Us Title and Get Started Button */}
            <div className="md:col-span-2 p-4">
              <p className="text-[#001A3BCC] text-4xl md:text-5xl font-bold mb-2">
                About Us
              </p>
              <h2 className="text-lg md:text-xl text-[#001A3BCC] font-semibold mb-2">
                Empowering India with Transparent Public Information
              </h2>
            </div>

            {/* Introductory Text */}
            <div className="md:col-span-3 p-4 font-semibold text-[#001A3BCC] md:mt-12">
              <p className="text-md md:text-lg">
                We are committed to fostering transparency, accountability, and informed citizenship across India. Our platform serves as a centralized hub for accessing a wide range of public notices, ensuring that vital information reaches every corner of our diverse nation.
              </p>
            </div>

            {/* Main Image with Our Story Overlay */}
            <div className="md:col-span-3 md:row-span-2 relative mb-6">
              <img
                src={groupdiscussion}
                alt="Our Story"
                className="w-full h-[300px] md:h-[400px] object-cover rounded-lg"
              />
              {/* Black overlay */}
              <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>

              <div className="absolute bottom-0 left-0 w-full p-4 rounded-b-lg text-white">
                <h3 className="font-semibold text-3xl md:text-4xl mb-2 md:mb-4">
                  Our Story
                </h3>
                <p className="text-sm md:text-md mb-4 md:mb-6">
                  We set out to make public notices easily accessible to every Indian citizen. Government updates often get lost in bureaucracy, leaving people uninformed. Our platform bridges this gap, ensuring transparency and awareness by consolidating vital notifications in one place. With technology at our core, we empower citizens with timely, reliable information—because an informed society is a stronger democracy.
                </p>
              </div>
            </div>

            {/* Mission and Vision Cards Container */}
            <div className="md:col-span-2 grid grid-cols-1 gap-6">
              {/* Mission Card */}
              <div className="bg-[#A9906766] p-4 rounded-lg transition-transform hover:scale-105 hover:shadow-lg my-4">
                <h3 className="text-xl md:text-2xl font-semibold mb-3">
                  Our Mission
                </h3>
                <p className="text-sm md:text-md text-gray-600">
                  To empower Indian citizens by providing easy, timely access to public notices from various government entities, institutions, and organizations. We believe that an informed public is the cornerstone of a thriving democracy.
                </p>
              </div>

              {/* Vision Card */}
              <div className="bg-[#001A3B] p-4 rounded-lg text-white transition-transform hover:scale-105 hover:shadow-lg my-4">
                <h3 className="text-xl md:text-2xl font-semibold mb-3">
                  Our Vision
                </h3>
                <p className="text-sm md:text-md">
                  To be India's premier digital hub for public information, fostering a transparent and informed society where every citizen has easy access to essential notifications and government communications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Post/>
      <WebFooter />
    </>
  );
};

export default About;