import React from 'react';
import Header from '../Webapp/Home/HomeHeader';
import Footer from "../LandingPage/Footer"; // Import your footer component
import { Facebook, Twitter, Instagram, Phone, Mail, MapPin } from "lucide-react";

const ContactUs = () => {
  return (
    <>
      <Header /> {/* Include your header */}
      <div className="w-full min-h-screen flex flex-col">

        {/* Banner Section */}
        <div
          className=" h-64 bg-cover bg-center flex items-center justify-center relative overflow-hidden  duration-500"
          style={{ backgroundImage: "url('/Testimonial.png')" }}
        >
          <div className="absolute inset-0" />
          <h1 className="text-white text-4xl font-bold relative z-10 tracking-wide hover:text-[#A99067] transition-colors duration-300">
            Contact Us
          </h1>
        </div>

        <div className="max-w-6xl mx-auto w-full p-8 my-12">
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Contact Details */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-[#001A3B] mb-4 hover:text-[#A99067] transition-colors duration-300">
                  Get In Touch
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed hover:text-gray-800 transition-colors duration-300 mb-2">
                  Connect with us!
                </p>
                <p className="text-gray-600 text-lg leading-relaxed hover:text-gray-800 transition-colors duration-300">
                  We're always looking for ways to improve access to public information. Share your thoughts, suggestions, and feedback with our platform.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { icon: <Phone />, text: "+91 7391092093" },
                  { icon: <Mail />, text: "contact@epublicnotices.in" },
                  { icon: <MapPin />, text: "Kohinoor World Tower, Pune, Maharashtra 411018" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 group hover:text-[#001A3B] transition-colors duration-300">
                    <span className="text-2xl group-hover:scale-125 transition-transform duration-300">{item.icon}</span>
                    <p className="text-lg group-hover:underline transition-all duration-300">{item.text}</p>
                  </div>
                ))}
              </div>

              {/* Social Media */}
              <div className="pt-6">
                <h3 className="text-xl font-semibold mb-4 text-[#001A3B] hover:text-[#A99067] transition-colors duration-300">
                  Follow Us
                </h3>
                <div className="flex space-x-6">
                  {[
                    { icon: <Facebook size={24} />, link: "#" },
                    { icon: <Instagram size={24} />, link: "#" },
                  
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-[#001A3B] text-[#A99067] hover:bg-[#A99067] hover:text-[#001A3B] transition-colors duration-300 cursor-pointer hover:scale-110"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-xl p-8 transition-shadow duration-300">
              <h2 className="text-3xl font-bold text-[#001A3B] mb-8 text-center hover:text-[#A99067] transition-colors duration-300">
                Contact Form
              </h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { placeholder: "Name" },
                    { placeholder: "City" }
                  ].map((input, index) => (
                    <input
                      key={index}
                      type="text"
                      placeholder={input.placeholder}
                      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001A3B] focus:border-transparent transition-all duration-300 hover:border-[#001A3B]"
                    />
                  ))}
                </div>
                {[
                  { type: "email", placeholder: "Email" },
                  { type: "text", placeholder: "Phone" }
                ].map((input, index) => (
                  <input
                    key={index}
                    type={input.type}
                    placeholder={input.placeholder}
                    className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#001A3B] focus:border-transparent transition-all duration-300 hover:border-[#001A3B]"
                  />
                ))}
                <textarea
                  placeholder="Message"
                  rows="4"
                  className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#001A3B] focus:border-transparent transition-all duration-300 resize-none hover:border-[#001A3B]"
                ></textarea>
                <button className="w-full bg-[#001A3B] text-[#A99067] py-3 px-6 rounded-lg text-lg font-semibold hover:bg-[#A99067] hover:text-[#001A3B] transition-colors duration-300 transform hover:scale-105 active:scale-95">
                  Submit
                </button>
              </form>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-[#001A3B] mb-4 hover:text-[#A99067] transition-colors duration-300 text-center">
              Our Location
            </h2>
            <div className="w-full flex justify-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.650343622792!2d73.79664587519447!3d18.6347903824811!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b92d986822d9%3A0x13b0437cbf911d4a!2sKohinoor%20World%20Towers!5e0!3m2!1sen!2sin!4v1739359789161!5m2!1sen!2sin&z=15"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
        <Footer className="mt-auto" /> {/* Include your footer */}
      </div>
    </>
  );
};

export default ContactUs;
