import React from "react";
import { motion } from "framer-motion";
import feacture from "../assets/law.jpeg";

const Feature = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-5 font-[PT Serif]">
      <motion.div 
        className="grid xl:grid-cols-2 gap-10 items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}  
        transition={{ duration: 1 }}
      >
        {/* Image Section */}
        <motion.div
          className="flex justify-center xl:justify-start"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src={feacture}
            className="rounded-lg shadow-lg"
            alt="Feature section"
            style={{ width: "500px", height: "650px", objectFit: "cover" }}
          />
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="space-y-8"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Title */}
          <div className="text-center xl:text-left">
            <motion.h1 className="text-4xl font-bold text-[#001A3B]" whileHover={{ scale: 1.1 }}>
              Our
            </motion.h1>
            <motion.h1 className="text-4xl font-bold text-[#A99067]" whileHover={{ scale: 1.1 }}>
              Key Features
            </motion.h1>
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
              <motion.div
                key={index}
                className="p-5 border-l-4 border-[#A99067] shadow-md bg-white rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.1, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <h1 className="text-2xl font-bold text-[#001A3B]">{feature.number}</h1>
                <h3 className="text-[#001A3B] text-lg font-semibold mt-3 mb-3">{feature.title}</h3>
                <p className="text-[#001A3B] text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Feature;