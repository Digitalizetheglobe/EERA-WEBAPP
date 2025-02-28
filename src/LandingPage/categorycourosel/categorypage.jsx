import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiArrowLeft, FiTag, FiCalendar, FiUser } from "react-icons/fi";
import defaultImage from "../../assets/banner/latestnotics1.png";
import Header from "../../Webapp/Home/HomeHeader";

const CategoryNotices = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [notices, setNotices] = useState([]);
  const [totalNotices, setTotalNotices] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const observer = useRef();

  useEffect(() => {
    const fetchCategoryNotices = async () => {
      if (!category) return;
      try {
        setLoading(true);
        const response = await axios.get("https://api.epublicnotices.in/notices");

        const formattedCategory = decodeURIComponent(category);
        const categoryNotices = response.data.filter(
          (notice) => notice.SelectedCategory?.replace(/_/g, " ") === formattedCategory
        );
        
        // Set total notices count
        setTotalNotices(categoryNotices.length);
        
        categoryNotices.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        setNotices((prev) => [...prev, ...categoryNotices.slice((page - 1) * 6, page * 6)]);
      } catch (error) {
        console.error("Error fetching category notices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryNotices();
  }, [category, page]);

  const loadMoreNotices = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    observer.current = new IntersectionObserver(loadMoreNotices, { threshold: 1.0 });
    if (observer.current && document.getElementById("load-more-trigger")) {
      observer.current.observe(document.getElementById("load-more-trigger"));
    }
    return () => observer.current && observer.current.disconnect();
  }, [notices]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  };

  return (
    <>
    <Header/>
    <div className="bg-gray-50 min-h-screen">
        
      <div className="bg-[#001A3B] text-white py-8 px-4 sm:px-6 lg:px-8">
        
        <div className="container mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center text-sm font-medium mb-4 hover:text-[#A99067] transition-colors">
            <FiArrowLeft className="mr-2" /> Back
          </button>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center">
            <FiTag className="mr-3 text-[#A99067]" /> {decodeURIComponent(category)}
          </h1>
          <p className="mt-2 text-gray-300">{totalNotices} public notices available in this category</p>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {notices.map((notice) => (
            <a key={notice.id} href={`/notices/${notice.id}`} className="block transform transition-transform hover:-translate-y-1 hover:shadow-lg">
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
                  <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{notice.notice_title}</h2>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <FiCalendar className="mr-1" />
                    <span>{formatDate(notice.date || notice.selected_date)}</span>
                  </div>
                  {notice.lawyer_name && notice.lawyer_name !== "No Lawyer Name Provided" && (
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <FiUser className="mr-1" />
                      <span>{notice.lawyer_name}</span>
                    </div>
                  )}
                  {notice.notice_description && (
                    <p className="mt-3 text-sm text-gray-600 line-clamp-3">{notice.notice_description}</p>
                  )}
                </div>
                <div className="px-4 pb-4">
                  <div className="text-[#A99067] font-medium text-sm flex items-center">Read more</div>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div id="load-more-trigger" className="w-full text-center py-5">
          {loading && <p className="text-gray-600">Loading more notices...</p>}
        </div>
      </div>
    </div>
    </>
  );
};

export default CategoryNotices;
