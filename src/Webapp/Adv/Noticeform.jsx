import React, { useState, useEffect } from 'react';
import LeftSidebar from './LeftSidebar';
import templates from './templates';
import { useLocation, useNavigate } from 'react-router-dom';
const NoticeForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const draft = location.state?.draft || null;
  const initialFormData = draft || {
    category: '',
    lawyer_name: '',
    notice_description: '',
    notice_title: '',
    date: '',
    location: '',
    username: '',
    type: '',
    phone: ''
  };

  // State for form fields
  const [formData, setFormData] = useState(initialFormData);

  // State for selected template
  const [selectedTemplate, setSelectedTemplate] = useState(draft?.templateIndex || 0);

  // State for preview mode
  const [showPreview, setShowPreview] = useState(false);
  
// Auto-save form data to localStorage every 5 seconds
useEffect(() => {
  // Create a session draft ID when component mounts
  // This will be the same throughout this editing session
  const sessionDraftId = draft?.id || `draft-${Date.now()}`;
  
  const intervalId = setInterval(() => {
    // Check if form has meaningful data
    const hasData = Object.entries(formData).some(([key, value]) => {
      if (typeof value === 'string') {
        return value.trim() !== '';
      } else {
        return value !== null && value !== undefined;
      }
    });
    
    if (hasData) {
      // Only save if at least one field has data
      const draftNotice = {
        ...formData,
        templateIndex: selectedTemplate,
        lastEdited: new Date().toISOString(),
        id: sessionDraftId
      };
      
      // Get existing drafts
      const existingDrafts = JSON.parse(localStorage.getItem('noticeDrafts') || '[]');
      
      // Check if we're editing an existing draft with our session ID
      const draftIndex = existingDrafts.findIndex(d => d.id === sessionDraftId);
      
      if (draftIndex !== -1) {
        // Update existing draft
        existingDrafts[draftIndex] = draftNotice;
      } else {
        // Add new draft
        existingDrafts.push(draftNotice);
      }
      
      localStorage.setItem('noticeDrafts', JSON.stringify(existingDrafts));
    }
  }, 2000);

  // Clear interval on component unmount
  return () => clearInterval(intervalId);
}, [formData, selectedTemplate, draft]); // Don't include sessionDraftId in dependencies

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle template selection
  const handleTemplateSelect = (index) => {
    setSelectedTemplate(index);
  };

  // Handle preview
  const handlePreview = () => {
    setShowPreview(true);
  };

  // Handle publish
  const handlePublish = () => {
    // Get existing published notices
    const publishedNotices = JSON.parse(localStorage.getItem('publishedNotices') || '[]');
    
    // Create new notice object
    const newNotice = {
      ...formData,
      templateIndex: selectedTemplate,
      id: `notice-${Date.now()}`,
      publishDate: new Date().toISOString(),
      status: 'under_review'
    };
    
    // Add to published notices
    localStorage.setItem('publishedNotices', JSON.stringify([...publishedNotices, newNotice]));
    
    // If this was a draft, remove it from drafts
    if (draft && draft.id) {
      const existingDrafts = JSON.parse(localStorage.getItem('noticeDrafts') || '[]');
      const updatedDrafts = existingDrafts.filter(d => d.id !== draft.id);
      localStorage.setItem('noticeDrafts', JSON.stringify(updatedDrafts));
    }
    
    alert("Your Notice is currently undergoing review. We appreciate your patience while this process is completed.");
    
    // Reset form and go back to edit mode
    setShowPreview(false);
    setFormData({
      category: '',
      lawyer_name: '',
      notice_description: '',
      notice_title: '',
      date: '',
      location: '',
      username: '',
      type: '',
      phone: ''
    });
    
    // Redirect to my notices page
    window.location.href = '/mynotices';
  };

  // Handle back from preview
  const handleBack = () => {
    setShowPreview(false);
  };

// Check if form is complete
const isFormComplete = () => {
  return Object.entries(formData).every(([key, value]) => {
    // Skip username field as it's for reference only
    
    
    // Handle different data types properly
    if (typeof value === 'string') {
      return value.trim() !== '';
    } else {
      return value !== null && value !== undefined;
    }
  });
};

  // Full preview template with selected style
  const FullPreview = () => {
    return (
      <div className="ml-64 flex flex-col bg-[#f7fbfe] h-screen">
        <div className="bg-[#004B80] text-white p-4 shadow-md">
          <h1 className="text-2xl font-bold">Notice Preview</h1>
        </div>

        <div className="flex-grow p-8 overflow-auto">
          <div className="w-full max-w-xl bg-white shadow-xl p-8 rounded-lg border-t-4 border-[#004B80] mx-auto mb-8">
            <div className="w-full">
              {templates[selectedTemplate](formData)}
            </div>
          </div>
        </div>

        <div className="bg-white p-4 shadow-md flex justify-between border-t border-[#b8d7f4] sticky bottom-0">
          <button
            onClick={handleBack}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition border border-gray-300"
          >
            Back to Edit
          </button>
          <button
            onClick={handlePublish}
            className="px-6 py-2 bg-[#004B80] text-white rounded hover:bg-[#003b66] transition shadow-md"
          >
            Publish Notice
          </button>
        </div>
      </div>
    );
  };

  // Render preview if showPreview is true
  if (showPreview) {
    return (
      <>
        <LeftSidebar />
        <FullPreview />
      </>
    );
  }

  return (
    <div className="flex">
      <LeftSidebar />
      <div className="ml-64 min-h-screen bg-[#b8d7f4] bg-opacity-10 w-full">
        <div className="bg-[#004B80] text-white p-4 shadow-md">
          <h1 className="text-2xl font-bold">
            {draft ? 'Continue Editing Notice' : 'Create A Notice'}
          </h1>
        </div>

        <div className="p-6">
          {/* Form at the top */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-t-4 border-[#004B80]">
            <h2 className="text-xl font-semibold text-[#004B80] mb-4">Notice Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="col-span-4">
                <label className="block text-gray-700 mb-1">Notice Title</label>
                <input
                  type="text"
                  name="notice_title"
                  value={formData.notice_title}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#b8d7f4]"
                  placeholder="Enter notice title"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#b8d7f4]"
                >
                  <option value="">Select Category</option>
                  <option value="legal_notice">Legal Notice</option>
                  <option value="planning_applications">Planning Applications</option>
                  <option value="government_notice">Government Notice</option>
                  <option value="financial_notice">Financial Notice</option>
                  <option value="environmental_notice">Environmental Notice</option>
                  <option value="corporate_disclosure">Corporate Disclosure</option>
                  <option value="municipal_announcement">Municipal Announcement</option>
                  <option value="public_safety_alerts">Public Safety Alerts</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Account Type</label>
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#b8d7f4]"
                  placeholder="Enter account type"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Lawyer Name</label>
                <input
                  type="text"
                  name="lawyer_name"
                  value={formData.lawyer_name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#b8d7f4]"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#b8d7f4]"
                  placeholder="Enter username"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#b8d7f4]"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#b8d7f4]"
                  placeholder="Enter location"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1">Phone No.</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#b8d7f4]"
                  placeholder="Enter Phone No."
                />
              </div>

              <div className="col-span-4">
                <label className="block text-gray-700 mb-1">Notice Description</label>
                <textarea
                type="text"
                  name="notice_description"
                  value={formData.notice_description}
                  onChange={handleChange}
                  rows="6"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#b8d7f4]"
                  placeholder="Enter notice description"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Templates side by side */}
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-[#b8d7f4]">
            <h2 className="text-xl font-semibold text-[#004B80] mb-4">Select Template</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {templates.map((template, index) => (
                <div
                  key={index}
                  className={`cursor-pointer transition-all transform hover:scale-105 bg-white rounded-lg overflow-hidden shadow-md ${selectedTemplate === index ? 'ring-2 ring-[#004B80] shadow-lg' : 'hover:shadow-lg border border-[#b8d7f4]'
                    }`}
                  onClick={() => handleTemplateSelect(index)}
                >
                  <div className="text-sm text-white bg-[#004B80] py-1 px-3">
                    Template {index + 1}
                  </div>
                  <div className="transform scale-75 origin-top overflow-hidden min-h-64 p-2">
                    {template(formData)}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={handlePreview}
                disabled={!isFormComplete()}
                className={`px-8 py-3 rounded-md ${isFormComplete()
                    ? 'bg-[#004B80] text-white hover:bg-[#003b66] shadow-md'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  } transition`}
              >
                Preview Notice
              </button>
              {!isFormComplete() && (
                <p className="text-sm text-red-500 mt-2">Fill all required fields to proceed</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeForm;