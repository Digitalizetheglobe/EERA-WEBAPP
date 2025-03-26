import React from 'react';
import { Link } from "react-router-dom";

export function NoticeCard({ notice }) {
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-200 flex flex-col h-72">
            {/* Content Container */}
            <div className="flex-1 p-5">
                <div className="flex items-start gap-4 h-full">
                    {/* Notice Image */}
                    <div className="w-24 h-20 flex-shrink-0 rounded-lg overflow-hidden border border-gray-300 bg-gray-100 flex items-center justify-center">
                        {notice.notices_images ? (
                            <img
                                src={`https://public-notices-bucket.s3.ap-south-1.amazonaws.com/${notice.notices_images}`}
                                alt={notice.notice_title || 'Notice Image'}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-gray-500 text-xs">No Image</span>
                        )}
                    </div>

                    {/* Notice Details */}
                    <div className="flex-1 overflow-hidden">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">{notice.newspaper_name}</h3>
                        <div className="text-sm space-y-1">
                            <p className="truncate"><span className="font-medium text-gray-700">Location:</span> {notice.location || 'Not specified'}</p>
                            <p className="truncate"><span className="font-medium text-gray-700">Title:</span> {notice.notice_title || 'Not specified'}</p>
                            <p className="truncate"><span className="font-medium text-gray-700">Category:</span> {notice.SelectedCategory || '-'}</p>
                            <p className="truncate"><span className="font-medium text-gray-700">Published Date:</span> {notice.date ? new Date(notice.date).toLocaleDateString() : 'Not specified'}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* View Detail Button - Fixed at Bottom */}
            <div className="p-4 border-t border-gray-100">
                <Link to={`/notices/${notice.id}`}>
                    <button className="w-full bg-[#A99067] text-white py-2 rounded-lg font-medium hover:bg-[#8B785A] transition-all">
                        View Details
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default NoticeCard;