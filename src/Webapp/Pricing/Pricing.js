
import React from "react";
import "../../Banner/Banner.css";
import WebFooter from "../Notices/WebFooter";
import Pricing from "../../LandingPage/Pricing";
import Webheader from "../Notices/Webheader";
import { Link } from "react-router-dom";
import arrow from '../../assets/logo/arrow.png';
const WebappPricing = () => {
  return (
<>
   <Webheader/>
   <nav className="bg-gray-100 py-2 px-4 text-sm flex items-center space-x-2">
          <div className="flex items-center space-x-2 mr-6">
            <Link to='/home' href="#" className="text-[#004B80] flex items-center space-x-2">
              <img src={arrow} className="w-3 h-3" alt="Back Arrow" />
              <span>Back</span>
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <Link to='/home' className="text-gray-500">Home</Link>
            <span className="text-gray-400">&gt;</span>
            <a href="#" className="text-[#004B80]">Pricing </a>
          </div>
        </nav>
   <Pricing />
    <WebFooter/>
    </>
  );
};

export default WebappPricing;
