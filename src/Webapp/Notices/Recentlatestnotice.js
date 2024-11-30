import React, { useState, useEffect } from 'react';
import latestnoticeimg from '../../assets/banner/latestnoticeimg.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faMapMarkerAlt, faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

function RecentLatestNotice() {
  const [notices, setNotices] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch notices from API
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch("http://api.epublicnotices.in/notices");
        if (!response.ok) {
          throw new Error("Failed to fetch notices");
        }
        const data = await response.json();
        setNotices(data.slice(0, 4));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchNotices();
  }, []);
  // Filter notices based on selected category
  const filteredNotices = selectedCategory === "All"
    ? notices
    : notices.filter(notice =>
      notice.category && notice.category.includes(selectedCategory)
    );






  return (
    <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Notices Section */}
      <div className="lg:col-span-2 space-y-6">
        <h2 className="text-2xl font-bold text-[#334862] mb-4">Latest Notices</h2>

        {/* Category Buttons */}
        <div className="flex gap-4 mb-6">
          {["All", "Featured", "Realestate", "Corporate", "Environmental"].map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${selectedCategory === category
                ? "bg-transparent border border-[#A99067] text-[#A99067]"
                : "bg-transparent border text-gray-700"
                } hover:bg-[#A99067] hover:text-white transition`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Loading/Error State */}
        {loading && <p>Loading notices...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Display Notices */}
        {!loading &&
          filteredNotices.map((notice) => (
            <div key={notice.id} className="bg-[#E7EBEE80] p-6 rounded-lg sm:mx-auto">
              <div className="flex items-center mb-2">
                <span className="bg-transparent border border-[#A99067] text-[#A99067] text-xs font-semibold px-2 py-1 rounded-full mr-2">
                  {notice.category && notice.category[0]}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-[#334862] mb-2">
                {notice.notice_title}
              </h3>
              <p className="text-sm text-gray-500">
                <FontAwesomeIcon icon={faCalendar} className="text-gray-500 mr-1" />{" "}
                {new Date(notice.date).toLocaleDateString()} |{" "}
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-500 mx-1" />{" "}
                {notice.lawyer_name} |{" "}
                <FontAwesomeIcon icon={faMapLocationDot} className="text-gray-500 mx-1" />{" "}
                {notice.location}
              </p>
              <p className="text-gray-500 mb-4">
                {notice.notice_description
                  ? notice.notice_description.split(" ").slice(0, 50).join(" ") + "..."
                  : ""}
              </p>
              <Link to={`/notices/${notice.id}`} className="text-[#A99067] font-semibold hover:underline">
                Read More...
              </Link>
            </div>
          ))}
      </div>

      {/* Recently Viewed Section */}
      <div className="space-y-6">
        <img
          src={latestnoticeimg}
          alt="Notices"
          className="rounded-lg object-cover sm:mx-auto"
        />
        <h3 className="text-xl font-bold text-[#334862]">Recently Viewed</h3>
        {[{
          number: "01",
          title: "Environmental Clearance Granted",
          description: "Quickly browse the latest legal and corporate updates...",
          time: "4 hours ago",
        }, {
          number: "02",
          title: "Sale of Seized Assets by City Auction",
          description: "Updates by filterable category, or region for...",
          time: "8 hours ago",
        }, {
          number: "03",
          title: "Browse and Access Notices Instantly",
          description: "Quickly browse the latest legal and corporate updates...",
          time: "4 hours ago",
        }].map((item, index) => (
          <div key={index} className="flex gap-4 items-start sm:mx-auto">
            <div className="bg-[#D2C6B2] text-[#001A3BCC] font-bold rounded-md w-10 h-10 flex items-center justify-center">
              {item.number}
            </div>
            <div>
              <h4 className="font-semibold text-[#334862]">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="text-xs text-gray-500 mt-1">
                {item.time} |{" "}
                <a href="#" className="text-[#0E619C] hover:underline">
                  Read more...
                </a>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentLatestNotice;
