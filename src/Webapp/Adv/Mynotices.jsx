import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LeftSidebar from './LeftSidebar';
import templates from './templates';

const MyNotices = () => {
  const [publishedNotices, setPublishedNotices] = useState([]);
  const [draftNotices, setDraftNotices] = useState([]);
  const [activeTab, setActiveTab] = useState('published');
  const navigate = useNavigate();
  
  // Load notices from localStorage on component mount
  useEffect(() => {
    const storedPublished = JSON.parse(localStorage.getItem('publishedNotices') || '[]');
    const storedDrafts = JSON.parse(localStorage.getItem('noticeDrafts') || '[]');
    
    // Sort by date (newest first)
    setPublishedNotices(storedPublished.sort((a, b) => 
      new Date(b.publishDate) - new Date(a.publishDate)
    ));
    
    setDraftNotices(storedDrafts.sort((a, b) => 
      new Date(b.lastEdited) - new Date(a.lastEdited)
    ));
  }, []);
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Handle continue editing draft
  const handleEditDraft = (draft) => {
    navigate('/template', { state: { draft } });
  };
  
  // Handle delete draft
  const handleDeleteDraft = (draftId) => {
    if (window.confirm('Are you sure you want to delete this draft?')) {
      const updatedDrafts = draftNotices.filter(draft => draft.id !== draftId);
      setDraftNotices(updatedDrafts);
      localStorage.setItem('noticeDrafts', JSON.stringify(updatedDrafts));
    }
  };
  
  // Handle create new notice
  const handleCreateNew = () => {
    navigate('/template');
  };
  
  return (
    <div className="flex">
      <LeftSidebar />
      <div className="ml-64 min-h-screen bg-[#f7fbfe] w-full">
        <div className="bg-[#004B80] text-white p-4 shadow-md">
          <h1 className="text-2xl font-bold">My Notices</h1>
        </div>
        
        <div className="p-6">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`py-2 px-4 text-sm font-medium ${
                activeTab === 'published'
                  ? 'border-b-2 border-[#004B80] text-[#004B80]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('published')}
            >
              Published Notices
            </button>
            <button
              className={`py-2 px-4 text-sm font-medium ${
                activeTab === 'drafts'
                  ? 'border-b-2 border-[#004B80] text-[#004B80]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('drafts')}
            >
              Draft Notices {draftNotices.length > 0 && `(${draftNotices.length})`}
            </button>
          </div>
          
          {/* Create New Button */}
          <div className="mb-6">
            <button
              onClick={handleCreateNew}
              className="px-4 py-2 bg-[#004B80] text-white rounded-md hover:bg-[#003b66] transition shadow-md flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create New Notice
            </button>
          </div>
          
          {/* Published Notices */}
          {activeTab === 'published' && (
            <div>
              {publishedNotices.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <div className="text-gray-400 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No published notices yet</h3>
                  <p className="text-gray-500 mb-4">Your published notices will appear here</p>
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
                    <div key={notice.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="bg-[#004B80] text-white py-2 px-4 flex justify-between items-center">
                        <div className="font-medium truncate">{notice.notice_title}</div>
                        <div className="text-xs bg-yellow-500 text-white py-1 px-2 rounded">
                          {notice.status === 'under_review' ? 'Under Review' : notice.status}
                        </div>
                      </div>
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="text-sm">
                          <span className="text-gray-500">Category:</span> {notice.category.replace('_', ' ')}
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">Published:</span> {formatDate(notice.publishDate)}
                        </div>
                      </div>
                      <div className="p-4 max-h-40 overflow-hidden">
                        <div className="transform scale-75 origin-top-left">
                          {templates[notice.templateIndex](notice)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* Draft Notices */}
          {activeTab === 'drafts' && (
            <div>
              {draftNotices.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <div className="text-gray-400 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No draft notices</h3>
                  <p className="text-gray-500 mb-4">When you start creating a notice and leave before publishing, it will be saved here</p>
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
                    <div key={draft.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="bg-[#b8d7f4] text-[#004B80] py-2 px-4 flex justify-between items-center">
                        <div className="font-medium truncate">
                          {draft.notice_title || 'Untitled Notice'}
                        </div>
                        <div className="text-xs bg-gray-200 text-gray-700 py-1 px-2 rounded">
                          Draft
                        </div>
                      </div>
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="text-sm">
                          <span className="text-gray-500">Last edited:</span> {formatDate(draft.lastEdited)}
                        </div>
                        {draft.category && (
                          <div className="text-sm">
                            <span className="text-gray-500">Category:</span> {draft.category.replace('_', ' ')}
                          </div>
                        )}
                      </div>
                      <div className="p-4 max-h-40 overflow-hidden">
                        <div className="transform scale-75 origin-top-left">
                          {templates[draft.templateIndex](draft)}
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 flex justify-between">
                        <button
                          onClick={() => handleEditDraft(draft)}
                          className="text-sm text-[#004B80] hover:text-[#003b66] font-medium flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                          Continue Editing
                        </button>
                        <button
                          onClick={() => handleDeleteDraft(draft.id)}
                          className="text-sm text-red-500 hover:text-red-700 font-medium flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
        </div>
      </div>
    </div>
  );
};

export default MyNotices;