import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "./Home/HomeHeader";
import WebFooter from "./Notices/WebFooter";

const SearchNotices = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { state } = useLocation();
  const [keyword, setKeyword] = useState(state?.keyword || "");
  const [location, setLocation] = useState(state?.location || "");
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newspaperName, setNewspaperName] = useState('');
  const [allLocations, setAllLocations] = useState([]);
  const [allNewspapers, setAllNewspapers] = useState([]);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isNewspaperDropdownOpen, setIsNewspaperDropdownOpen] = useState(false);

  // Filter locations based on input
  const filteredLocations = allLocations.filter(loc => 
    loc.toLowerCase().includes(location.toLowerCase())
  );

  // Filter newspapers based on input
  const filteredNewspapers = allNewspapers.filter(paper => 
    paper.toLowerCase().includes(newspaperName.toLowerCase())
  );

  const fetchFilteredNotices = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.epublicnotices.in/notices`);
      if (!response.ok) {
        throw new Error("Failed to fetch notices");
      }
      const data = await response.json();

      // Extract unique locations and newspapers
      const uniqueLocations = [...new Set(data
        .map(notice => notice.location)
        .filter(location => location)
        .map(location => location.trim())
        .sort()
      )];
      
      const uniqueNewspapers = [...new Set(data
        .map(notice => notice.newspaper_name)
        .filter(newspaper => newspaper)
        .map(newspaper => newspaper.trim())
        .sort()
      )];

      setAllLocations(uniqueLocations);
      setAllNewspapers(uniqueNewspapers);

      // Function to remove special characters and replace with space
      const sanitizeText = (text) => text.replace(/[^a-zA-Z0-9 ]/g, " ");

      // Filter notices based on keyword, location, newspaperName, and category
      const filtered = data.filter((notice) => {
        const title = sanitizeText(notice.notice_title || "").toLowerCase();
        const description = sanitizeText(notice.notice_description || "").toLowerCase();
        const noticeLocation = sanitizeText(notice.location || "").toLowerCase();
        const newspaper = sanitizeText(notice.newspaper_name || "").toLowerCase();
        const lawyer = sanitizeText(notice.lawyer_name || "").toLowerCase();
        const category = sanitizeText(notice.SelectedCategory || "").toLowerCase();
        const operator = sanitizeText(notice.DataentryOperator || "").toLowerCase();
        const date = new Date(notice.date || "1970-01-01");

        return (
          (!keyword || 
            newspaper.includes(keyword.toLowerCase()) ||
            noticeLocation.includes(keyword.toLowerCase()) ||
            title.includes(keyword.toLowerCase()) ||
            lawyer.includes(keyword.toLowerCase()) ||
            description.includes(keyword.toLowerCase()) ||
            category.includes(keyword.toLowerCase()) ||
            operator.includes(keyword.toLowerCase())
          ) &&
          (!location || noticeLocation.includes(location.toLowerCase())) &&
          (!newspaperName || newspaper.includes(newspaperName.toLowerCase()))
        );
      });

      // Sort by priority and date
      filtered.sort((a, b) => {
        const aPriority = [
          a.newspaper_name, a.location, a.notice_title, a.lawyer_name
        ].some(field => sanitizeText(field || "").toLowerCase().includes(keyword?.toLowerCase() || "")) ? 1 : 0;
        const bPriority = [
          b.newspaper_name, b.location, b.notice_title, b.lawyer_name
        ].some(field => sanitizeText(field || "").toLowerCase().includes(keyword?.toLowerCase() || "")) ? 1 : 0;
        
        if (bPriority !== aPriority) return bPriority - aPriority;
        return new Date(b.date || "1970-01-01") - new Date(a.date || "1970-01-01");
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

  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation);
    setIsLocationDropdownOpen(false);
    setTimeout(() => fetchFilteredNotices(), 0);
  };

  const handleNewspaperSelect = (selectedNewspaper) => {
    setNewspaperName(selectedNewspaper);
    setIsNewspaperDropdownOpen(false);
    setTimeout(() => fetchFilteredNotices(), 0);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.location-dropdown') && !event.target.closest('.newspaper-dropdown')) {
        setIsLocationDropdownOpen(false);
        setIsNewspaperDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <Header />

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

            {/* Location Dropdown */}
            <div className="relative w-full location-dropdown">
              <i className="fas fa-map-marker-alt absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
              <input
                type="text"
                placeholder="Select Location"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  setIsLocationDropdownOpen(true);
                }}
                onClick={() => setIsLocationDropdownOpen(true)}
                className="w-full pl-10 p-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#A99067] placeholder-gray-500"
              />
              {isLocationDropdownOpen && filteredLocations.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {filteredLocations.map((loc, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                      onClick={() => handleLocationSelect(loc)}
                    >
                      {loc}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Newspaper Dropdown */}
            <div className="relative w-full newspaper-dropdown">
              <i className="fas fa-newspaper absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
              <input
                type="text"
                placeholder="Newspaper Name"
                value={newspaperName}
                onChange={(e) => {
                  setNewspaperName(e.target.value);
                  setIsNewspaperDropdownOpen(true);
                }}
                onClick={() => setIsNewspaperDropdownOpen(true)}
                className="w-full pl-10 p-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#A99067] placeholder-gray-500"
              />
              {isNewspaperDropdownOpen && filteredNewspapers.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {filteredNewspapers.map((paper, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                      onClick={() => handleNewspaperSelect(paper)}
                    >
                      {paper}
                    </div>
                  ))}
                </div>
              )}
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
                className="bg-[#E7EBEE80] p-6 rounded-lg sm:mx-auto mb-6"
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