import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bell, Star, BookOpen, FileText, Download, User, MapPin, Menu } from "lucide-react";
import LeftSidebar from "./LeftSidebar";

function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-lg border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#b8d7f4] ${className}`}
    >
      {children}
    </div>
  );
}

function CardContent({ children, className = "" }) {
  return <div className={`p-4 sm:p-6 ${className}`}>{children}</div>;
}

function Avatar({ fallback, className = "" }) {
  return (
    <div className={`relative h-8 w-8 sm:h-10 sm:w-10 rounded-full overflow-hidden border-2 border-[#b8d7f4] ${className}`}>
      <div className="h-full w-full flex items-center justify-center bg-[#004B80] text-white font-medium text-sm sm:text-base">
        {fallback ? fallback.slice(0, 2).toUpperCase() : "U"}
      </div>
    </div>
  );
}

function NoticeCard({ notice, icon }) {
  const IconComponent = icon || FileText;

  return (
    <Card className="transform transition-transform duration-300 hover:-translate-y-1">
      <CardContent>
        <div className="aspect-square bg-[#b8d7f4] rounded-lg mb-3 sm:mb-4 flex items-center justify-center overflow-hidden">
          <IconComponent className="h-8 w-8 sm:h-10 sm:w-10 text-[#004B80] opacity-50" />
        </div>
        <h3 className="font-semibold mb-1 sm:mb-2 text-[#004B80] text-sm sm:text-base">
          {notice.notice_title || "Untitled Notice"}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{notice.newspaper_name || ""}</p>
        <div className="flex items-center mt-2 sm:mt-3 text-gray-600 text-xs sm:text-sm">
          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-[#004B80] mr-1 sm:mr-2" />
          <span>{notice.location || "No location provided"}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default function LibraryDashboard() {
  const [user, setUser] = useState(null);
  const [savedNotices, setSavedNotices] = useState([]);
  const [downloadedNotices, setDownloadedNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.error("No auth token found in localStorage");
          setIsLoading(false);
          return;
        }

        const response = await axios.get("https://api.epublicnotices.in/api/webuser/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data && response.data.user) {
          setUser(response.data.user);
          const savedNoticesList = response.data.savedNotices || [];
          const downloadedNoticesList = response.data.downloadedNotices || [];

          const noticeIds = [
            ...new Set([
              ...savedNoticesList.map((n) => n.noticeId),
              ...downloadedNoticesList.map((n) => n.noticeId),
            ]),
          ];

          let noticesMap = {};

          for (const id of noticeIds) {
            try {
              const noticeResponse = await axios.get(`https://api.epublicnotices.in/notices/${id}`);
              const { notice_title, location } = noticeResponse.data;
              noticesMap[id] = { notice_title, location };
            } catch (err) {
              console.error(`Error fetching notice ${id}:`, err);
            }
          }

          setSavedNotices(savedNoticesList.map((n) => ({ ...n, ...noticesMap[n.noticeId] })));
          setDownloadedNotices(downloadedNoticesList.map((n) => ({ ...n, ...noticesMap[n.noticeId] })));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="flex min-h-screen bg-white relative">
      {/* Mobile sidebar toggle */}
      <button 
        onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#004B80] text-white rounded-md shadow-md"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Sidebar - Hidden on mobile by default */}
      <div className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-[#b8d7f4] transform ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-200 ease-in-out`}>
        <LeftSidebar onClose={() => setMobileSidebarOpen(false)} />
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-auto lg:ml-64">
        {/* Header */}
        <header className="p-3 sm:p-4 flex items-center justify-between bg-white shadow-sm border-b border-[#b8d7f4]">
          <h1 className="text-lg sm:text-xl font-bold text-[#004B80]">Eera Admin Panel</h1>
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="relative p-1 sm:p-2 rounded-full hover:bg-[#b8d7f4] transition-colors duration-200">
              <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-[#004B80]" />
              <span className="absolute top-0 right-0 h-1.5 w-1.5 sm:h-2 sm:w-2 bg-red-500 rounded-full"></span>
            </button>
            <Avatar fallback={user?.name} />
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#b8d7f4] to-[#e8f2fd] p-6 sm:p-8 md:p-12 rounded-b-3xl mx-0 relative overflow-hidden shadow-sm">
          <div className="max-w-2xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl text-[#004B80] font-bold mb-3 sm:mb-4 transition-opacity duration-300 ease-in-out">
              {isLoading ? (
                <div className="animate-pulse h-8 sm:h-10 w-48 sm:w-64 bg-white bg-opacity-50 rounded"></div>
              ) : (
                <>Hi, {user?.name || "Welcome"}</>
              )}
            </h1>
            <p className="text-[#004B80] opacity-80 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              The EERA dashboard helps you manage public notices efficiently. You can save and download notices, track your saved notices, and even post new ones as per your rights. Stay organized and in control with EERA.
            </p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <button className="px-4 py-1.5 sm:px-5 sm:py-2 bg-[#004B80] text-white rounded-lg hover:bg-[#003b66] transition-colors duration-200 flex items-center gap-2 shadow-sm text-sm sm:text-base">
                <BookOpen className="h-3 w-3 sm:h-4 sm:w-4" />
                Browse Notices
              </button>
              <a href="/dashboard/profile">
                <button className="px-4 py-1.5 sm:px-5 sm:py-2 bg-white text-[#004B80] rounded-lg hover:bg-[#f0f7ff] transition-colors duration-200 border border-[#004B80] flex items-center gap-2 text-sm sm:text-base">
                  <User className="h-3 w-3 sm:h-4 sm:w-4" />
                  Profile
                </button>
              </a>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -right-16 -bottom-16 h-40 w-40 sm:h-64 sm:w-64 rounded-full bg-[#004B80] opacity-10"></div>
          <div className="absolute right-10 bottom-10 h-10 w-10 sm:h-16 sm:w-16 rounded-full bg-[#004B80] opacity-20"></div>
        </section>

        {/* Main Content */}
        <main className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-4 gap-6 mt-4 sm:mt-6">
          <div className="lg:col-span-3">
            {/* Saved Notices Section */}
            <div className="mb-6 sm:mb-10">
              <div className="flex items-center mb-4 sm:mb-6">
                <Star className="h-5 w-5 sm:h-6 sm:w-6 text-[#004B80] mr-2" />
                <h2 className="text-xl sm:text-2xl font-bold text-[#004B80]">Saved Notices</h2>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="aspect-square bg-[#b8d7f4] bg-opacity-50 rounded-lg mb-3 sm:mb-4"></div>
                      <div className="h-3 sm:h-4 bg-[#b8d7f4] bg-opacity-50 rounded mb-1 sm:mb-2"></div>
                      <div className="h-2 sm:h-3 bg-[#b8d7f4] bg-opacity-40 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : savedNotices.length === 0 ? (
                <div className="text-center py-8 sm:py-12 bg-[#f0f7ff] rounded-lg border border-dashed border-[#b8d7f4]">
                  <Star className="h-8 w-8 sm:h-10 sm:w-10 text-[#b8d7f4] mx-auto mb-3 sm:mb-4" />
                  <p className="text-gray-600 text-sm sm:text-base">No saved notices yet.</p>
                  <p className="text-[#004B80] text-xs sm:text-sm mt-1 sm:mt-2">Browse notices and click the star icon to save them here.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                  {savedNotices.map((notice, index) => (
                    <NoticeCard key={index} notice={notice} icon={Star} />
                  ))}
                </div>
              )}
            </div>

            {/* Downloaded Notices Section */}
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center mb-4 sm:mb-6">
                <Download className="h-5 w-5 sm:h-6 sm:w-6 text-[#004B80] mr-2" />
                <h2 className="text-xl sm:text-2xl font-bold text-[#004B80]">Downloaded Notices</h2>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="aspect-square bg-[#b8d7f4] bg-opacity-50 rounded-lg mb-3 sm:mb-4"></div>
                      <div className="h-3 sm:h-4 bg-[#b8d7f4] bg-opacity-50 rounded mb-1 sm:mb-2"></div>
                      <div className="h-2 sm:h-3 bg-[#b8d7f4] bg-opacity-40 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : downloadedNotices.length === 0 ? (
                <div className="text-center py-8 sm:py-12 bg-[#f0f7ff] rounded-lg border border-dashed border-[#b8d7f4]">
                  <Download className="h-8 w-8 sm:h-10 sm:w-10 text-[#b8d7f4] mx-auto mb-3 sm:mb-4" />
                  <p className="text-gray-600 text-sm sm:text-base">No downloaded notices yet.</p>
                  <p className="text-[#004B80] text-xs sm:text-sm mt-1 sm:mt-2">Download notices to access them offline.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                  {downloadedNotices.map((notice, index) => (
                    <NoticeCard key={index} notice={notice} icon={Download} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - moves below content on small screens */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6 mt-0 sm:mt-14">
            <Card className="bg-gradient-to-b from-white to-[#f0f7ff]">
              <CardContent>
                <h3 className="font-semibold text-[#004B80] mb-3 sm:mb-4 text-sm sm:text-base">Quick Actions</h3>
                <ul className="space-y-2 sm:space-y-3">
                  <li>
                    <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-[#004B80] transition-colors duration-200 text-xs sm:text-sm">
                      <Star className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>View all saved notices</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-[#004B80] transition-colors duration-200 text-xs sm:text-sm">
                      <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>Download history</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-[#004B80] transition-colors duration-200 text-xs sm:text-sm">
                      <User className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>Account settings</span>
                    </a>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h3 className="font-semibold text-[#004B80] mb-3 sm:mb-4 text-sm sm:text-base">Recent Activity</h3>
                {isLoading ? (
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-2 animate-pulse">
                        <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-[#b8d7f4] bg-opacity-50"></div>
                        <div className="flex-1">
                          <div className="h-2 sm:h-3 bg-[#b8d7f4] bg-opacity-50 rounded mb-1"></div>
                          <div className="h-1.5 w-16 sm:w-20 bg-[#b8d7f4] bg-opacity-40 rounded"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs sm:text-sm text-gray-500">No recent activity.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}