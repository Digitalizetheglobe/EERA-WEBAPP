"use client";
import { ChevronLeft, ChevronRight, ChevronDown, ListFilter } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

const MainFilter = ({ icon, label }) => (
  <button className="flex items-center gap-2 px-5 py-2 bg-white rounded-full border border-black">
    {icon && icon}
    <span className="text-gray-800">{label}</span>
  </button>
);

const Sort = ({ icon, label }) => (
  <button className="flex items-center gap-2 px-5 py-2 bg-white rounded-full border border-black">
    <span className="text-gray-800">{label}</span>
    {icon && icon}
  </button>
);

const FilterChip = ({ label }) => (
  <button
    className={`flex items-center gap-3 px-3 py-2 rounded-full border border-black hover:opacity-90 transition-opacity flex-shrink-0`}
  >
    <span className="text-gray-800 whitespace-nowrap font-onest font-light text-lg">
      {label}
    </span>
  </button>
);

const Filter = () => {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const filters = [
    { label: "Legal Notice" },
    { label: "Municipal Announcements" },
    { label: "Planning Applications" },
    { label: "Corporate Disclosures" },
    { label: "Government Notices" },
    { label: "Public Safety alerts" },
    
  ].sort((a, b) => a.label.localeCompare(b.label));

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 500;
      const newScrollPosition =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("resize", handleScroll);
    return () => window.removeEventListener("resize", handleScroll);
  }, []);

  return (
    <div className="relative bg-white shadow-sm z-40 border-t-[1px] border-gray mb-10">
      <div className="relative p-4 flex items-center">
        <div className="mr-2 ">
          <MainFilter icon={<ListFilter />} label="Filter" />
        </div>
        <div className="flex-shrink-0 ">
          <Sort icon={<ChevronDown />} label="Sort" />
        </div>
        <div className="h-10 w-px ml-2 bg-gray-400"></div>
        <div className="relative flex-1 overflow-hidden">
          {showLeftArrow && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth px-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {filters.map((filter) => (
              <FilterChip key={filter.label} label={filter.label} />
            ))}
          </div>
          {showRightArrow && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filter;