import React, { useState, useRef } from "react";
import testimonial from "../../assets/banner/Testimonial.png";
import user from "../../assets/testimonialuser/Ellipse 54.svg";
import user1 from "../../assets/testimonialuser/Ellipse 55.svg";
import user2 from "../../assets/testimonialuser/Ellipse 56.svg";
import user3 from "../../assets/testimonialuser/Ellipse 57.svg";
import user4 from "../../assets/testimonialuser/Ellipse 56.svg";
import next from "../../assets/testimonialuser/Group 215.svg";
import quote from "../../assets/testimonialuser/Group 212.svg";
import frame from "../../assets/icons/Frame 36.png";

const Webtestimonial = () => {
  const [currentSet, setCurrentSet] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const contactRef = useRef(null);

  const avatarSets = [
    [user, user1, user2, user3],
    [user2, user3, user4, user1],
  ];

  const testimonials = [
    {
      quote:
        "I am very helped by this E-wallet application, my days are very easy to use this application and it's very helpful in my life, even I can pay in a short time.",
      name: "Aris Zinanrio",
    },
    {
      quote:
        "EERA has made my transactions simpler and faster, I never worry about delays anymore. It's truly a lifesaver!",
      name: "John Doe",
    },
    {
      quote:
        "The best payment management system I've used! It helped me handle payments globally without any hassle.",
      name: "Jane Smith",
    },
    {
      quote:
        "EERA has changed the way I manage my finances. It's quick, easy, and efficient. Highly recommend it!",
      name: "Emily Watson",
    },
    {
      quote:
        "Managing payments worldwide has become much simpler. EERA is fast and reliable, and it makes everything so easy.",
      name: "Alex Johnson",
    },
  ];

  const handleNextClick = () => {
    setCurrentSet((prevSet) => (prevSet + 1) % avatarSets.length);
  };

  const handleAvatarClick = (index) => {
    setCurrentTestimonial(index);
  };

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="contact"
      ref={contactRef}
      className="min-h-screen bg-cover bg-center py-8 px-4 md:py-16 md:px-8 flex flex-col md:flex-row items-center justify-center gap-8"
      style={{ backgroundImage: `url(${testimonial})` }}
    >
      {/* Testimonial Section */}
      <div className="w-full md:w-1/2 max-w-xl order-2 md:order-1">
        <h2 className="text-3xl md:text-4xl text-white font-bold mb-4">
          People are Saying About <span className="text-[#A99067]">EERA</span>
        </h2>
        <p className="mb-6 text-white text-sm md:text-base">
          Everything you need to accept payment and grow your money or manage
          anywhere on the planet
        </p>

        <div className="relative mb-4">
          <img
            src={quote}
            alt="quote-icon"
            className="w-8 md:w-10 h-8 md:h-10 opacity-50 mb-2"
          />
        </div>

        <blockquote className="mb-6 text-base md:text-lg text-white">
          "{testimonials[currentTestimonial].quote}"
        </blockquote>
        <p className="font-semibold text-[#A99067]">
          - {testimonials[currentTestimonial].name}
        </p>

        <div className="flex items-center mt-6 space-x-3">
          {avatarSets[currentSet].map((avatar, index) => (
            <img
              key={index}
              src={avatar}
              alt={`User ${index + 1}`}
              className="w-8 md:w-10 h-8 md:h-10 rounded-full cursor-pointer transition-transform hover:scale-110"
              onClick={() => handleAvatarClick(index)}
            />
          ))}
          <img
            src={next}
            alt="Next"
            className="w-8 md:w-10 h-8 md:h-10 rounded-full cursor-pointer transition-transform hover:scale-110"
            onClick={handleNextClick}
          />
        </div>
      </div>

      {/* Email Subscription Section */}
      <div className="w-full md:w-1/2 max-w-sm order-1 md:order-2">
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">
          Get Curated Notices Before Everyone Else!
        </h2>

        <div className="flex items-center bg-gray-200 bg-opacity-40 p-2 rounded-lg space-x-2">
          <div className="relative flex-1">
            <i className="fas fa-map-marker-alt absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
            <input
              type="text"
              placeholder="Your Email Address"
              className="w-full pl-10 p-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#A99067] placeholder-gray-500"
            />
          </div>
          <img 
            src={frame} 
            alt="Search Icon" 
            className="w-12 h-12 md:w-14 md:h-14 cursor-pointer transition-transform hover:scale-105" 
          />
        </div>
      </div>
    </section>
  );
};

export default Webtestimonial;