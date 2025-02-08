import React, { useState } from 'react';
import { Search, MapPin, Calendar, Newspaper, ChevronDown, ChevronUp } from 'lucide-react';

const Filters = ({ onFilterChange, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-md">
      {/* Search Bar and Filter Controls */}
      <div className="p-6 rounded-xl bg-[#001A3B] flex flex-wrap items-center gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search notices..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500"
            onChange={(e) => onFilterChange({ search: e.target.value })}
          />
        </div>
        <button className="px-4 py-2 bg-[#A99067] text-white rounded-lg shadow-md hover:bg-[#8B785A] transition">
          Go
        </button>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-[#A99067] text-white rounded-lg shadow-md hover:bg-[#8B785A] transition"
        >
          Filters {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {/* Expandable Filter Section */}
      {isOpen && (
        <div className="p-6 bg-gray-100 rounded-b-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Category Dropdown */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500"
                onChange={(e) => onFilterChange({ category: e.target.value })}
              >
                <option value="">All Categories</option>
                <option value="government_notice">Property Sales</option>
                <option value="legal_notice">Government Updates</option>
                <option value="public_notice">Corporate Announcements</option>
              </select>
            </div>

            {/* Location Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Enter location"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => onFilterChange({ location: e.target.value })}
                />
              </div>
            </div>

            {/* Newspaper Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Newspaper</label>
              <div className="relative">
                <Newspaper className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Enter newspaper"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => onFilterChange({ newspaper: e.target.value })}
                />
              </div>
            </div>

            {/* Date Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => onFilterChange({ date: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex justify-end mt-4">
            <select
              className="px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              onChange={(e) => onSortChange(e.target.value)}
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="relevance">Relevance</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;