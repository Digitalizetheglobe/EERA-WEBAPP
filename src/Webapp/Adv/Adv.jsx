import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bell, Star, BookOpen, FileText, Download, User, MapPin } from "lucide-react";
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
  return <div className={`p-6 ${className}`}>{children}</div>;
}

function Avatar({ fallback, className = "" }) {
  return (
    <div className={`relative h-10 w-10 rounded-full overflow-hidden border-2 border-[#b8d7f4] ${className}`}>
      <div className="h-full w-full flex items-center justify-center bg-[#004B80] text-white font-medium">
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
        <div className="aspect-square bg-[#b8d7f4] rounded-lg mb-4 flex items-center justify-center overflow-hidden">
          <IconComponent className="h-12 w-12 text-[#004B80] opacity-50" />
        </div>
        <h3 className="font-semibold mb-2 text-[#004B80]">{notice.notice_title || "Untitled Notice"}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{notice.newspaper_name || "No description available."}</p>
        <div className="flex items-center mt-3 text-gray-600">
          <MapPin className="h-4 w-4 text-[#004B80] mr-2" />
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

  //   useEffect(() => {
  //     const fetchUserData = async () => {
  //       setIsLoading(true);
  //       try {
  //         const token = localStorage.getItem("authToken");
  //         if (!token) {
  //           console.error("No auth token found in localStorage");
  //           setIsLoading(false);
  //           return;
  //         }
  // //http://localhost:8080
  // //https://api.epublicnotices.in
  //         const response = await axios.get("http://localhost:8080/api/webuser/profile", {
  //           headers: { Authorization: `Bearer ${token}` },
  //         });

  //         console.log("Fetched User Data:", response.data);

  //         if (response.data && response.data.user) {
  //           setUser(response.data.user);
  //           setSavedNotices(response.data.savedNotices || []);
  //           setDownloadedNotices(response.data.downloadedNotices || []);
  //         } else {
  //           console.error("Invalid API response format");
  //         }
  //       } catch (error) {
  //         console.error("Error fetching user data:", error);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };

  //     fetchUserData();
  //   }, []);


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

        // Fetch user profile data https://api.epublicnotices.in  http://localhost:8080
        const response = await axios.get("https://api.epublicnotices.in/api/webuser/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Fetched User Data:", response.data);

        if (response.data && response.data.user) {
          setUser(response.data.user);
          const savedNoticesList = response.data.savedNotices || [];
          const downloadedNoticesList = response.data.downloadedNotices || [];

          // Extract unique noticeIds
          const noticeIds = [
            ...new Set([
              ...savedNoticesList.map((n) => n.noticeId),
              ...downloadedNoticesList.map((n) => n.noticeId),
            ]),
          ];

          let noticesMap = {};

          // Fetch notice details **one by one**
          for (const id of noticeIds) {
            try {
              const noticeResponse = await axios.get(`https://api.epublicnotices.in/notices/${id}`);
              const { notice_title, location } = noticeResponse.data; // Extract only required fields
              noticesMap[id] = { notice_title, location };
            } catch (err) {
              console.error(`Error fetching notice ${id}:`, err);
            }
          }

          // Replace savedNotices and downloadedNotices with actual notice details
          setSavedNotices(savedNoticesList.map((n) => ({ ...n, ...noticesMap[n.noticeId] })));
          setDownloadedNotices(downloadedNoticesList.map((n) => ({ ...n, ...noticesMap[n.noticeId] })));
        } else {
          console.error("Invalid API response format");
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
    <div className="flex min-h-screen bg-white">
      <LeftSidebar />
      <div className="flex-1 overflow-auto ml-64">
        {/* Header */}
        <header className="p-4 flex items-center justify-between bg-white shadow-sm border-b border-[#b8d7f4]">
          <h1 className="text-5xl font-bold text-[#004B80]">Dashboard</h1>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-[#b8d7f4] transition-colors duration-200">
              <Bell className="h-5 w-5 text-[#004B80]" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <Avatar fallback={user?.name} />
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#b8d7f4] to-[#e8f2fd] p-12 rounded-b-3xl mx-0 relative overflow-hidden shadow-sm">
          <div className="max-w-2xl">
            <h1 className="text-4xl text-[#004B80] font-bold mb-4 transition-opacity duration-300 ease-in-out">
              {isLoading ? (
                <div className="animate-pulse h-10 w-64 bg-white bg-opacity-50 rounded"></div>
              ) : (
                <>Hi, {user?.name || "Welcome"}</>
              )}
            </h1>
            <p className="text-[#004B80] opacity-80 mb-6 leading-relaxed">
              The EERA dashboard helps you manage public notices efficiently. You can save and download notices, track your saved notices, and even post new ones as per your rights. Stay organized and in control with EERA.
            </p>
            <div className="flex space-x-3">
              <button className="px-5 py-2 bg-[#004B80] text-white rounded-lg hover:bg-[#003b66] transition-colors duration-200 flex items-center gap-2 shadow-sm">
                <BookOpen className="h-4 w-4" />
                Browse Notices
              </button>
              <a href="/dashboard/profile">
                <button className="px-5 py-2 bg-white text-[#004B80] rounded-lg hover:bg-[#f0f7ff] transition-colors duration-200 border border-[#004B80] flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </button>
              </a>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-[#004B80] opacity-10"></div>
          <div className="absolute right-20 bottom-20 h-16 w-16 rounded-full bg-[#004B80] opacity-20"></div>
        </section>

        {/* Main Content */}
        <main className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-8 mt-6">
          <div className="lg:col-span-3">
            {/* Saved Notices Section */}
            <div className="mb-10">
              <div className="flex items-center mb-6">
                <Star className="h-6 w-6 text-[#004B80] mr-2" />
                <h2 className="text-2xl font-bold text-[#004B80]">Saved Notices</h2>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="aspect-square bg-[#b8d7f4] bg-opacity-50 rounded-lg mb-4"></div>
                      <div className="h-4 bg-[#b8d7f4] bg-opacity-50 rounded mb-2"></div>
                      <div className="h-3 bg-[#b8d7f4] bg-opacity-40 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : savedNotices.length === 0 ? (
                <div className="text-center py-12 bg-[#f0f7ff] rounded-lg border border-dashed border-[#b8d7f4]">
                  <Star className="h-12 w-12 text-[#b8d7f4] mx-auto mb-4" />
                  <p className="text-gray-600">No saved notices yet.</p>
                  <p className="text-[#004B80] text-sm mt-2">Browse notices and click the star icon to save them here.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {savedNotices.map((notice, index) => (
                    <NoticeCard key={index} notice={notice} icon={Star} />
                  ))}
                </div>
              )}
            </div>

            {/* Downloaded Notices Section */}
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <Download className="h-6 w-6 text-[#004B80] mr-2" />
                <h2 className="text-2xl font-bold text-[#004B80]">Downloaded Notices</h2>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="aspect-square bg-[#b8d7f4] bg-opacity-50 rounded-lg mb-4"></div>
                      <div className="h-4 bg-[#b8d7f4] bg-opacity-50 rounded mb-2"></div>
                      <div className="h-3 bg-[#b8d7f4] bg-opacity-40 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : downloadedNotices.length === 0 ? (
                <div className="text-center py-12 bg-[#f0f7ff] rounded-lg border border-dashed border-[#b8d7f4]">
                  <Download className="h-12 w-12 text-[#b8d7f4] mx-auto mb-4" />
                  <p className="text-gray-600">No downloaded notices yet.</p>
                  <p className="text-[#004B80] text-sm mt-2">Download notices to access them offline.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {downloadedNotices.map((notice, index) => (
                    <NoticeCard key={index} notice={notice} icon={Download} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 mt-14">
            <Card className="bg-gradient-to-b from-white to-[#f0f7ff]">
              <CardContent>
                <h3 className="font-semibold text-[#004B80] mb-4">Quick Actions</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-[#004B80] transition-colors duration-200">
                      <Star className="h-4 w-4" />
                      <span>View all saved notices</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-[#004B80] transition-colors duration-200">
                      <Download className="h-4 w-4" />
                      <span>Download history</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-[#004B80] transition-colors duration-200">
                      <User className="h-4 w-4" />
                      <span>Account settings</span>
                    </a>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h3 className="font-semibold text-[#004B80] mb-4">Recent Activity</h3>
                {isLoading ? (
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-2 animate-pulse">
                        <div className="h-8 w-8 rounded-full bg-[#b8d7f4] bg-opacity-50"></div>
                        <div className="flex-1">
                          <div className="h-3 bg-[#b8d7f4] bg-opacity-50 rounded mb-1"></div>
                          <div className="h-2 w-20 bg-[#b8d7f4] bg-opacity-40 rounded"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No recent activity.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}