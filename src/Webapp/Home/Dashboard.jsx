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
                        <button className="w-full gap-4 bg-[#004B80] text-white text-lg font-bold py-2 px-4 rounded-3xl flex items-center  mt-2 hover:bg-blue-700 justify-between">
                            <span className="flex-grow text-center">View All Notices</span>
                            <img src="/arrow.png" alt="Personalized Recommendations" className="w-12 h-12" />
                        </button>
                    </a>
                </div>

                {/* Second Div - Browse & Access + Recommendations (2/3 width) */}
                <div className="col-span-2 flex flex-col gap-6">
                    <div className="bg-white rounded-3xl flex flex-row gap-4">
                        <div className="bg-[#F6F9FE] p-4 border border-[#c8daf9] rounded-3xl flex flex-col items-center">
                            <img src="/image3.png" alt="Browse Notices" className="w-[150px] h-auto translate-x-[100px]" />
                            <h2 className="font-semibold text-3xl">Browse and Access Notices Instantly</h2>
                            <p className="text-gray-600 text-md">Quickly browse the latest legal and corporate updates.</p>
                        </div>
                        <div className="bg-[#E4ECFB] border border-[#b8cdf4] p-4 rounded-3xl flex flex-col items-center">
                            <div className="flex flex-row">
                            <img src="/image 13.png" alt="Personalized Recommendations2" className="w-[130px] h-auto translate-x-[-60px] translate-y-[-20px]" />
                            <img src="/image4.png" alt="Personalized Recommendations" className="w-[130px] h-auto translate-x-[50px] translate-y-[-20px] " />
                            </div>
                            <h2 className="font-semibold text-3xl translate-y-[-20px]">Personalized Notice Recommendations</h2>
                            <p className="text-gray-600 text-md translate-y-[-20px]">Tailored recommendations based on location, interests, and history.</p>
                        </div>
                    </div>

                    {/* Third Div - Download + Post Notices */}
                    <div className="bg-white rounded-2xl flex flex-row gap-4">
                        <div className="bg-[#E4ECFB] border border-[#b8cdf4] p-4 rounded-3xl flex flex-col  flex-[2]">
                            <div className="flex flex-row">
                            <img src="/Group.png" alt="Download Notices" className="w-20 h-20" />
                            <img src="/image5.png" alt="Download Notices" className="w-[130px] h-auto translate-x-[250px]" />
                            </div>
                            <h2 className="font-semibold text-2xl">Download and Enquire Anytime</h2>
                            <p className="text-gray-600 text-md">Download detailed notices or make inquiries with just one click. Always stay ahead of deadlines and legal requirements.</p>
                        </div>
                        <div className="bg-[#B8D7F4] border border-[#8cbeed] p-4 rounded-3xl flex flex-col flex-[1]">
                            <img src="/image6.png" alt="Post Notices" className="w-[200px] h-auto translate-x-[20px]" />  
                            <div className="flex flex-row">
                            <div>
                                <h2 className="font-semibold text-2xl">Post Notices</h2>
                                <p className="text-gray-600 text-sm">Share important notices instantly.</p>
                            </div>
                            
                            <a className="translate-x-[20px] translate-y-[40px]" href="post-notices">
                                <img src="/arrow.png" alt="Personalized Recommendations" />
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
