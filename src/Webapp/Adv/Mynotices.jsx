import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LeftSidebar from "./LeftSidebar";
import templates from "./templates";
import { useTranslation } from 'react-i18next';

const MyNotices = () => {
  const { t, i18n } = useTranslation();
  const [publishedNotices, setPublishedNotices] = useState([]);
  const [draftNotices, setDraftNotices] = useState([]);
  const [activeTab, setActiveTab] = useState("published");
  const [noticeTemplates, setNoticeTemplates] = useState([
    {
      id: 1,
      name: "Standard Notice",
      description: "Basic notice template with title and content",
      lastModified: new Date().toISOString(),
      status: "active"
    },
    {
      id: 2,
      name: "Urgent Notice",
      description: "Template for urgent announcements with highlighted sections",
      lastModified: new Date().toISOString(),
      status: "active"
    },
    {
      id: 3,
      name: "Event Notice",
      description: "Template for event announcements with date and location",
      lastModified: new Date().toISOString(),
      status: "draft"
    }
  ]);
  const [landNotices, setLandNotices] = useState([]);
  const [landFormData, setLandFormData] = useState({
    notice_title: "",
    surveyNumber: "",
    hissaNumber: "",
    ownerName: "",
    ownershipType: "",
    occupantClass: "",
    mutationEntryNumber: "",
    landArea: "",
    cultivatorName: "",
    cropDetails: "",
    irrigationType: "",
    taxDetails: "",
    boundaries: {
      north: "",
      south: "",
      east: "",
      west: ""
    },
    landDescription: ""
  });
  const navigate = useNavigate();

  // Language switching function
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  // Load notices from localStorage on component mount
  useEffect(() => {
    const storedPublished = JSON.parse(
      localStorage.getItem("publishedNotices") || "[]"
    );
    const storedDrafts = JSON.parse(
      localStorage.getItem("noticeDrafts") || "[]"
    );

    // Sort by date (newest first)
    setPublishedNotices(
      storedPublished.sort(
        (a, b) => new Date(b.publishDate) - new Date(a.publishDate)
      )
    );

    setDraftNotices(
      storedDrafts.sort(
        (a, b) => new Date(b.lastEdited) - new Date(a.lastEdited)
      )
    );
  }, []);

  // Load land notices from localStorage
  useEffect(() => {
    const storedLandNotices = JSON.parse(localStorage.getItem("landNotices") || "[]");
    setLandNotices(storedLandNotices);
  }, []);

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle continue editing draft
  const handleEditDraft = (draft) => {
    navigate("/template", { state: { draft } });
  };

  // Handle delete draft
  const handleDeleteDraft = (draftId) => {
    if (window.confirm("Are you sure you want to delete this draft?")) {
      const updatedDrafts = draftNotices.filter(
        (draft) => draft.id !== draftId
      );
      setDraftNotices(updatedDrafts);
      localStorage.setItem("noticeDrafts", JSON.stringify(updatedDrafts));
    }
  };

  // Handle create new notice
  const handleCreateNew = () => {
    navigate("/template");
  };

  // Handle template actions
  const handleEditTemplate = (templateId) => {
    navigate(`/template-editor/${templateId}`);
  };

  const handleDeleteTemplate = (templateId) => {
    if (window.confirm("Are you sure you want to delete this template?")) {
      setNoticeTemplates(noticeTemplates.filter(template => template.id !== templateId));
    }
  };

  const handleCreateTemplate = () => {
    navigate("/template-editor/new");
  };

  // Handle land notice actions
  const handleLandNoticeSubmit = (e) => {
    e.preventDefault();
    const newNotice = {
      id: Date.now(),
      ...landFormData,
      status: "draft",
      lastEdited: new Date().toISOString(),
      type: "land_notice",
      templateIndex: 3
    };
    setLandNotices([newNotice, ...landNotices]);
    localStorage.setItem("landNotices", JSON.stringify([newNotice, ...landNotices]));
    setLandFormData({
      notice_title: "",
      surveyNumber: "",
      hissaNumber: "",
      ownerName: "",
      ownershipType: "",
      occupantClass: "",
      mutationEntryNumber: "",
      landArea: "",
      cultivatorName: "",
      cropDetails: "",
      irrigationType: "",
      taxDetails: "",
      boundaries: {
        north: "",
        south: "",
        east: "",
        west: ""
      },
      landDescription: ""
    });
  };

  return (
    <div className="flex">
      <LeftSidebar />
      <div className="ml-64 min-h-screen bg-[#f7fbfe] w-full">
        <div className="bg-[#004B80] text-white p-4 shadow-md flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Notices</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => changeLanguage('en')}
              className={`px-3 py-1 rounded ${i18n.language === 'en' ? 'bg-white text-[#004B80]' : 'text-white'}`}
            >
              English
            </button>
            <button
              onClick={() => changeLanguage('mr')}
              className={`px-3 py-1 rounded ${i18n.language === 'mr' ? 'bg-white text-[#004B80]' : 'text-white'}`}
            >
              मराठी
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`py-2 px-4 text-sm font-medium ${
                activeTab === "published"
                  ? "border-b-2 border-[#004B80] text-[#004B80]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("published")}
            >
              Published Notices
            </button>
            <button
              className={`py-2 px-4 text-sm font-medium ${
                activeTab === "drafts"
                  ? "border-b-2 border-[#004B80] text-[#004B80]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("drafts")}
            >
              Draft Notices{" "}
              {draftNotices.length > 0 && `(${draftNotices.length})`}
            </button>
            <button
              className={`py-2 px-4 text-sm font-medium ${
                activeTab === "templates"
                  ? "border-b-2 border-[#004B80] text-[#004B80]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("templates")}
            >
              Edit Notices Template{" "}
              {noticeTemplates.length > 0 && `(${noticeTemplates.length})`}
            </button>
            <button
              className={`py-2 px-4 text-sm font-medium ${
                activeTab === "land_notice"
                  ? "border-b-2 border-[#004B80] text-[#004B80]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("land_notice")}
            >
              Post Land Related Notice
            </button>
          </div>

          {/* Create New Button */}
          <div className="mb-6">
            <button
              onClick={handleCreateNew}
              className="px-4 py-2 bg-[#004B80] text-white rounded-md hover:bg-[#003b66] transition shadow-md flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Create New Notice
            </button>
          </div>

          {/* Published Notices */}
          {activeTab === "published" && (
            <div>
              {publishedNotices.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <div className="text-gray-400 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 mx-auto"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">
                    No published notices yet
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Your published notices will appear here
                  </p>
                  <button
                    onClick={handleCreateNew}
                    className="px-4 py-2 bg-[#004B80] text-white rounded-md hover:bg-[#003b66] transition shadow-md"
                  >
                    Create Your First Notice
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {publishedNotices.map((notice) => (
                    <div
                      key={notice.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                      <div className="bg-[#004B80] text-white py-2 px-4 flex justify-between items-center">
                        <div className="font-medium truncate">
                          {notice.notice_title}
                        </div>
                        <div className="text-xs bg-yellow-500 text-white py-1 px-2 rounded">
                          {notice.status === "under_review"
                            ? "Under Review"
                            : notice.status}
                        </div>
                      </div>
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="text-sm">
                          <span className="text-gray-500">Category:</span>{" "}
                          {notice.category.replace("_", " ")}
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">Published:</span>{" "}
                          {formatDate(notice.publishDate)}
                        </div>
                      </div>
                      <div className="p-4 max-h-40 overflow-hidden">
                        <div className="transform scale-75 origin-top-left">
                          {templates[notice.templateIndex](notice, t)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Draft Notices */}
          {activeTab === "drafts" && (
            <div>
              {draftNotices.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <div className="text-gray-400 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 mx-auto"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">
                    No draft notices
                  </h3>
                  <p className="text-gray-500 mb-4">
                    When you start creating a notice and leave before
                    publishing, it will be saved here
                  </p>
                  <button
                    onClick={handleCreateNew}
                    className="px-4 py-2 bg-[#004B80] text-white rounded-md hover:bg-[#003b66] transition shadow-md"
                  >
                    Create a Notice
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {draftNotices.map((draft) => (
                    <div
                      key={draft.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                      <div className="bg-[#b8d7f4] text-[#004B80] py-2 px-4 flex justify-between items-center">
                        <div className="font-medium truncate">
                          {draft.notice_title || "Untitled Notice"}
                        </div>
                        <div className="text-xs bg-gray-200 text-gray-700 py-1 px-2 rounded">
                          Draft
                        </div>
                      </div>
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="text-sm">
                          <span className="text-gray-500">Last edited:</span>{" "}
                          {formatDate(draft.lastEdited)}
                        </div>
                        {draft.category && (
                          <div className="text-sm">
                            <span className="text-gray-500">Category:</span>{" "}
                            {draft.category.replace("_", " ")}
                          </div>
                        )}
                      </div>
                      <div className="p-4 max-h-40 overflow-hidden">
                        <div className="transform scale-75 origin-top-left">
                          {templates[draft.templateIndex](draft, t)}
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 flex justify-between">
                        <button
                          onClick={() => handleEditDraft(draft)}
                          className="text-sm text-[#004B80] hover:text-[#003b66] font-medium flex items-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                          Continue Editing
                        </button>
                        <button
                          onClick={() => handleDeleteDraft(draft.id)}
                          className="text-sm text-red-500 hover:text-red-700 font-medium flex items-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Edit Notices Template Tab */}
          {activeTab === "templates" && (
            <div>
              <div className="mb-6">
                {/* <button
                  onClick={handleCreateTemplate}
                  className="px-4 py-2 bg-[#004B80] text-white rounded-md hover:bg-[#003b66] transition shadow-md flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Create New Template
                </button> */}
              </div>

              {noticeTemplates.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <div className="text-gray-400 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 mx-auto"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">
                    No templates available
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Create your first notice template to get started
                  </p>
                  <button
                    onClick={handleCreateTemplate}
                    className="px-4 py-2 bg-[#004B80] text-white rounded-md hover:bg-[#003b66] transition shadow-md"
                  >
                    Create Your First Template
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {noticeTemplates.map((template) => (
                    <div
                      key={template.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                      <div className="bg-[#004B80] text-white py-2 px-4 flex justify-between items-center">
                        <div className="font-medium truncate">
                          {template.name}
                        </div>
                        <div className={`text-xs py-1 px-2 rounded ${
                          template.status === "active" 
                            ? "bg-green-500" 
                            : "bg-yellow-500"
                        } text-white`}>
                          {template.status}
                        </div>
                      </div>
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="text-sm text-gray-600 mb-2">
                          {template.description}
                        </div>
                        <div className="text-xs text-gray-500">
                          Last modified: {formatDate(template.lastModified)}
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 flex justify-between">
                        <button
                          onClick={() => handleEditTemplate(template.id)}
                          className="text-sm text-[#004B80] hover:text-[#003b66] font-medium flex items-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                          Edit Template
                        </button>
                        <button
                          onClick={() => handleDeleteTemplate(template.id)}
                          className="text-sm text-red-500 hover:text-red-700 font-medium flex items-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Land Notice Form */}
          {activeTab === "land_notice" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Form Section */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6">{t('landNoticeForm')}</h2>
                <form onSubmit={handleLandNoticeSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Notice Title */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('noticeTitle')}
                      </label>
                      <input
                        type="text"
                        value={landFormData.notice_title}
                        onChange={(e) => setLandFormData({...landFormData, notice_title: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B80] focus:border-transparent"
                        required
                        placeholder={t('noticeTitle')}
                      />
                    </div>

                    {/* Survey Number */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('surveyNumber')}
                      </label>
                      <input
                        type="text"
                        value={landFormData.surveyNumber}
                        onChange={(e) => setLandFormData({...landFormData, surveyNumber: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B80] focus:border-transparent"
                        required
                      />
                    </div>

                    {/* Hissa Number */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('hissaNumber')}
                      </label>
                      <input
                        type="text"
                        value={landFormData.hissaNumber}
                        onChange={(e) => setLandFormData({...landFormData, hissaNumber: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B80] focus:border-transparent"
                        required
                      />
                    </div>

                    {/* Owner's Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('ownerName')}
                      </label>
                      <input
                        type="text"
                        value={landFormData.ownerName}
                        onChange={(e) => setLandFormData({...landFormData, ownerName: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B80] focus:border-transparent"
                        required
                      />
                    </div>

                    {/* Type of Ownership */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('ownershipType')}
                      </label>
                      <select
                        value={landFormData.ownershipType}
                        onChange={(e) => setLandFormData({...landFormData, ownershipType: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B80] focus:border-transparent"
                        required
                      >
                        <option value="">{t('selectOwnershipType')}</option>
                        <option value="individual">{t('individual')}</option>
                        <option value="joint">{t('joint')}</option>
                        <option value="government">{t('government')}</option>
                        <option value="trust">{t('trust')}</option>
                      </select>
                    </div>

                    {/* Occupant Class */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('occupantClass')}
                      </label>
                      <select
                        value={landFormData.occupantClass}
                        onChange={(e) => setLandFormData({...landFormData, occupantClass: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B80] focus:border-transparent"
                        required
                      >
                        <option value="">{t('selectOccupantClass')}</option>
                        <option value="owner">{t('owner')}</option>
                        <option value="tenant">{t('tenant')}</option>
                        <option value="lease">{t('lease')}</option>
                      </select>
                    </div>

                    {/* Mutation Entry Number */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('mutationEntryNumber')}
                      </label>
                      <input
                        type="text"
                        value={landFormData.mutationEntryNumber}
                        onChange={(e) => setLandFormData({...landFormData, mutationEntryNumber: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B80] focus:border-transparent"
                        required
                      />
                    </div>

                    {/* Land Area */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('landArea')}
                      </label>
                      <input
                        type="text"
                        value={landFormData.landArea}
                        onChange={(e) => setLandFormData({...landFormData, landArea: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B80] focus:border-transparent"
                        required
                      />
                    </div>

                    {/* Cultivator's Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('cultivatorName')}
                      </label>
                      <input
                        type="text"
                        value={landFormData.cultivatorName}
                        onChange={(e) => setLandFormData({...landFormData, cultivatorName: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B80] focus:border-transparent"
                        required
                      />
                    </div>

                    {/* Crop Details */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('cropDetails')}
                      </label>
                      <textarea
                        value={landFormData.cropDetails}
                        onChange={(e) => setLandFormData({...landFormData, cropDetails: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B80] focus:border-transparent"
                        rows="3"
                        required
                      />
                    </div>

                    {/* Irrigation Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('irrigationType')}
                      </label>
                      <select
                        value={landFormData.irrigationType}
                        onChange={(e) => setLandFormData({...landFormData, irrigationType: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B80] focus:border-transparent"
                        required
                      >
                        <option value="">{t('selectIrrigationType')}</option>
                        <option value="well">{t('well')}</option>
                        <option value="canal">{t('canal')}</option>
                        <option value="rainfed">{t('rainfed')}</option>
                        <option value="other">{t('other')}</option>
                      </select>
                    </div>

                    {/* Tax & Revenue Details */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('taxDetails')}
                      </label>
                      <textarea
                        value={landFormData.taxDetails}
                        onChange={(e) => setLandFormData({...landFormData, taxDetails: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B80] focus:border-transparent"
                        rows="3"
                        required
                      />
                    </div>

                    {/* Boundaries */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('boundaries')}
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">{t('north')}</label>
                          <input
                            type="text"
                            value={landFormData.boundaries.north}
                            onChange={(e) => setLandFormData({
                              ...landFormData,
                              boundaries: {...landFormData.boundaries, north: e.target.value}
                            })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B80] focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">{t('south')}</label>
                          <input
                            type="text"
                            value={landFormData.boundaries.south}
                            onChange={(e) => setLandFormData({
                              ...landFormData,
                              boundaries: {...landFormData.boundaries, south: e.target.value}
                            })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B80] focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">{t('east')}</label>
                          <input
                            type="text"
                            value={landFormData.boundaries.east}
                            onChange={(e) => setLandFormData({
                              ...landFormData,
                              boundaries: {...landFormData.boundaries, east: e.target.value}
                            })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B80] focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">{t('west')}</label>
                          <input
                            type="text"
                            value={landFormData.boundaries.west}
                            onChange={(e) => setLandFormData({
                              ...landFormData,
                              boundaries: {...landFormData.boundaries, west: e.target.value}
                            })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B80] focus:border-transparent"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Land Description */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('landDescription')}
                      </label>
                      <textarea
                        value={landFormData.landDescription}
                        onChange={(e) => setLandFormData({...landFormData, landDescription: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B80] focus:border-transparent"
                        rows="4"
                        required
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#004B80] text-white rounded-md hover:bg-[#003b66] transition shadow-md flex items-center gap-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {t('saveNotice')}
                    </button>
                  </div>
                </form>
              </div>

              {/* Preview Section */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6">{t('noticePreview')}</h2>
                <div className="border rounded-lg p-4 bg-gray-50">
                  <div className="transform scale-75 origin-top-left">
                    {templates[3](landFormData, t)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyNotices;
