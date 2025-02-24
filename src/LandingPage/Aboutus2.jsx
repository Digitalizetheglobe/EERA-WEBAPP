import { useEffect, useState } from "react";

const NoticesSection = () => {
    const [totalNotices, setTotalNotices] = useState(null);
    const [todaysNotices, setTodaysNotices] = useState(null);
    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await fetch("https://api.epublicnotices.in/notices");
                const data = await response.json();

                setTotalNotices(data.length || 0);

                const today = new Date().toISOString().split("T")[0];
                const todayCount = data.filter((notice) =>
                    notice.date && notice.date.split("T")[0] === today
                ).length;

                setTodaysNotices(todayCount);
            } catch (error) {
                console.error("Error fetching notices:", error);
                setTotalNotices(0);
                setTodaysNotices(0);
            }
        };

        fetchNotices();
    }, []);


    return (
        <div className="flex gap-12 mt-20 mb-20 items-center justify-center">
            {/* Left side - Stats and Button Container */}
            <div className="bg-[#b8d7f4] p-5 rounded-3xl">
                <div className="flex flex-row gap-6 w-full max-w-2xl justify-center mb-4">
                    {/* Today's Notices */}
                    <div className="bg-white px-10 py-8 rounded-3xl flex flex-col items-center">
                        <div className="flex items-center">
                            <p className="text-5xl font-bold">{todaysNotices}</p>
                            <img src="/image1.png" alt="Notices Uploaded" className="w-full h-[95px] z-10" />
                        </div>
                        <p className="text-gray-600 text-lg">Notices Uploaded Today</p>
                    </div>

                    {/* Total Notices */}
                    <div className="bg-white px-5 py-8 rounded-3xl flex flex-col items-center">
                        <div className="flex items-center">
                            <img src="/image2.jpeg" alt="Total Notices" className="w-[100px] h-auto z-10" />
                            <p className="text-5xl font-bold">{totalNotices ? `${totalNotices}+` : "Loading..."}</p>
                        </div>
                        <p className="text-gray-600 text-lg">Total Notices Available</p>
                    </div>
                </div>

                {/* View All Notices Button */}
                <div className="flex justify-center items-center">
                    <a href="/all-notices" className="block">
                        <button className=" bg-[#00335A] text-white text-2xl font-bold py-4 rounded-xl flex items-center justify-between px-6 hover:bg-[#A99067]">
                            View All Notices
                            <img src="/arrow.png" alt="Go to Notices" className="w-12 h-auto" />
                        </button>
                    </a>
                </div>

            </div>

            {/* Right side - About Section */}
            <div className="max-w-md">
                <h2 className="text-[#00335A] text-4xl font-bold mb-4">About EERA</h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                    At EERA, we are dedicated to bridging the gap between professional communication and fast,
                    accessible updates. Whether you're in real estate, corporate governance, or legal compliance,
                    we offer a platform designed to streamline critical notices. Our solution ensures that
                    professionals, business leaders, and regulatory bodies have instant access to the latest updates and legal.
                </p>
                <a href="/about">
                    <button className="text-[#B08968] font-medium mt-4">Read more</button>
                </a>
            </div>
        </div>
    );
};

export default NoticesSection;
