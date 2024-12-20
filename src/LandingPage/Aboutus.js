import React from "react";

const Aboutus = () => {
  return (
    <div className="p-4">
      <div className="p-6 md:p-14">
        
        {/* Responsive grid with a single-column layout on mobile */}
        <div className="grid gap-6 md:grid-cols-[auto_1fr] md:gap-12 md:ml-[110px]">
          
          <div className="max-w-xs mx-auto md:mx-0 text-center md:text-left">
            {/* About EERA Heading */}
            <h2 className="text-3xl font-semibold mb-2 leading-10">
              <span className="text-[#001A3B]">About</span>
              <br />
              <span className="text-[#A99067]">EERA</span>
            </h2>
          </div>
          
          <div className="text-center md:text-left items-center mx-auto md:mx-0">
            <p
              className="max-w-xs md:max-w-3xl mb-4 font-medium text-md text-justify md:text-left"
              style={{ color: "rgba(0, 26, 59, 0.8)" }}
            >
              At EERA, we are dedicated to bridging the gap between professional
              communication and fast, accessible updates. Whether you're in real
              estate, corporate governance, or legal compliance, we offer a
              platform designed to streamline critical notices. Our solution
              ensures that professionals, business leaders, and regulatory
              bodies have instant access to the latest updates and legal
              documents, ensuring compliance and operational efficiency.
            </p>

            <button
              type="button"
              className="mt-4 text-[#A99067] text-md tracking-wider font-medium outline-none"
            >
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
