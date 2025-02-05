import React from "react";
import feacture from "../assets/banner/Mask group.png";

const Feature = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 font-[PT Serif]">
      <div className="grid xl:grid-cols-2 gap-10 items-center">
        {/* Image Section */}
        <div className="flex justify-center xl:justify-start">
          <img
            src={feacture}
            className="rounded-lg shadow-lg"
            alt="Feature section"
            style={{ width: "500px", height: "650px", objectFit: "cover" }}
          />
        </div>

        {/* Features Section */}
        <div className="space-y-8">
          {/* Title */}
          <div className="text-center xl:text-left">
            <h1 className="text-4xl font-bold text-[#001A3B]">Our</h1>
            <h1 className="text-4xl font-bold text-[#A99067]">Key Features</h1>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                number: "01",
                title: "Browse and Access Notices Instantly",
                desc: "Quickly browse the latest legal and corporate updates. Filter by date, category, or region for fast, personalized access.",
              },
              {
                number: "02",
                title: "Posting Notices Made Simple",
                desc: "Effortlessly post real estate and corporate notices with our easy-to-use interface. Streamline the submission process with clear forms and instant publication.",
              },
              {
                number: "03",
                title: "Download and Enquire Anytime",
                desc: "Download detailed notices or make inquiries with just one click. Always stay ahead of deadlines and legal requirements.",
              },
              {
                number: "04",
                title: "Legal and Regulatory Compliance Updates",
                desc: "Receive timely notifications on new laws, policy changes, and compliance requirements, helping you stay compliant with industry standards.",
              },
            ].map((feature, index) => (
              <div key={index} className="p-5 border-l-4 border-[#A99067] shadow-md bg-white rounded-lg">
                <h1 className="text-2xl font-bold text-[#001A3B]">{feature.number}</h1>
                <h3 className="text-[#001A3B] text-lg font-semibold mt-3 mb-3">{feature.title}</h3>
                <p className="text-[#001A3B] text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Read More Button */}
          
        </div>
      </div>
    </div>
  );
};

export default Feature;
