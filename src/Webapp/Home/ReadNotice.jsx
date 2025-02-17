"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Search, MapPin, Newspaper, Layers, Calendar } from "lucide-react"

export default function NoticeHeader() {
    const [activeTab, setActiveTab] = useState("read")
    const [showAdvanced, setShowAdvanced] = useState(false)
    const navigate = useNavigate()

    return (
        <div className="min-h-[600px] w-full bg-[#e4ecfb] px-4 py-8 relative overflow-hidden">
            <div className="max-w-6xl mx-auto relative mt-7">
                <div className="flex justify-center mb-12">
                    <div className="inline-flex rounded-full bg-[#C6D1E7] p-2">
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

                <div className="max-w-3xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-2 mb-2 bg-white p-3 rounded-lg transition-all duration-300">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Title or keyword"
                                className="w-full pl-10 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
                            />
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
                    </div>

                    <div
                        className={`grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-3 rounded-lg transition-all duration-300 overflow-hidden ${showAdvanced ? "max-h-[150px] opacity-100 scale-y-100 mt-1" : "max-h-0 opacity-0 scale-y-0 mt-0"}`}
                    >
                        <div className="relative">
                            <Layers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Layer Name"
                                className="w-full pl-10 p-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                            />
                        </div>

                        <div className="relative">
                            <Newspaper className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Newspaper Name"
                                className="w-full pl-10 p-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                            />
                        </div>

                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="date"
                                className="w-full pl-10 p-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                            />
                        </div>
                    </div>

                    {/* Increased margin-top to create more space */}
                    <div className={`flex items-center justify-center transition-all duration-300 ${showAdvanced ? "mt-8" : "mt-4"}`}>
                        <div className="flex items-center gap-2 p-3 border border-white rounded-full">
                            <div className="flex -space-x-2">
                                {["/news3.png", "/news1.png", "/news2.png", "/news2.png"].map((src, i) => (
                                    <img
                                        key={i}
                                        src={src}
                                        alt={`Newspaper ${i + 1}`}
                                        className="w-8 h-8 rounded-full border-2 border-white"
                                    />
                                ))}
                            </div>
                            <span className="text-gray-600">From 36 Newspapers</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
