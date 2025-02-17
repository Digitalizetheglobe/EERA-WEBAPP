import React from "react";

const NoticesDashboard = () => {
    return (
        <div className="p-8 bg-white min-h-screen flex flex-col items-center">
            <h1 className="text-4xl font-bold text-center mb-20">Notices at Lightning Speed</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
                {/* First Div - Notice Counts (1/3 width) */}
                <div className="bg-[#b8d7f4] p-6 rounded-2xl shadow-lg flex flex-col gap-4 col-span-1">
                    <div className="bg-white p-4 rounded-xl flex flex-col items-center">
                        <div className="flex items-center space-x-2">
                            <p className="text-3xl font-bold">1762</p>
                            <img src="/image1.png" alt="Notices Uploaded" className="w-22 h-22" />
                        </div>
                        <p className="text-gray-600">Notices Uploaded Today</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl flex flex-col items-center">
                        <div className="flex items-center space-x-2">
                            <img src="/image2.png" alt="Total Notices" className="w-22 h-22" />
                            <p className="text-3xl font-bold">25K+</p>

                        </div>
                        <p className="text-gray-600">Total Notices Available</p>
                    </div>
                    <a>
                        <button className="w-full gap-4 bg-[#004B80] text-white text-lg font-bold py-2 px-4 rounded-lg flex items-center  mt-2 hover:bg-blue-700 justify-between">
                            <span className="flex-grow text-center">View All Notices</span>
                            <img src="/arrow.png" alt="Personalized Recommendations" className="w-12 h-12" />
                        </button>
                    </a>
                </div>

                {/* Second Div - Browse & Access + Recommendations (2/3 width) */}
                <div className="col-span-2 flex flex-col gap-6">
                    <div className="bg-white rounded-2xl flex flex-row gap-4">
                        <div className="bg-[#F6F9FE] p-4 border border-[#c8daf9] rounded-xl flex flex-col items-center">
                            <img src="/image3.png" alt="Browse Notices" className="w-17 h-17 ml-2 mb-2" />
                            <h2 className="font-semibold text-lg">Browse and Access Notices Instantly</h2>
                            <p className="text-gray-600 text-sm text-center">Quickly browse the latest legal and corporate updates.</p>
                        </div>
                        <div className="bg-[#E4ECFB] border border-[#b8cdf4] p-4 rounded-xl flex flex-col items-center">
                            <img src="/image4.png" alt="Personalized Recommendations" className="w-16 h-16 mb-2" />
                            <h2 className="font-semibold text-lg">Personalized Notice Recommendations</h2>
                            <p className="text-gray-600 text-sm text-center">Tailored recommendations based on location, interests, and history.</p>
                        </div>
                    </div>

                    {/* Third Div - Download + Post Notices */}
                    <div className="bg-white rounded-2xl flex flex-row gap-4">
                        <div className="bg-[#E4ECFB] border border-[#b8cdf4] p-4 rounded-xl flex flex-col items-center">
                            <img src="/image5.png" alt="Download Notices" className="w-16 h-16 mb-2" />
                            <h2 className="font-semibold text-lg">Download and Enquire Anytime</h2>
                            <p className="text-gray-600 text-sm text-center">Download detailed notices or make inquiries with one click.</p>
                        </div>
                        <div className="bg-[#B8D7F4] border border-[#8cbeed] p-4 rounded-xl flex justify-between items-center">
                            <div>
                                <h2 className="font-semibold text-lg">Post Notices</h2>
                                <p className="text-gray-600 text-sm">Share important notices instantly.</p>
                            </div>
                            <img src="/image6.png" alt="Post Notices" className="w-16 h-16" />
                            <a>
                                <img src="/arrow.png" alt="Personalized Recommendations" />
                            </a>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoticesDashboard;
