"use client"
import SearchBar from "../SearchBar/SearchBar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Newspaper, Layers, Calendar } from "lucide-react";

export default function NoticeHeader() {
    const [activeTab, setActiveTab] = useState("read");

    const navigate = useNavigate();

    const handleSearch = (searchData) => {
        const { keyword, location, layerName, newspaperName, date } = searchData;
        navigate("/search-notices", {
          state: { keyword, location, layerName, newspaperName, date },
        });
      };

    return (
        <div className="min-h-[600px] w-full bg-[#e4ecfb] px-4 py-8 relative overflow-hidden">
            <div className="max-w-6xl mx-auto relative mt-7">
                <div className="flex justify-center mb-12">
                    <div className="inline-flex rounded-full bg-[#b8d7f4] p-2">
                        <button
                            onClick={() => setActiveTab("read")}
                            className={`px-6 py-2 rounded-full text-lg font-semibold transition-colors
                ${activeTab === "read" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"}`}
                        >
                            Read Notice
                        </button>
                        <button
                            onClick={() => navigate("/post-notices")}
                            className={`px-6 py-2 rounded-full text-lg font-semibold transition-colors
                ${activeTab === "post" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"}`}
                        >
                            Post Notice
                        </button>
                    </div>
                </div>

                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-5">Notice That Matter at EERA</h1>
                    <p className="text-3xl text-black">- Accessible Anytime, Anywhere.</p>
                </div>

                <div className="max-w-4xl mx-auto">
                <SearchBar onSearch={handleSearch} />
                    {/* <div className="flex flex-col md:flex-row gap-2 mb-2 bg-white p-3 rounded-lg transition-all duration-300">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Title or keyword"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                className="w-full pl-10 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
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
                        <div className="h-5 w-px mt-2 bg-gray-400"></div>

                        <div className="flex-1 relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <select className="w-full text-gray-500 pl-10 pr-6 py-2 rounded-md appearance-none focus:ring-2 focus:ring-blue-500">
                                <option>Select Location</option>
                                <option value="location1">Location 1</option>
                                <option value="location2">Location 2</option>
                                <option value="location3">Location 3</option>
                            </select>
                        </div>

                        <button className="bg-[#004c80] hover:bg-[#0a6aaa] text-white px-6 py-2 rounded-sm">
                            Search Notice
                        </button>
                        <button
                            onClick={() => setShowAdvanced(!showAdvanced)}
                            className="text-[#004c80] underline mt-2 ml-2"
                        >
                            {showAdvanced ? 'Hide Advanced Search' : 'Advanced Search'}
                        </button>
                    </div> */}
                </div>
            </div>
        </div>
    );
}
