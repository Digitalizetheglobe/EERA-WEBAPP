import React, { useState } from 'react';
import { Search, MapPin, Calendar, Newspaper, ChevronDown, ChevronUp } from 'lucide-react';

const Filters = ({ onFilterChange, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-md">
      <div className="p-6 rounded-xl bg-[#001A3B]">
        {/* Search Bar and Filter Controls */}
        <div className="relative flex items-center gap-2">
          <div className="absolute inset-y-0 left-0 ml-4 mr-20 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={20} />
          </div>
          <input
            type="text"
            placeholder="Search notices..."
            className="block w-full pl-10 pr-24 py-2.5 text-gray-900 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => onFilterChange({ search: e.target.value })}
          />
          <button
            className="px-4 py-2 text-sm font-medium text-[#001A3B] bg-[#A99067] rounded-lg shadow-md hover:bg-green-700 transition-all"
          >
            Go
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#001A3B] bg-[#A99067] rounded-lg shadow-md transition-all"
          >
            Filters
            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          
          
        </div>
      </div>

      {/* Expandable Filter Section */}
      <div
        className={`transition-all duration-300 ease-in-out origin-top ${
          isOpen ? 'h-auto border-t border-gray-200' : 'h-0'
        }`}
      >
        {isOpen && (
          <div className="p-6 space-y-6 animate-in slide-in-from-top duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Category Dropdown */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select 
                  className="block w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onChange={(e) => onFilterChange({ category: e.target.value })}
                >
                  <option value="">All Categories</option>
                  <option value="government_notice">Government Notice</option>
                  <option value="legal_notice">Legal Notice</option>
                  <option value="public_notice">Public Notice</option>
                </select>
              </div>

              {/* Location Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="text-gray-400" size={18} />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter location"
                    className="block w-full pl-10 pr-4 py-2.5 text-gray-900 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onChange={(e) => onFilterChange({ location: e.target.value })}
                  />
                </div>
              </div>

              {/* Newspaper Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Newspaper</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Newspaper className="text-gray-400" size={18} />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter newspaper"
                    className="block w-full pl-10 pr-4 py-2.5 text-gray-900 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onChange={(e) => onFilterChange({ newspaper: e.target.value })}
                  />
                </div>
              </div>

              {/* Date Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="text-gray-400" size={18} />
                  </div>
                  <input
                    type="date"
                    className="block w-full pl-10 pr-4 py-2.5 text-gray-900 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onChange={(e) => onFilterChange({ date: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Sort Options */}
            <div className="flex justify-end">
              <select
                className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
    </div>
  );
};

export default Filters;
