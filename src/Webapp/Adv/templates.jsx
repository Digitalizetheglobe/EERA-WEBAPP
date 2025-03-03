import React from 'react';

// Define and export the templates array
const templates = [
    // Template 1 - Basic newspaper notice
    (data) => (
        <div className="border-2 border-black bg-gray-100 p-1 w-full max-w-4xl" style={{ fontFamily: 'serif' }}>
            {/* Header */}
            <div className="bg-black text-white text-center p-1 mb-3 font-bold text-xl">
                {data.notice_title || "NOTICE"}
            </div>

            {/* Notice Content */}
            <div className="text-sm mb-4 whitespace-pre-wrap leading-tight">
                {data.notice_description || "Take notice that MR. NAME has represented my client that he is having right, title and interest and is well seized and possessed of the scheduled property in LOCATION and the said owner has agreed to sale/transfer the said schedule property to my client.This is to inform you that Mrs Name and Mr Name are the absolute owners of the Flat Property mentioned in the schedule below. We are verifying the marketability of the title, so we are publishing this public notice. If any person having any right, title, interest or claim of any nature in the said flat property should inform under sign in writing at the office address and shall satisfy his/her right and shall submit the certified copies of the documents within 08 days from the date of publication of this notice, failing which our client shall presume that th"}
            </div>



            {/* Footer */}
            <div className="flex justify-between mt-4 pt-2 border-t border-gray-700 text-sm">
                <div>
                    <div>Dated: {data.date || "DD.MM.YYYY"}</div>
                    <div>Place: {data.location || "Location"}</div>
                </div>
                <div className="text-right">
                    <div className="font-bold text-lg">{data.lawyer_name || "NAME, Advocate"}</div>
                    
                    <div>Mob. {data.phone || "9XXXXXXXXX"}</div>
                </div>
            </div>
        </div>
    ),

    // Template 2 - Formal newspaper legal notice
    (data) => (
        <div className="border-2 border-gray-800 bg-gray-100 p-0 w-full max-w-4xl" style={{ fontFamily: 'serif' }}>
            {/* Header */}
            <div className="bg-black text-white text-center p-2 mb-2 font-bold text-xl border-b-2 border-gray-800">
                {data.notice_title || "PUBLIC NOTICE"}
            </div>

            {/* Main Notice Content */}
            <div className="px-4 py-2">
                <div className="text-sm mb-4 whitespace-pre-wrap leading-tight">
                    {data.notice_description || "This is to inform you that Mrs Name and Mr Name are the absolute owners of the Flat Property mentioned in the schedule below. We are verifying the marketability of the title, so we are publishing this public notice. If any person having any right, title, interest or claim of any nature in the said flat property should inform under sign in writing at the office address and shall satisfy his/her right and shall submit the certified copies of the documents within 08 days from the date of publication of this notice, failing which our client shall presume that the said flat property is free from encumbrances and if any person having any right or claim has intentionally and knowingly waived and surrendered the same."}
                </div>



                {/* Lawyer Details */}
                <div className="mt-4 mb-1">
                    <div className="font-bold text-lg">{data.lawyer_name || "LAWYER NAME, Advocate"}</div>
                    <div className="text-xs leading-tight">
                        Place:{data.location || "Office: 1st Floor, Nakoda Court Building, Near Canara Bank Regional office, Opp. SSPM School Gate, Shivajinagar, Pune - 411005. Email: example@email.com"}
                    </div>
                    <div className="text-xs leading-tight">
                        Date:{data.date || "DD.MM.YYYY"}
                    </div>
                    <div className="text-right text-xs mt-1">Mob.{data.phone || "(Mobile No. 2502053456)"}</div>
                </div>
            </div>
        </div>
    ),

    // Template 3 - Detailed newspaper public notice
    (data) => (
        <div className="border-2 border-black p-6 w-full" style={{ margin: "0 auto" }}>
            <div className="bg-black text-white text-center p-2 mb-2 font-bold text-xl border-b-2 border-gray-800">
      {data.notice_title || "PUBLIC NOTICE"}
    </div>


            <div className="border border-black p-3 text-xs mb-6 whitespace-pre-wrap break-words">
                {data.notice_description || "Take notice that MR. NAME has represented my client that he is having right, title and interest and is well seized and possessed of the scheduled property in LOCATION and the said owner has agreed to sale/transfer the said schedule property to my client.This is to inform you that Mrs Name and Mr Name are the absolute owners of the Flat Property mentioned in the schedule below. We are verifying the marketability of the title, so we are publishing this public notice. If any person having any right, title, interest or claim of any nature in the said flat property should inform under sign in writing at the office address and shall satisfy his/her right and shall submit the certified copies of the documents within 08 days from the date of publication of this notice, failing which our client shall presume that th"}
            </div>
            <table className="w-full text-sm border-collapse mb-3">
                <tbody>
                    
                    <tr>
                        <td className="border border-black p-2 w-1/3">Category:</td>
                        <td className="border border-black p-2">{data.category || "Category"}</td>
                    </tr>
                    <tr>
                        <td className="border border-black p-2">Type:</td>
                        <td className="border border-black p-2">{data.type || "Type"}</td>
                    </tr>
                    <tr>
                        <td className="border border-black p-2">Date:</td>
                        <td className="border border-black p-2">{data.date || "Date"}</td>
                    </tr>
                    <tr>
                        <td className="border border-black p-2">Location:</td>
                        <td className="border border-black p-2">{data.location || "Location"}</td>
                    </tr>
                </tbody>
            </table>

            <div className="text-right mt-4">
                <div className="font-bold">{data.lawyer_name || "Lawyer Name"}</div>
            </div>
        </div>
    )
];

export default templates;