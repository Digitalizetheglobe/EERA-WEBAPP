import React from "react";

// Helper function to safely handle translations
const safeTranslate = (t, key, options = {}) => {
  if (typeof t === 'function') {
    return t(key, options);
  }
  return key;
};

// Define and export the templates array
const templates = [
  // Template 1 - Basic newspaper notice
  (data, t = key => key) => (
    <div
      className="border-2 border-black bg-gray-100 p-1 w-full max-w-4xl"
      style={{ fontFamily: "serif" }}
    >
      {/* Header */}
      <div className="bg-black text-white text-center p-1 mb-3 font-bold text-xl">
        {data.notice_title || safeTranslate(t, "NOTICE")}
      </div>

      {/* Notice Content */}
      <div className="text-sm mb-4 whitespace-pre-wrap leading-tight">
        {data.landDescription || safeTranslate(t, "Take notice that MR. NAME has represented my client...")}
      </div>

      {/* Footer */}
      <div className="flex justify-between mt-4 pt-2 border-t border-gray-700 text-sm">
        <div>
          <div>{safeTranslate(t, "Dated")}: {data.date || "DD.MM.YYYY"}</div>
          <div>{safeTranslate(t, "Place")}: {data.location || "Location"}</div>
        </div>
        <div className="text-right">
          <div className="font-bold text-lg">
            {data.lawyer_name || safeTranslate(t, "NAME, Advocate")}
          </div>
          <div>{safeTranslate(t, "Mob")}. {data.phone || "9XXXXXXXXX"}</div>
        </div>
      </div>
    </div>
  ),

  // Template 2 - Formal newspaper legal notice
  (data, t = key => key) => (
    <div
      className="border-2 border-gray-800 bg-gray-100 p-0 w-full max-w-4xl"
      style={{ fontFamily: "serif" }}
    >
      {/* Header */}
      <div className="bg-black text-white text-center p-2 mb-2 font-bold text-xl border-b-2 border-gray-800">
        {data.notice_title || safeTranslate(t, "PUBLIC NOTICE")}
      </div>

      {/* Main Notice Content */}
      <div className="px-4 py-2">
        <div className="text-sm mb-4 whitespace-pre-wrap leading-tight">
          {data.landDescription || safeTranslate(t, "This is to inform you that...")}
        </div>

        {/* Lawyer Details */}
        <div className="mt-4 mb-1">
          <div className="font-bold text-lg">
            {data.lawyer_name || safeTranslate(t, "LAWYER NAME, Advocate")}
          </div>
          <div className="text-xs leading-tight">
            {safeTranslate(t, "Place")}: {data.location || "Office: 1st Floor..."}
          </div>
          <div className="text-xs leading-tight">
            {safeTranslate(t, "Date")}: {data.date || "DD.MM.YYYY"}
          </div>
          <div className="text-right text-xs mt-1">
            {safeTranslate(t, "Mob")}. {data.phone || "(Mobile No. 2502053456)"}
          </div>
        </div>
      </div>
    </div>
  ),

  // Template 3 - Detailed newspaper public notice
  (data, t = key => key) => (
    <div
      className="border-2 border-black p-6 w-full"
      style={{ margin: "0 auto" }}
    >
      <div className="bg-black text-white text-center p-2 mb-2 font-bold text-xl border-b-2 border-gray-800">
        {data.notice_title || safeTranslate(t, "PUBLIC NOTICE")}
      </div>

      <div className="border border-black p-3 text-xs mb-6 whitespace-pre-wrap break-words">
        {data.landDescription || safeTranslate(t, "Take notice that...")}
      </div>
      <table className="w-full text-sm border-collapse mb-3">
        <tbody>
          <tr>
            <td className="border border-black p-2 w-1/3">{safeTranslate(t, "Category")}:</td>
            <td className="border border-black p-2">
              {data.category || safeTranslate(t, "Category")}
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2">{safeTranslate(t, "Type")}:</td>
            <td className="border border-black p-2">{data.type || safeTranslate(t, "Type")}</td>
          </tr>
          <tr>
            <td className="border border-black p-2">{safeTranslate(t, "Date")}:</td>
            <td className="border border-black p-2">{data.date || safeTranslate(t, "Date")}</td>
          </tr>
          <tr>
            <td className="border border-black p-2">{safeTranslate(t, "Location")}:</td>
            <td className="border border-black p-2">
              {data.location || safeTranslate(t, "Location")}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="text-right mt-4">
        <div className="font-bold">{data.lawyer_name || safeTranslate(t, "Lawyer Name")}</div>
      </div>
    </div>
  ),

  // Template 4 - Land Notice Template
  (data, t = key => key) => (
    <div
      className="border-2 border-black bg-gray-100 p-6 w-full max-w-4xl"
      style={{ fontFamily: "serif" }}
    >
      {/* Header */}
      <div className="bg-black text-white text-center p-3 mb-6 font-bold text-2xl">
        {data.notice_title || safeTranslate(t, "Land Notice")}
      </div>

      {/* Main Content */}
      <div className="space-y-6 text-base leading-relaxed">
        <div className="text-justify">
          {safeTranslate(t, "noticeIntro", {
            ownerName: data.ownerName || "___________",
            surveyNumber: data.surveyNumber || "___________",
            hissaNumber: data.hissaNumber || "___________",
          })}
        </div>

        <div className="text-justify">
          {safeTranslate(t, "propertyDetails", {
            landArea: data.landArea || "___________",
            ownershipType: data.ownershipType || "___________",
            mutationEntryNumber: data.mutationEntryNumber || "___________",
          })}
        </div>

        <div className="text-justify">
          {safeTranslate(t, "boundariesDescription", {
            north: data.boundaries?.north || "___________",
            south: data.boundaries?.south || "___________",
            east: data.boundaries?.east || "___________",
            west: data.boundaries?.west || "___________",
          })}
        </div>

        <div className="text-justify">
          {safeTranslate(t, "cultivationDetails", {
            cultivatorName: data.cultivatorName || "___________",
            cropDetails: data.cropDetails || "___________",
            irrigationType: data.irrigationType || "___________",
          })}
        </div>

        <div className="text-justify">
          {safeTranslate(t, "taxInformation", {
            taxDetails: data.taxDetails || "___________",
          })}
        </div>

        {data.landDescription && (
          <div className="text-justify">{data.landDescription}</div>
        )}

        <div className="text-justify font-medium">{safeTranslate(t, "noticeDisclaimer")}</div>
      </div>

      {/* Property Schedule */}
      <div className="mt-8 border-t border-gray-300 pt-4">
        <h3 className="font-bold mb-4">{safeTranslate(t, "propertySchedule")}</h3>
        <table className="w-full text-sm">
          <tbody>
            <tr>
              <td
                className="py-2 pr-4 align-top font-semibold"
                style={{ width: "120px" }}
              >
                {safeTranslate(t, "surveyNumber")}:
              </td>
              <td className="py-2">{data.surveyNumber || "___________"}</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 align-top font-semibold">
                {safeTranslate(t, "hissaNumber")}:
              </td>
              <td className="py-2">{data.hissaNumber || "___________"}</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 align-top font-semibold">
                {safeTranslate(t, "area")}:
              </td>
              <td className="py-2">{data.landArea || "___________"}</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 align-top font-semibold">
                {safeTranslate(t, "boundaries")}:
              </td>
              <td className="py-2">
                {safeTranslate(t, "north")}: {data.boundaries?.north || "___________"}
                <br />
                {safeTranslate(t, "south")}: {data.boundaries?.south || "___________"}
                <br />
                {safeTranslate(t, "east")}: {data.boundaries?.east || "___________"}
                <br />
                {safeTranslate(t, "west")}: {data.boundaries?.west || "___________"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t border-gray-700">
        <div className="flex justify-between text-sm">
          <div>
            <div className="font-semibold">
              {safeTranslate(t, "place")}: {data.location || "___________"}
            </div>
            <div className="font-semibold">
              {safeTranslate(t, "date")}: {data.date || new Date().toLocaleDateString()}
            </div>
          </div>
          {/* <div className="text-right">
            <div className="font-bold text-lg mb-1">{data.lawyer_name || "___________"}</div>
            <div>{safeTranslate(t, "advocate")}</div>
            <div className="text-sm mt-1">{safeTranslate(t, "advocateDetails")}</div>
          </div> */}
        </div>
      </div>
    </div>
  ),
];

export default templates;
