import React from "react";
import cta from "../assets/banner/cta.png";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <div className="relative before:absolute before:w-full before:h-full before:z-10">
      <img
        src={cta}
        alt="Banner Image"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="min-h-[350px] relative z-50 h-full max-w-4xl mx-auto flex flex-col justify-center items-center text-center p-6">
        <h2 className="text-white md:text-5xl text-3xl font-bold mb-8">
          Make Your Notice<span className="text-[#A99067]"> Matter</span>
        </h2>
        <p className="text-lg text-center text-gray-200">
          Post your notices quickly and efficiently with our intuitive upload
          tools. Whether it's corporate updates, legal announcements, or real
          estate information, ensure your message reaches the right audience.
        </p>
        <Link
          to="/post-notices"
          className="mt-12 text-base font-semibold py-2.5 px-5 border-2 border-[#A99067] hover:bg-transparent hover:text-[#A99067] hover:border-[#A99067] bg-[#A99067] text-white rounded"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Post a Notice Now
        </Link>

      </div>
    </div>
  );
};

export default CTA;
