import React, { useState, useEffect } from 'react';
import { Search, MapPin, Layers, Newspaper, Calendar } from 'lucide-react';
import { locations } from './locations';
import { newspapers } from './newspapers';

const SearchBar = ({ onSearch }) => {
  // Search states
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [layerName, setLayerName] = useState('');
  const [newspaperName, setNewspaperName] = useState('');
  const [date, setDate] = useState('');

  // Dropdown states
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isNewspaperDropdownOpen, setIsNewspaperDropdownOpen] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState(locations);
  const [filteredNewspapers, setFilteredNewspapers] = useState(newspapers);

  // Suggestions states
  const [suggestions, setSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  // Filter locations based on input
  useEffect(() => {
    setFilteredLocations(
      locations.filter(loc => 
        loc.toLowerCase().includes(location.toLowerCase())
      )
    );
  }, [location]);

  // Filter newspapers based on input
  useEffect(() => {
    setFilteredNewspapers(
      newspapers.filter(paper => 
        paper.toLowerCase().includes(newspaperName.toLowerCase())
      )
    );
  }, [newspaperName]);

  // Fetch suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await fetch('https://api.epublicnotices.in/notices');
        if (response.ok) {
          const data = await response.json();
          setSuggestions(data);
        }
      } catch (error) {
        console.error('Failed to fetch notices:', error);
      }
    };

    fetchSuggestions();
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.location-dropdown')) {
        setIsLocationDropdownOpen(false);
      }
      if (!event.target.closest('.newspaper-dropdown')) {
        setIsNewspaperDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Filter suggestions based on keyword
  useEffect(() => {
    if (keyword) {
      setFilteredSuggestions(
        suggestions.filter((notice) => {
          const searchFields = [
            notice.notice_title,
            notice.notice_description,
            notice.location,
            notice.newspaper_name,
            notice.lawyer_name,
            notice.SelectedCategory,
            notice.DataentryOperator,
          ]
            .join(' ')
            .toLowerCase();

          return searchFields.includes(keyword.toLowerCase());
        })
      );
    } else {
      setFilteredSuggestions([]);
    }
  }, [keyword, suggestions]);

  const handleLocationSelect = (loc) => {
    setLocation(loc);
    setIsLocationDropdownOpen(false);
  };

  const handleNewspaperSelect = (paper) => {
    setNewspaperName(paper);
    setIsNewspaperDropdownOpen(false);
  };

  const handleSuggestionClick = (title) => {
    setKeyword(title);
    setFilteredSuggestions([]);
  };

  const handleSearch = () => {
    onSearch({
      keyword,
      location,
      ...(showAdvanced && {
        layerName,
        newspaperName,
        date,
      }),
    });
  };

  return (
    <div className="max-w-[1200px] border border-white rounded-lg">
      <div className="bg-white px-4 py-2 rounded-lg">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Keyword Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Title or keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full pl-10 p-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#A99067] placeholder-gray-500"
            />
            {filteredSuggestions.length > 0 && (
              <ul className="absolute z-10 bg-white border border-gray-300 rounded-md w-full mt-1 max-h-40 overflow-y-auto">
                {filteredSuggestions.map((suggestion) => (
                  <li
                    key={suggestion.id}
                    className="text-black p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSuggestionClick(suggestion.notice_title)}
                  >
                    {suggestion.notice_title}
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <div className="h-8 w-px mt-2 bg-gray-400"></div>
          
          {/* Location Dropdown */}
          <div className="relative flex-1 location-dropdown">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Select Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
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

          {/* Search Button */}
          <button
            className="bg-[#004f8b] text-white px-6 py-3 rounded-sm shadow-md transition whitespace-nowrap"
            onClick={handleSearch}
          >
            Search Notice
          </button>
          <button
            className="text-[#004f8b] text-sm font-bold underline transition-colors"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            {showAdvanced ? 'Hide Advanced Search' : 'Advanced Search'}
          </button>
        </div>

        {/* Advanced Search Fields */}
        {showAdvanced && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="relative">
              <Layers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Layer Name"
                value={layerName}
                onChange={(e) => setLayerName(e.target.value)}
                className="w-full pl-10 p-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#A99067] placeholder-gray-500"
              />
            </div>

            {/* Newspaper Dropdown */}
            <div className="relative newspaper-dropdown">
              <Newspaper className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Select Newspaper"
                value={newspaperName}
                onChange={(e) => setNewspaperName(e.target.value)}
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

            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-10 p-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#A99067] placeholder-gray-500"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;