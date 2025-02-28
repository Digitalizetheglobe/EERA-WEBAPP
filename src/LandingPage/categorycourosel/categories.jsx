import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CategoryCarousel = () => {
  const [categories, setCategories] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setCurrentSlide(0);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch category data
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://api.epublicnotices.in/notices");

        const categoryMap = new Map();

        response.data.forEach((notice) => {
          if (notice.SelectedCategory?.trim()) {
            const categoryName = notice.SelectedCategory.replace(/_/g, " ");
            if (!categoryMap.has(categoryName)) {
              categoryMap.set(categoryName, { count: 0 });
            }
            categoryMap.get(categoryName).count += 1;
          }
        });

        const categoryArray = Array.from(categoryMap, ([name, data]) => ({
          name,
          count: data.count,
        }));

        setCategories(categoryArray);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const cardsPerSlide = isMobile ? 1 : 4;
  const totalSlides = Math.ceil(categories.length / cardsPerSlide);

  const handleNext = () => {
    if (currentSlide < totalSlides - 1) setCurrentSlide(currentSlide + 1);
  };

  const handlePrev = () => {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  };

  const handleCategoryClick = (category) => {
    navigate(`/categories/${encodeURIComponent(category)}`);
  };

  const calculateSlideTransform = () => {
    return isMobile ? currentSlide * 100 : currentSlide * (100 / Math.ceil(categories.length / cardsPerSlide));
  };

  return (
    <div className="bg-[#E5EAEE] px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8">
      {/* Heading */}
      <div className="flex items-center space-x-2 font-bold mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-[#001A3B]">Browse by</h1>
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-[#A99067]">Categories</h1>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-end items-center mb-4 space-x-2">
        <button
          onClick={handlePrev}
          disabled={currentSlide === 0}
          className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full shadow transition-opacity hover:bg-gray-50 ${
            currentSlide === 0 ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"
          }`}
        >
          <FiChevronLeft className="text-[#A99067] text-xl sm:text-2xl" />
        </button>
        <button
          onClick={handleNext}
          disabled={currentSlide === totalSlides - 1}
          className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full shadow transition-opacity hover:bg-gray-50 ${
            currentSlide === totalSlides - 1 ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"
          }`}
        >
          <FiChevronRight className="text-[#A99067] text-xl sm:text-2xl" />
        </button>
      </div>

      {/* Card Slider */}
      {categories.length > 0 ? (
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${calculateSlideTransform()}%)`,
              width: isMobile ? `${categories.length * 100}%` : `${Math.ceil(categories.length / 4) * 100}%`,
            }}
          >
            {categories.map((category, index) => (
              <div
                key={index}
                style={{
                  width: isMobile ? `${100 / categories.length}%` : `${100 / Math.max(categories.length, 4)}%`,
                }}
                className="px-2"
              >
                <div className="cursor-pointer" onClick={() => handleCategoryClick(category.name)}>
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden h-48 flex flex-col justify-center items-center p-6 group hover:bg-gray-50 transition-colors duration-300">
                    <h2 className="text-xl sm:text-2xl font-semibold text-[#001A3B] mb-2 text-center">{category.name}</h2>
                    <span className="text-sm sm:text-base text-gray-600 mb-4">{category.count} notices available</span>
                    <div className="inline-block bg-[#A99067] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#8A7549] transition-colors duration-200">
                      View Notices
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-600">Loading categories...</p>
        </div>
      )}
    </div>
  );
};

export default CategoryCarousel;