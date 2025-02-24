import React, { useState, useEffect } from 'react';
import { Search, MapPin, Layers, Newspaper, Calendar } from 'lucide-react';
import { locations } from './locations';
import { newspapers } from './newspapers';

const SearchBar = ({ onSearch }) => {
  // State declarations remain the same
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [layerName, setLayerName] = useState('');
  const [newspaperName, setNewspaperName] = useState('');
  const [date, setDate] = useState('');
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isNewspaperDropdownOpen, setIsNewspaperDropdownOpen] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState(locations);
  const [filteredNewspapers, setFilteredNewspapers] = useState(newspapers);
  const [suggestions, setSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // All useEffects and handlers remain exactly the same
  useEffect(() => {
    setFilteredLocations(
      locations.filter(loc => 
        loc.toLowerCase().includes(location.toLowerCase())
      )
    );
  }, [location]);

  useEffect(() => {
    setFilteredNewspapers(
      newspapers.filter(paper => 
        paper.toLowerCase().includes(newspaperName.toLowerCase())
      )
    );
  }, [newspaperName]);

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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // Updated input and icon styles
  const iconStyle = "absolute top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5";
  const inputStyle = "w-60 ml-5 sm:p-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#A99067] placeholder-gray-500 text-sm sm:text-base bg-transparent";

  return (
    <div className="max-w-[1200px] border border-white rounded-lg">
      <div className="bg-white px-3 sm:px-4 py-3 sm:py-2 rounded-lg">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          {/* Main search section */}
          <div className="flex flex-col md:flex-row gap-10 md:gap-6 flex-1">
            {/* Keyword Search */}
            <div className="relative flex-1">
              <Search className={iconStyle} />
              <input
                type="text"
                placeholder="Title or keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className={inputStyle}
              />
              {filteredSuggestions.length > 0 && (
                <ul className="absolute z-10 bg-white border border-gray-300 rounded-md w-full mt-1 max-h-40 overflow-y-auto">
                  {filteredSuggestions.map((suggestion) => (
                    <li
                      key={suggestion.id}
                      className="text-black p-2 hover:bg-gray-100 cursor-pointer text-sm sm:text-base"
                      onClick={() => handleSuggestionClick(suggestion.notice_title)}
                    >
                      {suggestion.notice_title}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Vertical divider - hidden on mobile */}
            <div className="hidden md:block h-8 w-px bg-gray-400 self-center"></div>
            
            {/* Horizontal divider - shown only on mobile */}
            <div className="block md:hidden h-px w-full bg-gray-400"></div>

            {/* Location Dropdown */}
            <div className="relative flex-1 location-dropdown">
              <MapPin className={iconStyle} />
              <input
                type="text"
                placeholder="Select Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onClick={() => setIsLocationDropdownOpen(true)}
                className={inputStyle}
              />
              {isLocationDropdownOpen && filteredLocations.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {filteredLocations.map((loc, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 text-sm sm:text-base"
                      onClick={() => handleLocationSelect(loc)}
                    >
                      {loc}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Buttons container */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <button
              className="bg-[#004f8b] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-sm shadow-md transition whitespace-nowrap text-sm sm:text-base"
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
        </div>

        {/* Advanced Search Fields */}
        {showAdvanced && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="relative">
              <Layers className={iconStyle} />
              <input
                type="text"
                placeholder="Layer Name"
                value={layerName}
                onChange={(e) => setLayerName(e.target.value)}
                className={inputStyle}
              />
            </div>

            <div className="relative newspaper-dropdown">
              <Newspaper className={iconStyle} />
              <input
                type="text"
                placeholder="Select Newspaper"
                value={newspaperName}
                onChange={(e) => setNewspaperName(e.target.value)}
                onClick={() => setIsNewspaperDropdownOpen(true)}
                className={inputStyle}
              />
              {isNewspaperDropdownOpen && filteredNewspapers.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {filteredNewspapers.map((paper, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 text-sm sm:text-base"
                      onClick={() => handleNewspaperSelect(paper)}
                    >
                      {paper}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <Calendar className={iconStyle} />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={inputStyle}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;