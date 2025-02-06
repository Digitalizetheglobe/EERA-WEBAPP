import React, { useState } from "react";
import testimonial from '../assets/banner/Testimonial.png';
import { Link } from "react-router-dom";
import user from '../assets/testimonialuser/Ellipse 54.svg';
import user1 from '../assets/testimonialuser/Ellipse 55.svg';
import user2 from '../assets/testimonialuser/Ellipse 56.svg';
import user3 from '../assets/testimonialuser/Ellipse 57.svg';
import user4 from '../assets/testimonialuser/Ellipse 56.svg'; // Add the 5th user image
import next from '../assets/testimonialuser/Group 215.svg'; // Next button image
import quote from '../assets/testimonialuser/Group 212.svg'

const Testimonial = () => {
  const [currentSet, setCurrentSet] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showForm, setShowForm] = useState(false);

  const avatarSets = [
    [user, user1, user2, user3],
    [user2, user3, user4, user1],
  ];

  const testimonials = [
    { quote: "I am very helped by this E-wallet application, my days are very easy to use this application and it's very helpful in my life, even I can pay in a short time.", name: "Aris Zinanrio" },
    { quote: "EERA has made my transactions simpler and faster, I never worry about delays anymore. It's truly a lifesaver!", name: "John Doe" },
    { quote: "The best payment management system I've used! It helped me handle payments globally without any hassle.", name: "Jane Smith" },
    { quote: "EERA has changed the way I manage my finances. It's quick, easy, and efficient. Highly recommend it!", name: "Emily Watson" },
    { quote: "Managing payments worldwide has become much simpler. EERA is fast and reliable, and it makes everything so easy.", name: "Alex Johnson" },
  ];

  const handleNextClick = () => {
    setCurrentSet((prevSet) => (prevSet + 1) % avatarSets.length);
  };

  const handleAvatarClick = (index) => {
    setCurrentTestimonial(index);
  };

  return (
    <div
      id="contact"
      className="flex flex-col md:flex-row bg-cover bg-center h-screen items-center justify-center p-4 md:p-0"
      style={{ backgroundImage: `url(${testimonial})` }}
    >
      {/* Mobile View: Form Toggle Button */}
      <button 
        className="md:hidden bg-[#002244] text-white font-semibold py-2 px-4 rounded-md mb-4"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Close Form" : "Contact Form"}
      </button>
      
      {/* Form for Mobile View */}
      {showForm && (
        <div className="p-8 w-full md:w-1/3 rounded-md shadow-lg" style={{ background: 'rgba(169, 144, 103, 0.8)' }}>
          <form className="flex flex-col">
            <label className="mb-2 text-white">Full Name</label>
            <input type="text" placeholder="Enter your full name" className="mb-4 p-3 rounded-md border focus:outline-none" />
            <label className="mb-2 text-white">Email</label>
            <input type="email" placeholder="Enter your email" className="mb-4 p-3 rounded-md border focus:outline-none" />
            <label className="mb-2 text-white">Mobile Number</label>
            <input type="tel" placeholder="Enter your mobile number" className="mb-4 p-3 rounded-md border focus:outline-none" />
            <label className="mb-2 text-white">Subject</label>
            <input type="text" placeholder="Enter the subject" className="mb-4 p-3 rounded-md border focus:outline-none" />
            <button className="bg-[#002244] text-white font-semibold py-3 rounded-md hover:bg-[#00172E]">Submit</button>
          </form>
        </div>
      )}

      {/* Left Side: Testimonial */}
      {!showForm && (
        <div className="max-w-xl gap-6 relative mb-8 md:mb-0 md:mr-8">
          <h2 className="text-4xl text-white font-bold mb-4">People are Saying About <span className="text-[#A99067]">EERA</span></h2>
          <p className="mb-6 text-white">Everything you need to accept payment and grow your money or manage anywhere on the planet</p>
          <div className="relative mb-4">
            <img src={quote} alt="quote-icon" className="w-10 h-10 opacity-50 mb-[-20px]" />
          </div>
          <blockquote className="mb-6 text-lg text-white">"{testimonials[currentTestimonial].quote}"</blockquote>
          <p className="font-semibold text-[#A99067]">- {testimonials[currentTestimonial].name}</p>
          <div className="flex items-center mt-6">
            {avatarSets[currentSet].map((avatar, index) => (
              <img key={index} src={avatar} alt={`User ${index + 1}`} className="w-10 h-10 rounded-full mr-3 cursor-pointer" onClick={() => handleAvatarClick(index)} />
            ))}
            <img src={next} alt="Next" className="w-10 h-10 rounded-full cursor-pointer" onClick={handleNextClick} />
          </div>
        </div>
      )}
      
      {/* Web View: Form */}
      <div className="hidden md:block p-8 w-full md:w-1/3 rounded-md shadow-lg" style={{ background: 'rgba(169, 144, 103, 0.8)' }}>
        <form className="flex flex-col">
          <label className="mb-2 text-white">Full Name</label>
          <input type="text" placeholder="Enter your full name" className="mb-4 p-3 rounded-md border focus:outline-none" />
          <label className="mb-2 text-white">Email</label>
          <input type="email" placeholder="Enter your email" className="mb-4 p-3 rounded-md border focus:outline-none" />
          <label className="mb-2 text-white">Mobile Number</label>
          <input type="tel" placeholder="Enter your mobile number" className="mb-4 p-3 rounded-md border focus:outline-none" />
          <label className="mb-2 text-white">Subject</label>
          <input type="text" placeholder="Enter the subject" className="mb-4 p-3 rounded-md border focus:outline-none" />
          <button className="bg-[#002244] text-white font-semibold py-3 rounded-md hover:bg-[#00172E]">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Testimonial;