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
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mt-8 lg:mt-20 mb-8 lg:mb-20 items-center justify-center px-4 lg:px-0">
            {/* Left side - Stats and Button Container */}
            <div className="bg-[#b8d7f4] p-4 lg:p-5 rounded-3xl w-full lg:w-auto">
                <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 w-full max-w-2xl justify-center mb-4">
                    {/* Today's Notices */}
                    <div className="bg-white px-4 lg:px-10 py-6 lg:py-8 rounded-3xl flex flex-col items-center flex-1">
                        <div className="flex items-center">
                            <p className="text-3xl lg:text-5xl font-bold">{todaysNotices}</p>
                            <img 
                                src="/image1.png" 
                                alt="Notices Uploaded" 
                                className="w-full h-[60px] lg:h-[95px] z-10" 
                            />
                        </div>
                        <p className="text-gray-600 text-base lg:text-lg text-center">
                            Notices Uploaded Today
                        </p>
                    </div>

                    {/* Total Notices */}
                    <div className="bg-white px-4 lg:px-5 py-6 lg:py-8 rounded-3xl flex flex-col items-center flex-1">
                        <div className="flex items-center">
                            <img 
                                src="/image2.jpeg" 
                                alt="Total Notices" 
                                className="w-[60px] lg:w-[100px] h-auto z-10" 
                            />
                            <p className="text-3xl lg:text-5xl font-bold">
                                {totalNotices}+
                            </p>
                        </div>
                        <p className="text-gray-600 text-base lg:text-lg text-center">
                            Total Notices Available
                        </p>
                    </div>
                </div>

                {/* View All Notices Button */}
                <div className="flex justify-center items-center">
                    <a href="/all-notices" className="block w-full sm:w-auto">
                        <button className="w-full sm:w-auto bg-[#00335A] text-white text-xl lg:text-2xl font-bold py-3 lg:py-4 rounded-xl flex items-center justify-between px-4 lg:px-6 hover:bg-[#A99067]">
                            View All Notices
                            <img 
                                src="/arrow.png" 
                                alt="Go to Notices" 
                                className="w-8 lg:w-12 h-auto ml-2" 
                            />
                        </button>
                    </a>
                </div>
            </div>

            {/* Right side - About Section */}
            <div className="max-w-md px-4 lg:px-0">
                <h2 className="text-[#00335A] text-3xl lg:text-4xl font-bold mb-3 lg:mb-4">
                    About EERA
                </h2>
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