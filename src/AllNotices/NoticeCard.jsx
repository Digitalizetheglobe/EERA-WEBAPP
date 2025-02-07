import React from 'react';
import { Link } from "react-router-dom";

export function NoticeCard({ notice }) {

    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-200 flex flex-col h-64">
            {/* Content Container */}
            <div className="flex-1 p-4 min-h-0">
                <div className="flex items-start gap-4 h-full">
                    {/* Notice Image */}
                    
                    <div className="w-20 h-18 flex-shrink-0 rounded-lg overflow-hidden border border-gray-300 bg-gray-100 flex items-center justify-center">
                        {notice.notices_images ? (
                            <img
                                src={`https://api.epublicnotices.in/noticesimage/${notice.notices_images}`}
                                alt={notice.notice_title || 'Notice Image'}
                                className="w-full h-full object-fill" // Changed from object-cover to object-fill
                            />
                        ) : (
                            <span className="text-gray-500 text-xs">No Image</span>
                        )}
                    </div>

                    {/* Notice Details */}
                    <div className="flex-1 overflow-hidden">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{notice.newspaper_name}</h3>
                        <div className="text-sm space-y-1 overflow-hidden">
                            <p><span className="font-medium text-gray-700">Location:</span> <span className="text-gray-600">{notice.location || 'Not specified'}</span></p>
                            <p className="line-clamp-2"><span className="font-medium text-gray-700">Title:</span> <span className="text-gray-600">{notice.notice_title || 'Not specified'}</span></p>
                            <p><span className="font-medium text-gray-700">Category:</span> <span className="text-gray-600">{notice.SelectedCategory || '-'}</span></p>
                            <p><span className="font-medium text-gray-700">Published Date:</span>
                                <span className="text-gray-600 ml-1">
                                    {notice.date ? new Date(notice.date).toLocaleDateString() : 'Not specified'}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* View Detail Button - Fixed at Bottom */}
            <div className="p-4 mt-auto border-t border-gray-100">
                <Link to={`/notices/${notice.id}`}>
                    <button className="w-full bg-[#A99067] text-[#001A3B] py-2 rounded-lg font-medium hover:bg-[#001A3B] transition-all">
                        View Details
                    </button>
                </Link>
            </div>

        </div>
    );
};

export default NoticeCard;