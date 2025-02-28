import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bell, Star, BookOpen } from "lucide-react";
import LeftSidebar from "./LeftSidebar";


function Card({ children, className = "" }) {
  return <div className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}>{children}</div>;
}

function CardContent({ children, className = "" }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

function Avatar({ fallback, className = "" }) {
  return (
    <div className={`relative h-10 w-10 rounded-full overflow-hidden ${className}`}>
      <div className="h-full w-full flex items-center justify-center bg-purple-100 text-purple-500 font-medium">
        {fallback ? fallback.slice(0, 2) : "U"}
      </div>
    </div>
  );
}


export default function LibraryDashboard() {
  const [user, setUser] = useState(null);
  const [savedNotices, setSavedNotices] = useState([]);
  const [downloadedNotices, setDownloadedNotices] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.error("No auth token found in localStorage");
          return;
        }

        const response = await axios.get("https://api.epublicnotices.in/api/webuser/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Fetched User Data:", response.data);

        if (response.data && response.data.user) {
          setUser(response.data.user);
          setSavedNotices(response.data.savedNotices || []);
          setDownloadedNotices(response.data.downloadedNotices || []);
        } else {
          console.error("Invalid API response format");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="flex min-h-screen bg-purple-50">
      <LeftSidebar />
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="p-4 flex items-center justify-between bg-white shadow">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <Bell className="h-5 w-5 text-gray-500" />
            <Avatar fallback={user?.name} />
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-[#E4ECFB] text-white p-12 rounded-3xl mx-4 mt-4 relative overflow-hidden">
          <div className="max-w-2xl">
            <h1 className="text-4xl text-black font-bold mb-4">Hi, {user?.name || "Loading..."}</h1>
            <p className="text-gray-500 mb-6">
              The EERA dashboard helps you manage public notices efficiently. You can save and download notices, track your saved notices, and even post new ones as per your rights. Stay organized and in control with EERA.
            </p>

          </div>
        </section>

        {/* Main Content */}
        <main className="p-4 grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          <div className="lg:col-span-3">
            {/* Saved Notices Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Saved Notices</h2>
              {savedNotices.length === 0 ? (
                <p className="text-gray-500">No saved notices.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {savedNotices.map((notice, index) => (
                    <Card key={index}>
                      <CardContent>
                        <div className="aspect-square bg-purple-100 rounded-lg mb-4"></div>
                        <h3 className="font-semibold mb-2">{notice.title || "Untitled Notice"}</h3>
                        <p className="text-sm text-gray-500">{notice.description || "No description available."}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Downloaded Notices Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Downloaded Notices</h2>
              {downloadedNotices.length === 0 ? (
                <p className="text-gray-500">No downloaded notices.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {downloadedNotices.map((notice, index) => (
                    <Card key={index}>
                      <CardContent>
                        <div className="aspect-square bg-purple-100 rounded-lg mb-4"></div>
                        <h3 className="font-semibold mb-2">{notice.title || "Untitled Notice"}</h3>
                        <p className="text-sm text-gray-500">{notice.description || "No description available."}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar (Optional Additional Content) */}
          <div className="space-y-6">
          </div>
        </main>
      </div>
    </div>
  );
}
