import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiArrowLeft, FiMapPin, FiCalendar, FiUser } from "react-icons/fi";
import defaultImage from "../../assets/banner/latestnotics1.png";
import Header from "../../Webapp/Home/HomeHeader";

const LandNoticesPage = () => {
  const navigate = useNavigate();
  const [notices, setNotices] = useState([]);
  const [totalNotices, setTotalNotices] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const fetchLandNotices = async (pageNum) => {
    try {
      setLoading(true);
      const response = await axios.get("https://api.epublicnotices.in/api/land-notices/admin/approved");
      const landNotices = response.data.notices;

      landNotices.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      if (pageNum === 1) setTotalNotices(landNotices.length);

      setNotices((prevNotices) => [
        ...prevNotices,
        ...landNotices.slice((pageNum - 1) * 6, pageNum * 6),
      ]);
      if (landNotices.length <= pageNum * 6) setHasMore(false);
    } catch (error) {
      console.error("Error fetching land notices:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setNotices([]);
    setPage(1);
    setHasMore(true);
    fetchLandNotices(1);
  }, []);

  const lastNoticeRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => {
            fetchLandNotices(prevPage + 1);
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

      <div className="bg-[#E5EAEE] px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8">
        {/* Header Section */}
    {/* Heading */}
    <div className="flex items-center space-x-2 font-bold mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-[#001A3B]">Browse by</h1>
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-[#A99067]">Land Notices</h1>
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
                    href={`/land-notice/${notice.id}`}
                    className="block transform transition-transform hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
                      <div className="relative h-48">
                        <img
                          src={notice.notice_image || defaultImage}
                          alt={notice.notice_title || "Land Notice"}
                          className="w-full h-full object-cover"
                          onError={(e) => (e.target.src = defaultImage)}
                        />
                      </div>
                      <div className="p-4 flex-grow">
                        <div className="mb-2">
                          <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                            {notice.ownershipType}
                          </span>
                          <span className="inline-block ml-2 px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">
                            {notice.occupantClass}
                          </span>
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                          {notice.notice_title}
                        </h2>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <FiCalendar className="mr-1" />
                          <span>{formatDate(notice.createdAt)}</span>
                        </div>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <FiUser className="mr-1" />
                          <span>{notice.ownerName}</span>
                        </div>
                        <div className="mt-2 text-sm text-gray-600 line-clamp-2">
                          {notice.landDescription}
                        </div>
                      </div>
                      <div className="px-4 pb-4">
                        <div className="text-[#A99067] font-medium text-sm flex items-center">
                          Read more
                        </div>
                      </div>
                    </div>
                  </a>
                );
              } else {
                return (
                  <a
                    key={notice.id}
                    href={`/land-notice/${notice.id}`}
                    className="block transform transition-transform hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
                      <div className="relative h-48">
                        <img
                          src={notice.notice_image || defaultImage}
                          alt={notice.notice_title || "Land Notice"}
                          className="w-full h-full object-cover"
                          onError={(e) => (e.target.src = defaultImage)}
                        />
                      </div>
                      <div className="p-4 flex-grow">
                        <div className="mb-2">
                          <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                            {notice.ownershipType}
                          </span>
                          <span className="inline-block ml-2 px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">
                            {notice.occupantClass}
                          </span>
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                          {notice.notice_title}
                        </h2>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <FiCalendar className="mr-1" />
                          <span>{formatDate(notice.createdAt)}</span>
                        </div>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <FiUser className="mr-1" />
                          <span>{notice.ownerName}</span>
                        </div>
                        <div className="mt-2 text-sm text-gray-600 line-clamp-2">
                          {notice.landDescription}
                        </div>
                      </div>
                      <div className="px-4 pb-4">
                        <div className="text-[#A99067] font-medium text-sm flex items-center">
                          Read more
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

export default LandNoticesPage; 