"use client";

import { useState, useEffect } from "react";
import { ChevronRight, User, Shield, Mail, Phone, MapPin, BookmarkIcon, Download, Lock, X, Eye, EyeOff } from "lucide-react";
import LeftSidebar from "./LeftSidebar";
import { toast } from "react-hot-toast";

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

    // State for password change modal
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    });
    const [passwordError, setPasswordError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // State for password visibility
    const [showPasswords, setShowPasswords] = useState({
        currentPassword: false,
        newPassword: false,
        confirmNewPassword: false
    });

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
                // https://api.epublicnotices.in
                //http://localhost:8080 
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

    // Handle password change
    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setPasswordError("");
        setIsSubmitting(true);

        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('https://api.epublicnotices.in/api/webuser/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    currentPassword: passwordData.currentPassword,
                    newPassword: passwordData.newPassword,
                    confirmNewPassword: passwordData.confirmNewPassword
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.details || data.error || 'Failed to change password');
            }

            // Reset form and close modal
            setPasswordData({
                currentPassword: "",
                newPassword: "",
                confirmNewPassword: ""
            });
            setIsPasswordModalOpen(false);
            toast.success(data.message || "Password changed successfully!");
            
            // Clear auth token and redirect to login
            localStorage.removeItem('authToken');
            window.location.href = '/login';
        } catch (err) {
            setPasswordError(err.message);
        } finally {
            setIsSubmitting(false);
        }
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
            <LeftSidebar />
            <div className="flex-1 min-h-screen bg-[#f7fbfe] transition-all duration-300 lg:ml-64">
                {/* Main Content */}
                <div className="p-4 sm:p-6">
                    <div className="max-w-5xl mx-auto">
                        {/* Page Header with Avatar */}
                        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 mt-12 lg:mt-0">
                            <div className="flex flex-col sm:flex-row items-center gap-4 mb-4 sm:mb-0 text-center sm:text-left">
                                <div className="bg-[#b8d7f4]/30 rounded-full p-4 sm:p-6 flex items-center justify-center">
                                    <User className="w-8 h-8 sm:w-10 sm:h-10 text-[#004B80]" />
                                </div>
                                <div>
                                    <h1 className="text-2xl sm:text-3xl font-bold text-[#004B80]">Your Profile</h1>
                                    <p className="text-[#004B80]/70">Manage your personal information</p>
                                </div>
                            </div>
                            
                            <button
                                type="button"
                                onClick={() => setIsPasswordModalOpen(true)}
                                className="bg-[#004B80] text-white py-2 px-4 sm:px-6 rounded-md hover:bg-[#004B80]/90 transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
                            >
                                <Lock className="h-4 w-4" />
                                <div>Change Password</div>
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Profile Content */}
                        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-[#b8d7f4]/50">
                            <div className="mb-6">
                                <h2 className="text-lg font-medium text-[#004B80] mb-4 border-b border-[#b8d7f4]/30 pb-2">Personal Information</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                    {/* Personal Information Cards */}
                                    <div className="bg-[#b8d7f4]/10 rounded-lg p-3 sm:p-4 flex items-center border border-[#b8d7f4]/30 hover:shadow-md transition-all duration-300">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#004B80]/10 rounded-full text-[#004B80] mr-3 sm:mr-4 flex items-center justify-center">
                                            <User className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs sm:text-sm text-[#004B80]/70 font-medium">Name</p>
                                            <p className="text-sm sm:text-base text-[#004B80] font-medium">{user.name}</p>
                                        </div>
                                    </div>

                                    <div className="bg-[#b8d7f4]/10 rounded-lg p-3 sm:p-4 flex items-center border border-[#b8d7f4]/30 hover:shadow-md transition-all duration-300">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#004B80]/10 rounded-full text-[#004B80] mr-3 sm:mr-4 flex items-center justify-center">
                                            <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs sm:text-sm text-[#004B80]/70 font-medium">User Type</p>
                                            <p className="text-sm sm:text-base text-[#004B80] font-medium">{user.userType}</p>
                                        </div>
                                    </div>

                                    <div className="bg-[#b8d7f4]/10 rounded-lg p-3 sm:p-4 flex items-center border border-[#b8d7f4]/30 hover:shadow-md transition-all duration-300">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#004B80]/10 rounded-full text-[#004B80] mr-3 sm:mr-4 flex items-center justify-center">
                                            <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs sm:text-sm text-[#004B80]/70 font-medium">Email</p>
                                            <p className="text-sm sm:text-base text-[#004B80] font-medium break-all">{user.email}</p>
                                        </div>
                                    </div>

                                    <div className="bg-[#b8d7f4]/10 rounded-lg p-3 sm:p-4 flex items-center border border-[#b8d7f4]/30 hover:shadow-md transition-all duration-300">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#004B80]/10 rounded-full text-[#004B80] mr-3 sm:mr-4 flex items-center justify-center">
                                            <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs sm:text-sm text-[#004B80]/70 font-medium">Phone</p>
                                            <p className="text-sm sm:text-base text-[#004B80] font-medium">{user.phone}</p>
                                        </div>
                                    </div>

                                    <div className="bg-[#b8d7f4]/10 rounded-lg p-3 sm:p-4 flex items-center border border-[#b8d7f4]/30 hover:shadow-md transition-all duration-300 sm:col-span-2">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#004B80]/10 rounded-full text-[#004B80] mr-3 sm:mr-4 flex items-center justify-center">
                                            <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs sm:text-sm text-[#004B80]/70 font-medium">Location</p>
                                            <p className="text-sm sm:text-base text-[#004B80] font-medium">{user.location}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Notice Activity Summary */}
                            <div className="mt-6 sm:mt-8">
                                <h2 className="text-lg font-medium text-[#004B80] mb-4 border-b border-[#b8d7f4]/30 pb-2">Activity Summary</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                    <div className="bg-[#b8d7f4]/10 rounded-lg p-4 sm:p-5 border border-[#b8d7f4]/30 hover:shadow-md transition-all duration-300">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="text-[#004B80] font-medium flex items-center gap-2">
                                                <BookmarkIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                                                <span className="text-sm sm:text-base">Saved Notices</span>
                                            </h3>
                                            <span className="bg-[#004B80] text-white text-xs sm:text-sm py-1 px-2 sm:px-3 rounded-full">{savedNotices.length}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p className="text-[#004B80]/70 text-xs sm:text-sm">Click to view your saved notices</p>
                                            <ChevronRight className="h-4 w-4 text-[#004B80]" />
                                        </div>
                                    </div>
                                    
                                    <div className="bg-[#b8d7f4]/10 rounded-lg p-4 sm:p-5 border border-[#b8d7f4]/30 hover:shadow-md transition-all duration-300">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="text-[#004B80] font-medium flex items-center gap-2">
                                                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                                                <span className="text-sm sm:text-base">Downloaded Notices</span>
                                            </h3>
                                            <span className="bg-[#004B80] text-white text-xs sm:text-sm py-1 px-2 sm:px-3 rounded-full">{downloadedNotices.length}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p className="text-[#004B80]/70 text-xs sm:text-sm">Click to view your downloads</p>
                                            <ChevronRight className="h-4 w-4 text-[#004B80]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Password Change Modal */}
            {isPasswordModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-4 sm:p-6 relative">
                        {/* Close button */}
                        <button
                            onClick={() => setIsPasswordModalOpen(false)}
                            className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>

                        {/* Modal Header */}
                        <div className="text-center mb-4 sm:mb-6">
                            <div className="bg-[#004B80]/10 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-[#004B80]" />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-[#004B80]">Change Password</h2>
                            <p className="text-sm sm:text-base text-gray-600 mt-2">Enter your current and new password</p>
                        </div>

                        {/* Password Form */}
                        <form onSubmit={handlePasswordChange} className="space-y-4">
                            {/* Current Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Current Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPasswords.currentPassword ? "text" : "password"}
                                        value={passwordData.currentPassword}
                                        onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                                        className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B80] focus:border-transparent transition-all pr-10 text-sm sm:text-base"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPasswords({...showPasswords, currentPassword: !showPasswords.currentPassword})}
                                        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showPasswords.currentPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* New Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    New Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPasswords.newPassword ? "text" : "password"}
                                        value={passwordData.newPassword}
                                        onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                                        className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B80] focus:border-transparent transition-all pr-10 text-sm sm:text-base"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPasswords({...showPasswords, newPassword: !showPasswords.newPassword})}
                                        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showPasswords.newPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm New Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Confirm New Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPasswords.confirmNewPassword ? "text" : "password"}
                                        value={passwordData.confirmNewPassword}
                                        onChange={(e) => setPasswordData({...passwordData, confirmNewPassword: e.target.value})}
                                        className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B80] focus:border-transparent transition-all pr-10 text-sm sm:text-base"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPasswords({...showPasswords, confirmNewPassword: !showPasswords.confirmNewPassword})}
                                        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showPasswords.confirmNewPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Error Message */}
                            {passwordError && (
                                <div className="text-xs sm:text-sm text-red-500 mt-2 bg-red-50 p-3 rounded-lg border border-red-200">
                                    {passwordError}
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full bg-[#004B80] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#004B80]/90 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base ${
                                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                                }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Updating...</span>
                                    </>
                                ) : (
                                    <>
                                        <Lock className="w-4 h-4" />
                                        <span>Update Password</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}