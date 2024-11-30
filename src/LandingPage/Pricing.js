import React, { useState } from 'react';
import premiumImg from '../assets/banner/Premium.png';
import pp from '../assets/icons/pp.svg'
import pp1 from '../assets/icons/pp1.svg'
import pp2 from '../assets/icons/pp2.svg'

const Pricing = () => {
  const [isMonthly, setIsMonthly] = useState(true);

  return (
    <div className="px-6 py-8">
      <div className="max-w-5xl mx-auto text-center">
        {/* Title Section */}
        <h2 className="text-4xl text-[#001A3B] font-bold mb-2">
          Our <span className="text-[#A99067]">Subscription Plans</span> 
        </h2>
        <p className="text-gray-500">Select the plan that fits your needs best.</p>

        {/* Monthly/Yearly Toggle */}
        <div className="flex justify-center bg-gray-100 rounded-md max-w-xs mx-auto p-1 mt-6">
          <button
            onClick={() => setIsMonthly(true)}
            className={`w-1/2 text-sm py-2 px-4 rounded-md ${
              isMonthly ? 'bg-blue-100 text-black' : 'text-gray-700'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsMonthly(false)}
            className={`w-1/2 text-sm py-2 px-4 rounded-md ${
              !isMonthly ? 'bg-blue-100 text-black' : 'text-gray-700'
            }`}
          >
            Yearly
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6 mt-12">
          {/* Basic Plan */}
          <div className="relative border rounded-lg p-6 shadow-md bg-white flex flex-col justify-between">
          <div className="text-left flex-grow">
            <img src={pp} className='w-12 h-12'/>
           
              <h3 className="text-3xl font-semibold mb-2">Basic</h3>
              <p className="text-sm text-gray-500 mb-4">Ideal for those looking to stay updated with basic access.</p>
              <div className="text-3xl font-bold mt-4">
                {isMonthly ? "$9.99" : "$99.99"} <span className="text-sm font-medium">per month</span>
              </div>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center text-sm text-gray-700">
                  <svg className="w-4 h-4 mr-2 bg-[#E2E8FC] rounded-full fill-blue-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" />
                  </svg>
                  Access to basic public notices
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <svg className="w-4 h-4 mr-2 bg-[#E2E8FC] rounded-full fill-blue-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" />
                  </svg>
                  Save up to 5 notices
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <svg className="w-4 h-4 mr-2 bg-[#E2E8FC] rounded-full fill-blue-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" />
                  </svg>
                  Weekly newsletter updates
                </li>
              </ul>
              
            </div>
            <button
                type="button"
                className="w-full mt-auto mt-6 py-2.5 text-sm font-semibold rounded-md border border-gray-800 text-gray-800 hover:bg-gray-100"
              >
                Get Started
              </button>
          </div>

          {/* Premium Plan */}
          <div
            className="relative border rounded-lg p-6 shadow-md bg-cover bg-no-repeat flex flex-col justify-between"
            style={{ backgroundImage: `url(${premiumImg})` }}
          >
                         <div className="text-left flex-grow">
             <img src={pp1} className='w-12 h-12'/>

              <h3 className="text-3xl font-semibold mb-2">Premium <span className="px-2 py-1 text-xs font-semibold text-white bg-transparent border border-white rounded-full ml-2">Best Offer</span></h3>
              <p className="text-sm text-gray-500">Perfect for regular users needing comprehensive notice access.</p>
              <div className="text-3xl font-bold mt-4">
                {isMonthly ? "$19.99" : "$199.99"} <span className="text-sm font-medium">per month</span>
              </div>
              <ul className="mt-6 space-y-3 ">
                <li className="flex items-center text-sm text-gray-700">
                  <svg className="w-4 h-4 mr-2 bg-[#E2E8FC] rounded-full fill-blue-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" />
                  </svg>
                  Access to all public notices
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <svg className="w-4 h-4 mr-2 bg-[#E2E8FC] rounded-full fill-blue-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" />
                  </svg>
                  Save up to 20 notices
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <svg className="w-4 h-4 mr-2 bg-[#E2E8FC] rounded-full fill-blue-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" />
                  </svg>
                  Daily newsletter updates
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <svg className="w-4 h-4 mr-2 bg-[#E2E8FC] rounded-full fill-blue-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" />
                  </svg>
                  Priority support
                </li>
              </ul>
             
            </div>
            <button
                type="button"
                className="w-full mt-auto mt-6 py-2.5 text-sm font-semibold border border-[#1B223C] rounded-md bg-[#1B223C] text-white hover:text-black hover:bg-transparent"
              >
                Get Started
              </button>
       
          </div>

          {/* Pro Plan */}
          <div className="relative border rounded-lg p-6 shadow-md bg-white flex flex-col justify-between">
          <img src={pp2} className='w-12 h-12'/>
            <div className="text-left flex-grow">
              <h3 className="text-3xl font-semibold mb-2">Pro</h3>
              <p className="text-sm text-gray-500">All-inclusive for professionals who need it all.</p>
              <div className="text-3xl font-bold mt-4">
                {isMonthly ? "$29.99" : "$299.99"} <span className="text-sm font-medium">per month</span>
              </div>
              <ul className="mt-6 space-y-3 text-left mx-auto w-fit">
                <li className="flex items-center text-sm text-gray-700">
                  <svg className="w-4 h-4 mr-2 bg-[#E2E8FC] rounded-full fill-blue-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" />
                  </svg>
                  Unlimited access to public notices
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <svg className="w-4 h-4 mr-2 bg-[#E2E8FC] rounded-full fill-blue-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" />
                  </svg>
                  Save unlimited notices
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <svg className="w-4 h-4 mr-2 bg-[#E2E8FC] rounded-full fill-blue-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" />
                  </svg>
                  Instant notification alerts
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <svg className="w-4 h-4 mr-2 bg-[#E2E8FC] rounded-full fill-blue-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" />
                  </svg>
                  One-on-one consultation with legal advisors
                </li>
              </ul>             
            </div>
            <button
                type="button"
                className="w-full mt-6 py-2.5 text-sm font-semibold rounded-md border border-gray-800 text-gray-800 hover:bg-gray-100"
              >
                Get Started
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
