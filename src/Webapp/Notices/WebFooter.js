import React from "react";
import { Link } from "react-router-dom";

const WebFooter = () => {
    return (
        
            <footer
              className="py-12 px-4 sm:px-8 tracking-wide"
              style={{ background: 'linear-gradient(180.24deg, #001A3B 0.24%, #00040A 110.27%)' }}
            >
        <div className="grid max-sm:grid-cols-1 max-lg:grid-cols-2 lg:grid-cols-5 lg:gap-14 max-lg:gap-8">
          <div className="lg:col-span-2 text-left">
            <h4 className="text-4xl font-bold mb-4 text-[#fff]">EERA</h4>
            <p className="text-[#A99067] text-[15px]">
            Get started now try our product
            </p>
            <div>
  <ul className="space-y-4 mt-4">
    <li className="flex items-center">
      <i className="fas fa-envelope text-white mr-2"></i>
      <a href="mailto:Email@address.com" className="text-white hover:text-[#A99067] text-[15px]">Email@address.com</a>
    </li>
    <li className="flex items-center">
      <i className="fas fa-phone text-white mr-2"></i>
      <a href="tel:001-265-6526" className="text-white hover:text-[#A99067] text-[15px]">001-265-6526</a>
    </li>
    <li className="flex items-center">
      <i className="fas fa-map-marker-alt text-white mr-2"></i>
      <span className="text-white hover:text-[#A99067] text-[15px]">Somewhere in India, 410000</span>
    </li>
  </ul>
</div>
          </div>
  
          <div>
            <h4 className="text-lg font-bold mb-6 text-[#fff]">Services</h4>
            <ul className="space-y-4">
              <li><a href="javascript:void(0)" className="text-white hover:text-[#A99067] text-[15px]">Web Development</a></li>
              <li><a href="javascript:void(0)" className="text-white hover:text-[#A99067] text-[15px]">Mobile App Development</a></li>
              <li><a href="javascript:void(0)" className="text-white hover:text-[#A99067] text-[15px]">UI/UX Design</a></li>
              <li><a href="javascript:void(0)" className="text-white hover:text-[#A99067] text-[15px]">Digital Marketing</a></li>
            </ul>
          </div>
  
          <div>
            <h4 className="text-lg font-bold mb-6 text-[#fff]">Resources</h4>
            <ul className="space-y-4">
              <li><a href="javascript:void(0)" className="text-white hover:text-[#A99067] text-[15px]">Webinars</a></li>
              <li><a href="javascript:void(0)" className="text-white hover:text-[#A99067] text-[15px]">Ebooks</a></li>
              <li><a href="javascript:void(0)" className="text-white hover:text-[#A99067] text-[15px]">Templates</a></li>
              <li><a href="javascript:void(0)" className="text-white hover:text-[#A99067] text-[15px]">Tutorials</a></li>
            </ul>
          </div>
  
          <div>
            <h4 className="text-lg font-bold mb-6 text-[#fff]">About Us</h4>
            <ul className="space-y-4">
              <li><a href="javascript:void(0)" className="text-white hover:text-[#A99067] text-[15px]">Our Story</a></li>
              <li><a href="javascript:void(0)" className="text-white hover:text-[#A99067] text-[15px]">Mission and Values</a></li>
              <li><a href="javascript:void(0)" className="text-white hover:text-[#A99067] text-[15px]">Team</a></li>
              <li><a href="javascript:void(0)" className="text-white hover:text-[#A99067] text-[15px]">Testimonials</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex justify-between items-center text-gray-600 text-[15px] border-t border-gray-300 pt-4">
        <div className="hover:text-[#A99067] text-white">© 2024 EERA Inc. Copyright and rights reserved</div>
        <div className="space-x-4">
          <Link to='' className="hover:text-[#A99067] text-white">Terms and Conditions</Link>
          
          <Link to='' className="hover:text-[#A99067] text-white">Privacy Policy</Link>
          
        </div>
      </div>
      </footer>
    );
  };
  
  export default WebFooter;
  