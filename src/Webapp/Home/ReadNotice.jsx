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
                </div>
            </div>
        </div>
    );
}
