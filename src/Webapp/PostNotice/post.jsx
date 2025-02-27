import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const Post = () => {
    return (
        <div className="w-full flex justify-center p-2 my-6">
            <div
                className="w-full max-w-6xl rounded-xl m-2 p-10 relative"
                style={{
                    backgroundColor: '#004b80',
                    border: '2px dashed white',
                    color: 'white'
                }}
            >
                <div className="flex flex-col md:flex-row justify-between items-center ">
                    <div className="flex flex-col md:max-w-xl">
                        <h1 className="text-5xl md:text-5xl font-bold mb-3">Make Your Notice Matter</h1>
                        <p className="text-lg text-gray-200 leading-relaxed">
                            Post your notices quickly and efficiently with our intuitive upload tools.
                            Whether it's corporate updates, legal announcements, or real estate information,
                            ensure your message reaches the right audience.
                        </p>
                    </div>

                    <div className="flex items-center ">
                        <div className="mr-4">
                            {/* Keeping the original arrow image */}
                            <img src="/curvearrow.png" alt="Post Notices" className="w-60 -rotate-[0.6rad]" />
                        </div>
                    </div>
                        <button
                            className="px-6 py-3 mt-15 rounded-full text-[#004b80] font-bold transition-transform hover:scale-105"
                            style={{ backgroundColor: 'white' }}
                        >
                            Post Now
                        </button>
                    
                </div>
            </div>
        </div>
    );
};

export default Post;