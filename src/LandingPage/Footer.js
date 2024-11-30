import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        
            <footer
              className="py-12 px-4 sm:px-8 tracking-wide"
              style={{ background: 'linear-gradient(180.24deg, #001A3B 0.24%, #00040A 110.27%)' }}
            >
        <div className="grid max-sm:grid-cols-1 max-lg:grid-cols-2 lg:grid-cols-5 lg:gap-14 max-lg:gap-8">
          <div className="lg:col-span-2 text-left">
            <h4 className="text-4xl font-bold mb-6 text-[#A99067]">EERA</h4>
            <p className="text-[#A99067] text-[15px]">
            Get started now try our product
            </p>
            <div className="border-[#A99067] border flex px-4 py-3 rounded-md text-left mt-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px" className="fill-gray-500 mr-3 rotate-90">
                <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
              </svg>
              <input type="email" placeholder="Enter your email here" className="w-full outline-none bg-transparent text-[#fff] text-[15px]" />
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
  
  export default Footer;
  