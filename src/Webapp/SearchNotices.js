import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Homeheader from "./Notices/Homewebheader";
import WebFooter from "./Notices/WebFooter";

const SearchNotices = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { state } = useLocation();
  const [keyword, setKeyword] = useState(state?.keyword || "");
  const [location, setLocation] = useState(state?.location || "");
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFilteredNotices = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://api.epublicnotices.in/notices`);
      if (!response.ok) {
        throw new Error("Failed to fetch notices");
      }
      const data = await response.json();
  
      // Filter based on keyword and location
      const filtered = data.filter((notice) => {
        const title = notice.notice_title || ""; // Fallback to an empty string if null/undefined
        const description = notice.notice_description || ""; // Fallback to an empty string if null/undefined
        const noticeLocation = notice.location || ""; // Fallback to an empty string if null/undefined
  
        return (
          (!keyword ||
            title.toLowerCase().includes(keyword.toLowerCase()) ||
            description.toLowerCase().includes(keyword.toLowerCase())) &&
          (!location || noticeLocation.toLowerCase().includes(location.toLowerCase()))
        );
      });
  
      setNotices(filtered);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }; 

  useEffect(() => {
    fetchFilteredNotices();
  }, []);

  const handleSearch = () => {
    fetchFilteredNotices();
  };

  return (
    <>
      <Homeheader />

      <div className="max-w-5xl items-center mx-auto p-8 gap-8 mt-24 mb-20">
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-[#334862] mb-4">
            Search Notices
          </h2>
          <div className="w-full mt-6 flex items-center justify-center bg-gray-200 bg-opacity-40 p-4 rounded-lg space-x-2">
            {/* Title or Keyword Input */}
            <div className="relative w-full">
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
              <input
                type="text"
                placeholder="Title or keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full pl-10 p-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#A99067] placeholder-gray-500"
              />
            </div>

            {/* Location Input */}
            <div className="relative w-full">
              <i className="fas fa-map-marker-alt absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
              <input
                type="text"
                placeholder="Select Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-10 p-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#A99067] placeholder-gray-500"
              />
            </div>

            {/* Search Button */}
            <button
              className="bg-[#004B80] text-white px-6 py-3 rounded-md shadow-md hover:bg-[#003B65] transition whitespace-nowrap"
              onClick={handleSearch}
            >
              Search Notice
            </button>
          </div>
        </div>

        {/* Main Notices Section */}
        <div className="max-w-5xl mx-auto p-8 gap-8 mt-10 mb-20">
          <h2 className="text-4xl font-bold text-[#334862] mb-4">
            Search Result
          </h2>

          {loading && <p>Loading notices...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && notices.length === 0 && (
            <p className="text-gray-500">
              No notices found for your search criteria.
            </p>
          )}

          {!loading &&
            notices.map((notice) => (
              <div
                key={notice.id}
                className="bg-[#E7EBEE80] p-6 rounded-lg sm:mx-auto mb-6 "
              >
                <h3 className="text-lg font-semibold text-[#334862] mb-2">
                  {notice.notice_title}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{notice.location}</p>
                <p className="text-gray-500">
                  {notice.notice_description
                    ? notice.notice_description
                        .split(" ")
                        .slice(0, 50)
                        .join(" ") + "..."
                    : ""}
                </p>
                <Link
                  to={`/notices/${notice.id}`}
                  className="text-[#A99067] font-semibold hover:underline mt-5"
                >
                  Read More...
                </Link>
              </div>
            ))}
        </div>
      </div>

      <WebFooter />
    </>
  );
};

export default SearchNotices;
