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
    <div className="mt-10 border border-[#001A3B] p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-center text-4xl font-bold mb-4 text-[#A99067]">Notices Overview</h2>
      <div className="flex justify-between items-center">
        <div>
          <p className="mt-3 text-xl font-bold">Total Notices:</p>
          <p className="mt-3 text-center text-2xl font-bold">{totalNotices ?? "Loading..."}</p>
        </div>
        
        <div>
          <p className="mt-3 text-xl font-bold">Today's Notices:</p>
          <p className="mt-3 text-center text-2xl font-bold">{todaysNotices ?? "Loading..."}</p>
        </div>
      </div>
    </div>
  );
};

export default NoticesSection;