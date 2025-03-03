"use client";

import { useState, useEffect } from "react";
import { ChevronRight, User, Shield, Mail, Phone, MapPin, BookmarkIcon, Download, Lock } from "lucide-react";
import LeftSidebar from "./LeftSidebar";

export default function Profile() {
    // State to store user data from API
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        location: "",
        userType: ""
    });
    
    // State for loading and error handling
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // State for saved and downloaded notices
    const [savedNotices, setSavedNotices] = useState([]);
    const [downloadedNotices, setDownloadedNotices] = useState([]);

    // Fetch user profile data from API
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                setLoading(true);
                
                // Get token from local storage or wherever you store it after login
                const token = localStorage.getItem('authToken');
                
                if (!token) {
                    throw new Error('Authentication token not found. Please log in again.');
                }
                
                const response = await fetch('https://api.epublicnotices.in/api/webuser/profile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                
                if (!response.ok) {
                    if (response.status === 401) {
                        // Handle authentication error - redirect to login
                        localStorage.removeItem('AuthToken'); // Clear invalid token
                        throw new Error('Your session has expired. Please log in again.');
                    } else {
                        throw new Error(`API Error: ${response.status}`);
                    }
                }
                
                const data = await response.json();
                setUser(data.user);
                setSavedNotices(data.savedNotices);
                setDownloadedNotices(data.downloadedNotices);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch profile:", err);
                setError(err.message);
                setLoading(false);
            }
        };
        
        fetchUserProfile();
    }, []);

    // Function to handle login redirect
    const handleLoginRedirect = () => {
        // Replace with your actual login page path
        window.location.href = '/login';
    };

    // Loading state
    if (loading) {
        return (
            <div className="bg-white min-h-screen flex">
                <div className="w-64 bg-[#004B80] text-white">
                    <LeftSidebar />
                </div>
                <div className="flex-1 p-6 bg-white flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-[#004B80] border-t-transparent rounded-full animate-spin"></div>
                        <div className="text-[#004B80] font-medium">Loading profile information...</div>
                    </div>
                </div>
            </div>
        );
    }
    
    // Error state with login redirect for auth errors
    if (error) {
        return (
            <div className="bg-white min-h-screen flex">
                <div className="w-64 bg-[#004B80] text-white">
                    <LeftSidebar />
                </div>
                <div className="flex-1 p-6 bg-white flex flex-col items-center justify-center">
                    <div className="p-6 bg-red-50 border border-red-200 rounded-lg mb-6 text-center">
                        <div className="text-red-500 text-lg font-medium mb-4">{error}</div>
                        {(error.includes('session') || error.includes('token') || error.includes('log in')) && (
                            <button 
                                onClick={handleLoginRedirect}
                                className="bg-[#004B80] text-white py-2 px-6 rounded-md hover:bg-[#004B80]/90 transition-all duration-300 flex items-center gap-2 mx-auto"
                            >
                                <div>Go to Login</div>
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen flex">
            {/* Left Sidebar */}
            <div className="w-64 bg-[#004B80] text-white">
                <LeftSidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 bg-white">
                <div className="max-w-5xl mx-auto">
                    {/* Page Header with Avatar */}
                    <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                        <div className="flex items-center gap-4 mb-4 md:mb-0">
                            <div className="bg-[#b8d7f4]/30 rounded-full p-6 flex items-center justify-center">
                                <User className="w-10 h-10 text-[#004B80]" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-[#004B80]">Your Profile</h1>
                                <p className="text-[#004B80]/70">Manage your personal information</p>
                            </div>
                        </div>
                        
                        <button
                            type="button"
                            className="bg-[#004B80] text-white py-2 px-6 rounded-md hover:bg-[#004B80]/90 transition-all duration-300 flex items-center justify-center gap-2 w-full md:w-auto"
                        >
                            <Lock className="h-4 w-4" />
                            <div>Change Password</div>
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Profile Content */}
                    <div className="bg-white rounded-xl shadow-md p-6 border border-[#b8d7f4]/50">
                        <div className="mb-6">
                            <h2 className="text-lg font-medium text-[#004B80] mb-4 border-b border-[#b8d7f4]/30 pb-2">Personal Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Personal Information Cards */}
                                <div className="bg-[#b8d7f4]/10 rounded-lg p-4 flex items-center border border-[#b8d7f4]/30 hover:shadow-md transition-all duration-300">
                                    <div className="w-10 h-10 bg-[#004B80]/10 rounded-full text-[#004B80] mr-4 flex items-center justify-center">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-[#004B80]/70 font-medium">Name</p>
                                        <p className="text-[#004B80] font-medium">{user.name}</p>
                                    </div>
                                </div>

                                <div className="bg-[#b8d7f4]/10 rounded-lg p-4 flex items-center border border-[#b8d7f4]/30 hover:shadow-md transition-all duration-300">
                                    <div className="w-10 h-10 bg-[#004B80]/10 rounded-full text-[#004B80] mr-4 flex items-center justify-center">
                                        <Shield className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-[#004B80]/70 font-medium">User Type</p>
                                        <p className="text-[#004B80] font-medium">{user.userType}</p>
                                    </div>
                                </div>

                                <div className="bg-[#b8d7f4]/10 rounded-lg p-4 flex items-center border border-[#b8d7f4]/30 hover:shadow-md transition-all duration-300">
                                    <div className="w-10 h-10 bg-[#004B80]/10 rounded-full text-[#004B80] mr-4 flex items-center justify-center">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-[#004B80]/70 font-medium">Email</p>
                                        <p className="text-[#004B80] font-medium">{user.email}</p>
                                    </div>
                                </div>

                                <div className="bg-[#b8d7f4]/10 rounded-lg p-4 flex items-center border border-[#b8d7f4]/30 hover:shadow-md transition-all duration-300">
                                    <div className="w-10 h-10 bg-[#004B80]/10 rounded-full text-[#004B80] mr-4 flex items-center justify-center">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-[#004B80]/70 font-medium">Phone</p>
                                        <p className="text-[#004B80] font-medium">{user.phone}</p>
                                    </div>
                                </div>

                                <div className="bg-[#b8d7f4]/10 rounded-lg p-4 flex items-center border border-[#b8d7f4]/30 hover:shadow-md transition-all duration-300 md:col-span-2">
                                    <div className="w-10 h-10 bg-[#004B80]/10 rounded-full text-[#004B80] mr-4 flex items-center justify-center">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-[#004B80]/70 font-medium">Location</p>
                                        <p className="text-[#004B80] font-medium">{user.location}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Notice Activity Summary */}
                        <div className="mt-8">
                            <h2 className="text-lg font-medium text-[#004B80] mb-4 border-b border-[#b8d7f4]/30 pb-2">Activity Summary</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-[#b8d7f4]/10 rounded-lg p-5 border border-[#b8d7f4]/30 hover:shadow-md transition-all duration-300">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-[#004B80] font-medium flex items-center gap-2">
                                            <BookmarkIcon className="w-5 h-5" />
                                            <span>Saved Notices</span>
                                        </h3>
                                        <span className="bg-[#004B80] text-white text-sm py-1 px-3 rounded-full">{savedNotices.length}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-[#004B80]/70 text-sm">Click to view your saved notices</p>
                                        <ChevronRight className="h-4 w-4 text-[#004B80]" />
                                    </div>
                                </div>
                                
                                <div className="bg-[#b8d7f4]/10 rounded-lg p-5 border border-[#b8d7f4]/30 hover:shadow-md transition-all duration-300">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-[#004B80] font-medium flex items-center gap-2">
                                            <Download className="w-5 h-5" />
                                            <span>Downloaded Notices</span>
                                        </h3>
                                        <span className="bg-[#004B80] text-white text-sm py-1 px-3 rounded-full">{downloadedNotices.length}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-[#004B80]/70 text-sm">Click to view your downloads</p>
                                        <ChevronRight className="h-4 w-4 text-[#004B80]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}