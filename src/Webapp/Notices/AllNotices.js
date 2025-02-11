import React, { useState, useEffect } from 'react';
import noticesimg from '../../assets/banner/noticesimg.png';

function AllNotices2() {
  const [noticesCount, setNoticesCount] = useState(0);

  useEffect(() => {
    // Fetching the notices data from the API
    const fetchNotices = async () => {
      try {
        const response = await fetch('https://api.epublicnotices.in/notices');
        const data = await response.json();

        // Assuming the response data is an array of notices
        setNoticesCount(data.length); // Calculate the length of the array
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    };

    fetchNotices();
  }, []);

  return (        
    <div className="max-w-5xl max-md:max-w-xl mx-auto px-6 py-14 mb-6">
      <h2 className="text-2xl sm:text-3xl text-[#334862] font-bold text-center md:text-left">
        Focus on What Matters: Explore All{' '}
        <span className="text-[#A99067] font-extrabold">{noticesCount}</span> Notices
      </h2>
      
      <div className="flex flex-col md:flex-row gap-12 items-start mt-8">
        {/* Image Section */}
        <div className="w-full max-w-xs mx-auto md:mx-0">
          <img src={noticesimg} alt="Notices" className="rounded-lg object-cover" />
        </div>

        {/* Organized by Category Section */}
        <div className="flex-1">
          <p className="text-lg font-semibold text-gray-800 mb-6">Organized by Category</p>
          <div className="grid lg:grid-cols-2 gap-6">
            {[
              { number: '01', title: 'Legal Notices' },
              { number: '02', title: 'Planning Applications' },
              { number: '03', title: 'Government Notices' },
              { number: '04', title: 'Financial Notices' },
              { number: '05', title: 'Environmental Notices' },
              { number: '06', title: 'Municipal Announcements' },
              { number: '07', title: 'Corporate Disclosures' },
              { number: '08', title: 'Public Safety Alerts' },
            ].map((category, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-2 rounded-lg"
              >
                {/* Square background for number */}
                <div className="bg-[#D2C6B2] text-[#001A3BCC] text-lg font-bold rounded-md w-10 h-10 flex items-center justify-center">
                  {category.number}
                </div>
                <div>
                  <p className="font-semibold text-[#334862]">{category.title}</p>
                  <div className="flex gap-2">
                    {/* Notices text in gray color */}
                    <p className="text-sm text-gray-600 cursor-pointer hover:underline">
                      51 Notices
                    </p>
                    {/* Access Notices text in blue color */}
                    <p className="text-sm text-[#0E619C] cursor-pointer hover:underline">
                      | Access Notices
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div> 
        </div>
      </div>
    </div>
  );
};

export default AllNotices2;
