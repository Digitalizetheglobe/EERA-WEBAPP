import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiArrowLeft, FiMapPin, FiCalendar } from "react-icons/fi";
import defaultImage from "../../assets/banner/latestnotics1.png";
import Header from "../../Webapp/Home/HomeHeader";

const LocationNotices = () => {
  const { location } = useParams();
  const navigate = useNavigate();
  const [notices, setNotices] = useState([]);
  const [totalNotices, setTotalNotices] = useState(0); // Stores the total count
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const fetchLocationNotices = async (pageNum) => {
    if (!location || !hasMore) return;
    try {
      setLoading(true);
      const response = await axios.get("https://api.epublicnotices.in/notices");
      const locationNotices = response.data.filter(
        (notice) => notice.location === decodeURIComponent(location)
      );

      locationNotices.sort((a, b) => new Date(b.date) - new Date(a.date));

      if (pageNum === 1) setTotalNotices(locationNotices.length); // Set total count only once

      setNotices((prevNotices) => [
        ...prevNotices,
        ...locationNotices.slice((pageNum - 1) * 6, pageNum * 6),
      ]);
      if (locationNotices.length <= pageNum * 6) setHasMore(false);
    } catch (error) {
      console.error("Error fetching location notices:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setNotices([]);
    setPage(1);
    setHasMore(true);
    fetchLocationNotices(1);
  }, [location]);

  const lastNoticeRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => {
            fetchLocationNotices(prevPage + 1);
            return prevPage + 1;
          });
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
    <Header/>
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-[#001A3B] text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-sm font-medium mb-4 hover:text-[#A99067] transition-colors"
          >
            <FiArrowLeft className="mr-2" /> Back
          </button>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center">
            <FiMapPin className="mr-3 text-[#A99067]" />{" "}
            {decodeURIComponent(location)}
          </h1>
          <p className="mt-2 text-gray-300">
            {totalNotices} public notices available in this location
          </p>
        </div>
      </div>

      {/* Notices Section */}
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {notices.map((notice, index) => {
            if (index === notices.length - 1) {
              return (
                <a
                  key={notice.id}
                  ref={lastNoticeRef}
                  href={`/notices/${notice.id}`}
                  className="block transform transition-transform hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
                    <div className="relative h-48">
                      <img
                        src={`https://api.epublicnotices.in/noticesimage/${notice.notices_images}`}
                        alt={notice.notice_title || "Notice image"}
                        className="w-full h-full object-cover"
                        onError={(e) => (e.target.src = defaultImage)}
                      />
                    </div>
                    <div className="p-4 flex-grow">
                      <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {notice.notice_title}
                      </h2>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <FiCalendar className="mr-1" />
                        <span>{formatDate(notice.date || notice.selected_date)}</span>
                      </div>
                    </div>
                  </div>
                </a>
              );
            } else {
              return (
                <a
                  key={notice.id}
                  href={`/notices/${notice.id}`}
                  className="block transform transition-transform hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
                    <div className="relative h-48">
                      <img
                        src={`https://api.epublicnotices.in/noticesimage/${notice.notices_images}`}
                        alt={notice.notice_title || "Notice image"}
                        className="w-full h-full object-cover"
                        onError={(e) => (e.target.src = defaultImage)}
                      />
                    </div>
                    <div className="p-4 flex-grow">
                      <div className="mb-2">
                        <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                          {notice.SelectedCategory?.replace(/_/g, " ") || "Notice"}
                        </span>
                        {notice.location && (
                          <span className="inline-block ml-2 px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">
                            {notice.location}
                          </span>
                        )}
                        {notice.newspaper_name && (
                          <span className="inline-block ml-2 px-2 py-1 bg-amber-50 text-amber-700 text-xs rounded-full">
                            {notice.newspaper_name}
                          </span>
                        )}
                      </div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {notice.notice_title}
                      </h2>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <FiCalendar className="mr-1" />
                        <span>{formatDate(notice.date || notice.selected_date)}</span>
                      </div>
                    </div>
                  </div>
                </a>
              );
            }
          })}
        </div>
        {loading && (
          <div className="text-center py-10 text-gray-600">
            Loading more notices...
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default LocationNotices;
