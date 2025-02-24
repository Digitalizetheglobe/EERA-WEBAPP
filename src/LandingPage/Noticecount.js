import { useEffect, useState } from "react";

const NoticesSection = () => {
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
    <div className="p-8 bg-white flex flex-col items-center">
    <div className="flex flex-row gap-6 w-full max-w-2xl justify-center">
        {/* Today's Notices */}
        <div className="bg-[#b8d7f4] p-3 rounded-3xl shadow-lg flex flex-col items-center w-1/2">
            <div className="bg-white px-10 py-8 rounded-3xl flex flex-col items-center">
                <div className="flex items-center">
                    <p className="text-5xl font-bold ">{todaysNotices}</p>
                    <img src="/image1.png" alt="Notices Uploaded" className="w-full h-[95px] z-10 " />
                </div>
                <p className="text-gray-600 text-lg">Notices Uploaded Today</p>
            </div>
        </div>

        {/* Total Notices */}
        <div className="bg-[#b8d7f4] p-3 rounded-3xl shadow-lg flex flex-col items-center w-1/2">
            <div className="bg-white px-5 py-8 rounded-3xl flex flex-col items-center">
                <div className="flex items-center">
                    <img src="/image2.jpeg" alt="Total Notices" className="w-[100px] h-auto z-10 " />
                    <p className="text-5xl font-bold">{totalNotices}+</p>
                </div>
                <p className="text-gray-600 text-lg">Total Notices Available</p>
            </div>
        </div>
    </div>

    {/* View All Notices Button */}
    <a href="/all-notices" className="w-full max-w-xl mt-6">
        <button className="w-full bg-[#004B80] text-white text-lg font-bold py-4 rounded-3xl flex items-center justify-center hover:bg-[#A99067]">
            View All Notices
            <img src="/arrow.png" alt="Go to Notices" className="w-10 h-auto ml-2" />
        </button>
    </a>
</div>
  );
};

export default NoticesSection;
