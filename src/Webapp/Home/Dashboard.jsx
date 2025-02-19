import React from "react";
import { useEffect, useState } from "react";
const NoticesDashboard = () => {
    const [totalNotices, setTotalNotices] = useState(null);
    const [todaysNotices, setTodaysNotices] = useState(null);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await fetch("https://api.epublicnotices.in/notices");
                const data = await response.json();

                setTotalNotices(data.length);

                const today = new Date().toISOString().split("T")[0];
                const todayCount = data.filter((notice) =>
                    notice.date && notice.date.startsWith(today)
                ).length;
                setTodaysNotices(todayCount);
            } catch (error) {
                console.error("Error fetching notices:", error);
            }
        };

        fetchNotices();
    }, []);
    return (
        <div className="p-8 bg-white min-h-screen flex flex-col items-center">
            <h1 className="text-4xl font-bold text-center mb-20">Notices at Lightning Speed</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
                {/* First Div - Notice Counts (1/3 width) */}
                <div className="bg-[#b8d7f4] p-5 rounded-3xl shadow-lg flex flex-col gap-6 col-span-1">
                    <div className="bg-white px-5 py-8 rounded-3xl flex flex-col items-center">
                        <div className="flex items-center ">
                            <p className="text-5xl font-bold z-20 ">{todaysNotices}</p>
                            <img src="/image1.png" alt="Notices Uploaded" className="w-[150px] h-auto z-10 " />
                        </div>
                        <p className="text-gray-600 text-lg">Notices Uploaded Today</p>
                    </div>
                    <div className="bg-white px-5  py-8 rounded-3xl flex flex-col items-center">
                        <div className="flex items-center ">
                            <img src="/image2.jpeg" alt="Total Notices" className="w-[150px] h-auto  z-10" />
                            <p className="text-5xl font-bold ">{totalNotices}+</p>

                        </div>
                        <p className="text-gray-600 text-lg">Total Notices Available</p>
                    </div>
                    <a href="/all-notices">
                        <button className="w-full gap-4 bg-[#004B80] text-white text-lg font-bold  rounded-3xl flex items-center   hover:bg-[#A99067] justify-between mt-6">
                            <span className="flex-grow text-center">View All Notices</span>
                            <img src="/arrow.png" alt="Personalized Recommendations" className="w-16 h-auto" />
                        </button>
                    </a>
                </div>

                {/* Second Div - Browse & Access + Recommendations (2/3 width) */}
                <div className="col-span-2 flex flex-col gap-6">
                    <div className="bg-white rounded-3xl flex flex-row gap-4">
                        <div className="flex-1 relative bg-[#F6F9FE] py-7 px-5 border border-[#c8daf9] rounded-3xl flex flex-col overflow-hidden">
                            <img
                                src="/frame1.png"
                                alt="Browse Notices"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <h2 className="font-semibold text-2xl relative z-10 mt-28">Browse and Access </h2>
                            <h2 className="font-semibold text-2xl relative z-10 "> Notices Instantly</h2>
                            <p className="text-gray-600 text-md relative z-10 mt-4">Quickly browse the latest legal and corporate updates.</p>
                        </div>

                        <div className="flex-1 relative bg-[#E4ECFB] border border-[#b8cdf4] py-10 px-6 rounded-3xl flex flex-col   overflow-hidden">
                            <img
                                src="/frame3.png"
                                alt="Personalized Recommendations"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <h2 className="font-semibold text-2xl relative z-10 mt-20">Personalized Notice Recommendations</h2>
                            <p className="text-gray-600 text-md relative z-10 mt-4">Tailored recommendations based on location, interests, and history.</p>
                        </div>
                    </div>


                    {/* Third Div - Download + Post Notices */}
                    <div className="bg-white rounded-2xl flex flex-row gap-4">
                        <div className="relative bg-[#E4ECFB] border border-[#b8cdf4] px-2 py-24 rounded-3xl flex flex-col  overflow-hidden flex-[2]">
                            <img
                                src="/frame2.png"
                                alt="Download Notices"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <h2 className="font-semibold text-2xl px-4 relative z-10 translate-y-16">Download and Enquire Anytime</h2>
                            <p className="text-gray-600 text-md px-4 relative z-10 translate-y-20">Download detailed notices or make inquiries with just one click. Always stay ahead of deadlines and legal requirements.</p>
                        </div>

                        <div className="relative bg-[#B8D7F4] border border-[#8cbeed] px-2 rounded-3xl flex flex-col justify-between overflow-hidden flex-[1]">
                            <img
                                src="/frame4.png"
                                alt="Post Notices"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="relative z-10 w-full flex flex-col justify-between  h-full">
                                <div className="mt-28">
                                    <h2 className="font-semibold text-2xl mt-8">Post Notices</h2>
                                    <p className="text-gray-600 text-md mt-2">Share important notices</p>
                                    <p className="text-gray-600 text-md">Instantly</p>
                                </div>
                               
                                <a href="post-notices" className="relative z-10 self-end ">
                                    <img src="/arrow.png" alt="Go to Post Notices" className="w-16 h-auto" />
                                </a>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default NoticesDashboard;
