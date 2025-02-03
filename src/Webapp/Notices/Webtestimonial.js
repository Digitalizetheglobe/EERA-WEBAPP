import React, { useState, useRef } from "react";
import testimonial from "../../assets/banner/Testimonial.png";
import user from "../../assets/testimonialuser/Ellipse 54.svg";
import user1 from "../../assets/testimonialuser/Ellipse 55.svg";
import user2 from "../../assets/testimonialuser/Ellipse 56.svg";
import user3 from "../../assets/testimonialuser/Ellipse 57.svg";
import user4 from "../../assets/testimonialuser/Ellipse 56.svg"; // Add the 5th user image
import next from "../../assets/testimonialuser/Group 215.svg"; // Next button image
import quote from "../../assets/testimonialuser/Group 212.svg";
import frame from "../../assets/icons/Frame 36.png";

const Webtestimonial = () => {
  const [currentSet, setCurrentSet] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  // Ref for the contact section to scroll to it
  const contactRef = useRef(null);

  // Array of user avatars
  const avatarSets = [
    [user, user1, user2, user3],
    [user2, user3, user4, user1],
  ];

  // Array of testimonials for each user
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

  // Handle click on the next button to move to the next set of avatars
  const handleNextClick = () => {
    setCurrentSet((prevSet) => (prevSet + 1) % avatarSets.length); // Cycle through avatar sets
  };

  // Handle clicking on an avatar to change the testimonial
  const handleAvatarClick = (index) => {
    setCurrentTestimonial(index);
  };

  // Handle scroll to contact section
  const scrollToContact = () => {
    contactRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="contact"
      ref={contactRef} // Attach the ref to the contact section
      className="flex flex-col md:flex-row bg-cover bg-center h-screen items-center justify-center p-4 md:p-0"
      style={{ backgroundImage: `url(${testimonial})` }}
    >
      {/* Right Side: Form */}
      <div className="w-full max-w-sm mt-6 mx-auto">
        {/* Heading Above Search Bar */}
        <h2 className="text-4xl font-bold text-white mb-4">
          Get Curated Notices Before Everyone Else!
        </h2>

        <div className="flex items-center bg-gray-200 bg-opacity-40 p-2 rounded-lg space-x-2">
          {/* Title or Keyword Input with Icon */}
          <div className="relative w-full">
            <i className="fas fa-map-marker-alt absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
            <input
              type="text"
              placeholder="Your Email Address"
              className="w-full pl-10 p-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#A99067] placeholder-gray-500"
            />
          </div>

          {/* Search Button */}
          <img src={frame} alt="Search Icon" className="w-14 h-14" />
        </div>
      </div>

      {/* Left Side: Testimonial */}
      <div className="max-w-xl gap-6 relative mb-8 md:mb-0 md:mr-8">
        <h2 className="text-4xl text-white font-bold mb-4">
          People are Saying About <span className="text-[#A99067]">EERA</span>
        </h2>
        <p className="mb-6 text-white">
          Everything you need to accept payment and grow your money or manage
          anywhere on the planet
        </p>

        <div className="relative mb-4">
          <img
            src={quote}
            alt="quote-icon"
            className="w-10 h-10 opacity-50 mb-[-20px]"
          />
        </div>

        <blockquote className="mb-6 text-lg text-white">
          "{testimonials[currentTestimonial].quote}"
        </blockquote>
        <p className="font-semibold text-[#A99067]">
          - {testimonials[currentTestimonial].name}
        </p>

        {/* User Avatars */}
        <div className="flex items-center mt-6">
          {avatarSets[currentSet].map((avatar, index) => (
            <img
              key={index}
              src={avatar}
              alt={`User ${index + 1}`}
              className="w-10 h-10 rounded-full mr-3 cursor-pointer"
              onClick={() => handleAvatarClick(index)} // Change testimonial on avatar click
            />
          ))}
          <img
            src={next}
            alt="Next"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={handleNextClick} // Handle next button click
          />
        </div>
      </div>
    </section>
  );
};

export default Webtestimonial;
