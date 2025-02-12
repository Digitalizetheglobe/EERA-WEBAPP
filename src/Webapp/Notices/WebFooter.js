import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaYoutube, FaInstagram, FaLinkedin } from "react-icons/fa";
const WebFooter = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  };
  return (
    <footer className="py-12 px-4 sm:px-8 tracking-wide text-white" style={{ background: 'linear-gradient(180.24deg, #001A3B 0.24%, #00040A 110.27%)' }}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* About Section */}
        <div>
          <img src="/logo.svg" alt="Company Logo" className="mb-4 w-32" />
          <h4 className="text-xl font-bold mb-4">About EERA</h4>
          <p className="text-[#A99067] text-sm">
            Get started now try our product. We provide high-quality services with transparency and customer focus.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h4 className="text-xl font-bold mb-4">Useful Links</h4>
          <ul className="space-y-2">
            <li><Link to="/post-notices" className="hover:text-[#A99067] text-sm " onClick={scrollToTop}>Post Your Notices</Link></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link to="/home" className="hover:text-[#A99067] text-sm" onClick={scrollToTop}>Home</Link></li>
            <li><Link to="/about" className="hover:text-[#A99067] text-sm" onClick={scrollToTop} >About Us</Link></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h4 className="text-xl font-bold mb-4">Contact Us</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center hover:text-[#A99067]"><FaMapMarkerAlt className="mr-2 hover:text-[#A99067]" /> Kohinoor World Tower, Pune, Maharashtra 411018</li>
            <li className="flex items-center"><FaPhone className="mr-2" /> <a href="tel:+917391092093" className="hover:text-[#A99067]">+91 7391092093</a></li>
            <li className="flex items-center"><FaEnvelope className="mr-2" /> <a href="mailto:contact@epublicnotices.in" className="hover:text-[#A99067]">contact@epublicnotices.in</a></li>
          </ul>
        </div>
      </div>
      
      {/* Footer Bottom */}
      <div className="mt-8 text-center text-sm border-t border-gray-700 pt-4 flex justify-between">
        <p>© 2025 EERA Inc. All rights reserved.</p>
        <Link to="/privacy-policy" className="hover:text-[#A99067]" onClick={scrollToTop}>Privacy Policy</Link>
      </div>
    </footer>
  );
};

export default WebFooter;