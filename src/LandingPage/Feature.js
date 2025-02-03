import React from "react";
import feacture from "../assets/banner/Mask group.png";

const Feature = () => {
  return (
    <div className="max-w-6xl max-md:max-w-xl mx-auto font-[PT Serif]">
      <div className="grid xl:grid-cols-2 md:grid-cols-2 items-center">
        {/* Image Section */}
        <div className="row-span-2 mb-6">
          <img
            src={feacture}
            className="rounded-md"
            alt="Feature section"
            style={{ width: "470px", height: "650px" }}
          />
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 flex items-center space-x-2 font-[700] p-4">
            <h1 className="text-5xl font-semibold text-[#001A3B] mt-6">Our</h1>
            <h1 className="text-5xl font-semibold text-[#A99067] mt-6">
              Key Features
            </h1>
          </div>

          <div className="text-left p-5">
            <h1 className="text-xl font-semibold">01</h1>

            <h3 className="text-[#001A3B] text-xl font-[600] mt-3 mb-3">
              Browse and Access Notices Instantly
            </h3>
            <p className="text-[#001A3B] text-sm leading-relaxed" style={{fontSize:'15px'}}>
              Quickly browse the latest legal and corporate updates. Filter by
              date, category, or region for fast, personalized access.
            </p>
          </div>

          <div className="text-left p-5">
            <h1 className="text-xl font-semibold">02</h1>

            <h3 className="text-[#001A3B] text-xl font-semibold mt-3 mb-3">
              Posting Notices Made Simple
            </h3>
            <p className="text-[#001A3B] text-sm leading-relaxed" style={{fontSize:'15px'}}>
              Effortlessly post real estate and corporate notices with our
              easy-to-use interface. Streamline the submission process with
              clear forms and instant publication.
            </p>
          </div>

          <div className="text-left p-5">
            <h1 className="text-xl font-semibold">03</h1>
            <h3 className="text-[#001A3B] text-xl font-semibold mt-3 mb-3">
              Download and Enquire Anytime
            </h3>
            <p className="text-[#001A3B] text-sm leading-relaxed" style={{fontSize:'15px'}}>
              Download detailed notices or make inquiries with just one click.
              Always stay ahead of deadlines and legal requirements.
            </p>
          </div>

          <div className="text-left p-5">
            <h1 className="text-xl font-semibold">04</h1>
            <h3 className="text-[#001A3B] text-xl font-semibold mt-3 mb-3">
              Legal and Regulatory Compliance Updates
            </h3>
            <p className="text-[#001A3B] text-sm leading-relaxed" style={{fontSize:'15px'}}>
              Our platform ensures that you receive timely notifications on new
              laws, policy changes, and compliance requirements, helping you
              stay compliant with industry standards.
            </p>
          </div>
        </div>
        
        <div className="flex justify-start pl-4 mb-6">
          {/* <button className="text-[#A99067] font-semibold w-32 h-10 rounded-md border border-[#A99067]">
         Read More
          </button> */}
          </div>
      </div>
    </div>
  );
};

export default Feature;
