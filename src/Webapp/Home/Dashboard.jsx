"use client"
import { useEffect, useState } from "react"

const NoticesDashboard = () => {
    const [totalNotices, setTotalNotices] = useState(null)
    const [todaysNotices, setTodaysNotices] = useState(null)

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await fetch("https://api.epublicnotices.in/notices")
                const data = await response.json()

                setTotalNotices(data.length)

                const today = new Date().toISOString().split("T")[0]
                const todayCount = data.filter((notice) => notice.date && notice.date.startsWith(today)).length
                setTodaysNotices(todayCount)
            } catch (error) {
                console.error("Error fetching notices:", error)
            }
        }

        fetchNotices()
    }, [])

    return (
        <div className="p-4 md:p-8 bg-white min-h-screen flex flex-col items-center">
            <h1 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-20">Notices at Lightning Speed</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-6xl">
                {/* First Div - Notice Counts */}
                <div className="bg-[#b8d7f4] p-3 md:p-5 rounded-3xl shadow-lg flex flex-col gap-4 md:gap-6 col-span-1">
                    <div className="bg-white px-3 md:px-5 py-4 md:py-8 rounded-3xl flex flex-col items-center">
                        <div className="flex items-center">
                            <p className="text-3xl md:text-5xl font-bold z-20">{todaysNotices}</p>
                            <img src="/image1.png" alt="Notices Uploaded" className="w-20 md:w-[150px] h-auto z-10" />
                        </div>
                        <p className="text-gray-600 text-base md:text-lg">Notices Uploaded Today</p>
                    </div>

                    <div className="bg-white px-3 md:px-5 py-4 md:py-8 rounded-3xl flex flex-col items-center">
                        <div className="flex items-center">
                            <img src="/image2.jpeg" alt="Total Notices" className="w-20 md:w-[150px] h-auto z-10" />
                            <p className="text-3xl md:text-5xl font-bold">{totalNotices}+</p>
                        </div>
                        <p className="text-gray-600 text-base md:text-lg">Total Notices Available</p>
                    </div>

                    <a href="/all-notices" className="mt-2 md:mt-6">
                        <button className="w-full bg-[#004B80] text-white text-base md:text-lg font-bold py-3 md:py-4 px-4 rounded-3xl flex items-center hover:bg-[#A99067] justify-between transition-colors duration-300">
                            <span className="flex-grow text-center">View All Notices</span>
                            <img src="/arrow.png" alt="Personalized Recommendations" className="w-12 md:w-16 h-auto" />
                        </button>
                    </a>
                </div>

                {/* Second Div - Browse & Access + Recommendations */}
                <div className="col-span-1 md:col-span-2 flex flex-col gap-4 md:gap-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative bg-[#F6F9FE] py-6 md:py-7 px-4 md:px-5 border border-[#c8daf9] rounded-3xl flex flex-col overflow-hidden">
                            <img src="/frame1.png" alt="Browse Notices" className="absolute inset-0 w-full h-full object-cover" />
                            <div className="mt-20 md:mt-28">
                                <h2 className="font-semibold text-xl md:text-2xl relative z-10">Browse and Access</h2>
                                <h2 className="font-semibold text-xl md:text-2xl relative z-10">Notices Instantly</h2>
                                <p className="text-gray-600 text-sm md:text-md relative z-10 mt-2 md:mt-4">
                                    Quickly browse the latest legal and corporate updates.
                                </p>
                            </div>
                        </div>

                        <div className="flex-1 relative bg-[#E4ECFB] border border-[#b8cdf4] py-6 md:py-10 px-4 md:px-6 rounded-3xl flex flex-col overflow-hidden">
                            <img
                                src="/frame3.png"
                                alt="Personalized Recommendations"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="mt-16 md:mt-20">
                                <h2 className="font-semibold text-xl md:text-2xl relative z-10">Personalized Notice Recommendations</h2>
                                <p className="text-gray-600 text-sm md:text-md relative z-10 mt-2 md:mt-4">
                                    Tailored recommendations based on location, interests, and history.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Third Div - Download + Post Notices */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative bg-[#E4ECFB] border border-[#b8cdf4] px-4 py-16 md:py-24 rounded-3xl flex flex-col overflow-hidden flex-[2] min-h-[280px] md:min-h-0">
                            <img
                                src="/frame2.png"
                                alt="Download Notices"
                                className="absolute inset-0 w-full h-full object-contain md:object-cover"
                            />

                            <div className="mt-[180px] md:mt-8 md:translate-y-16">
                                <h2 className="font-semibold text-xl md:text-2xl relative z-10">Download and Enquire Anytime</h2>
                                <p className="text-gray-600 text-sm md:text-md relative z-10 mt-2 md:translate-y-4">
                                    Download detailed notices or make inquiries with just one click. Always stay ahead of deadlines and
                                    legal requirements.
                                </p>
                            </div>
                        </div>

                        {/* Fourth Div - Post Notices */}
                        <div className="relative bg-[#B8D7F4] border border-[#8cbeed] rounded-3xl flex flex-col overflow-hidden flex-1 min-h-[280px] md:min-h-0">
                            <img src="/frame4.png" alt="Post Notices" className="absolute inset-0 w-full h-full object-cover" />
                            <div className="relative z-10 flex flex-col justify-between h-full p-4 md:p-5">
                                <div className="flex-grow mt-[120px] md:mt-[130px] mb-4 md:mb-0">
                                    <h2 className="font-semibold text-xl md:text-2xl">Post Notices</h2>
                                    <p className="text-gray-600 text-sm md:text-md mt-2">Share important notices</p>
                                    <p className="text-gray-600 text-sm md:text-md">Instantly</p>
                                </div>
                                <a href="/post-notices" className="self-end mt-auto">
                                    <img
                                        src="/arrow.png"
                                        alt="Go to Post Notices"
                                        className="w-10 md:w-16 h-auto transition-transform hover:scale-110"
                                    />
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoticesDashboard

