import React from "react";
import groupdiscussion from "../assets/banner/groupdiscussion.jpg";
import Webheader from "./Notices/Webheader";
import Homeheader from "./Notices/Homewebheader";
import WebFooter from "./Notices/WebFooter";

const About = () => {
  return (
    <>
    <Homeheader />
    <section className="flex mb-8 mt-24">
      <div className="w-full max-w-6xl grid grid-cols-5 gap-6 mx-auto">

        {/* About Us Title and Get Started Button */}
        <div className="col-span-2 p-4">
          <p className="text-[#001A3BCC] text-4xl font-bold mb-2">About Us</p>
          <h2 className="text-xl text-[#001A3BCC] font-semibold mb-2">
          Empowering India with Transparent Public Information
          </h2>
        
        </div>

        {/* Introductory Text */}
        <div className="col-span-3 p-4 font-semibold text-[#001A3BCC] mt-12">
          <p className="text-md">
          We are committed to fostering transparency, accountability, and informed citizenship across India. Our platform serves as a centralized hub for accessing a wide range of public notices, ensuring that vital information reaches every corner of our diverse nation.
          </p>
        </div>

        {/* Main Image with Our Story Overlay */}
        <div className="col-span-3 row-span-2 relative">
          <img
            src={groupdiscussion}
            alt="Our Story"
            className="w-full h-90 object-cover rounded-lg"
          />
          <div className="absolute bottom-0 left-0 w-full p-4 rounded-b-lg text-white">
            <h3 className="font-semibold text-2xl mb-4">Our Story</h3>
            <p className="text-md mb-6">
              TechInnovate, a leading IT company, revolutionizes the industry
              with cutting-edge AI solutions, driving innovation and
              connectivity for businesses worldwide.
            </p>
          </div>
        </div>

        {/* Mission Card */}
{/* Mission Card */}
<div className="col-span-2 bg-[#A9906766] p-4 rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg">
  <h3 className="text-2xl font-semibold mb-3">Our Mission</h3>
  <p className="text-md text-gray-600">
  To empower Indian citizens by providing easy, timely access to public notices from various government entities, institutions, and organizations. We believe that an informed public is the cornerstone of a thriving democracy.
  </p>
</div>

{/* Vision Card */}
<div className="col-span-2 bg-[#001A3B] p-4 rounded-lg text-white transition-transform transform hover:scale-105 hover:shadow-lg">
  <h3 className="text-2xl font-semibold mb-3">Our Vision</h3>
  <p className="text-md">
  To be India's premier digital hub for public information, fostering a transparent and informed society where every citizen has easy access to essential notifications and government communications.
  </p>
</div>

      </div>
    </section>

    <WebFooter />
     

    </>
  );
};

export default About;
