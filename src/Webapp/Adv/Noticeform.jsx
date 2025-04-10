import React, { useState, useEffect, useRef } from 'react';
import LeftSidebar from './LeftSidebar';
import templates from './templates';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import html2canvas from 'html2canvas';
import { useTranslation } from 'react-i18next';

// Success Modal Component
const SuccessModal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Success!</h3>
          <p className="text-gray-600 mb-4">{message}</p>
          <button
            onClick={onClose}
            className="bg-[#004B80] text-white px-6 py-2 rounded-md hover:bg-[#003b66] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const NoticeForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const draft = location.state?.draft || null;
  const [userProfile, setUserProfile] = useState(null);
  const [userId, setUserId] = useState(null);
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Fetch user profile and ID on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          toast.error('Please login to continue');
          return;
        }

        // Get user ID from token
        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        const userId = tokenPayload.userId;
        setUserId(userId);

        // Fetch user profile
        const response = await fetch('https://api.epublicnotices.in/api/webuser/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const data = await response.json();
        setUserProfile(data.user);
        
        // Update form data with user profile data and ID
        setFormData(prevData => ({
          ...prevData,  
          userId: userId,
          lawyer_name: data.user.name || "",
          location: data.user.location || "",
          phone: data.user.phone || "",
          userType: data.user.userType || ""
        }));
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to fetch user data');
      }
    };

    fetchUserData();
  }, []);

  const initialFormData = draft || {
    userId: "",
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
    landDescription: "",
    userType: "",
    location: "",
    phone: "",
    lawyer_name: "",
    date: new Date().toISOString().split('T')[0]
  };

  // State for form fields
  const [formData, setFormData] = useState(initialFormData);

  // Add useEffect to log formData changes
  useEffect(() => {
    console.log('Form data updated:', formData);
  }, [formData]);

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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      if (!token) {
        toast.error('Please login to continue');
        return;
      }

      // First, capture the template as an image
      const templateElement = document.querySelector(`[data-template="${selectedTemplate}"]`);
      if (!templateElement) {
        throw new Error('Template element not found');
      }

      // Generate image from template
      const canvas = await html2canvas(templateElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });

      // Convert canvas to blob
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.95));

      // Create FormData for the API request
      const formDataToSubmit = new FormData();
      
      // Add the image
      formDataToSubmit.append('notice_image', blob, 'notice.jpg');
      
      // Add all the form fields
      formDataToSubmit.append('notice_title', formData.notice_title);
      formDataToSubmit.append('category', formData.category);
      formDataToSubmit.append('accountType', formData.userType);
      formDataToSubmit.append('lawyerName', formData.lawyer_name);
      formDataToSubmit.append('date', formData.date);
      formDataToSubmit.append('location', formData.location);
      formDataToSubmit.append('phoneNo', formData.phone);
      formDataToSubmit.append('noticeDescription', formData.landDescription);
      formDataToSubmit.append('userId', userId);

      // Make API call to create notice
      const response = await fetch('https://api.epublicnotices.in/api/notices/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSubmit
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to create notice');
      }

      setSuccessMessage('Your notice has been successfully submitted! It will be live in the next 4 hours.');
      setShowSuccessModal(true);
      
      // If this was a draft, remove it from drafts
      if (draft && draft.id) {
        const existingDrafts = JSON.parse(localStorage.getItem('noticeDrafts') || '[]');
        const updatedDrafts = existingDrafts.filter(d => d.id !== draft.id);
        localStorage.setItem('noticeDrafts', JSON.stringify(updatedDrafts));
      }
      
      // Reset form
      setFormData(initialFormData);

    } catch (error) {
      console.error('Error submitting notice:', error);
      setSuccessMessage(error.message || 'Failed to submit notice');
      setShowSuccessModal(true);
    } finally {
      setLoading(false);
    }
  };

  // Check if form is complete
  const isFormComplete = () => {
    // List of required fields
    const requiredFields = [
      'notice_title',
      'category',
      'landDescription',
      'date'
    ];

    // Check if all required fields have values
    return requiredFields.every(field => {
      const value = formData[field];
      if (typeof value === 'string') {
        return value.trim() !== '';
      }
      return value !== null && value !== undefined;
    });
  };

  // Full preview template with selected style
  const FullPreview = () => {
    return (
      <div className="min-h-screen bg-[#f7fbfe] w-full transition-all duration-300 lg:ml-64">
        <div className="bg-[#004B80] text-white p-4 shadow-md">
          <h1 className="text-2xl font-bold">Notice Preview</h1>
        </div>

        <div className="flex-grow p-8 overflow-auto">
          <div className="w-full max-w-xl bg-white shadow-xl p-8 rounded-lg border-t-4 border-[#004B80] mx-auto mb-8">
            <div className="w-full" ref={templateRef}>
              {templates[selectedTemplate](formData)}
            </div>
          </div>
        </div>

        <div className="bg-white p-4 shadow-md flex justify-between border-t border-[#b8d7f4] sticky bottom-0">
          <button
            onClick={() => setShowPreview(false)}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition border border-gray-300"
          >
            Back to Edit
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-[#004B80] text-white rounded hover:bg-[#003b66] transition shadow-md"
          >
            Publish Notice
          </button>
        </div>
      </div>
    );
  };

  // Add ref for the template preview
  const templateRef = useRef(null);

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
      <div className="min-h-screen bg-[#f7fbfe] w-full transition-all duration-300 lg:ml-64">
        <div className="bg-[#004B80] text-white p-4 shadow-md">
          <h1 className="text-2xl font-bold">
            {draft ? 'Continue Editing Notice' : 'Create A Notice'}
          </h1>
        </div>

        <div className="p-6">
          {/* Form at the top */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-t-4 border-[#004B80]">
            <h2 className="text-2xl font-bold text-[#004B80] mb-8">Create A Notice</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* User ID Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  User ID
                </label>
                <input
                  type="text"
                  name="userId"
                  value={userId || ""}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>

              {/* Notice Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#004B80] mb-4">Notice Details</h3>
                <div className="space-y-4">
                 
                  {/* Notice Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notice Title
                    </label>
                    <input
                      type="text"
                      name="notice_title"
                      value={formData.notice_title}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B80] focus:border-transparent"
                      placeholder="Enter notice title"
                      required
                    />
                  </div>

                  {/* Category and Account Type */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B80] focus:border-transparent"
                        required
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Account Type
                      </label>
                      <input
                        type="text"
                        name="userType"
                        value={formData.userType}
                        readOnly
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      />
                    </div>
                  </div>

                  {/* Lawyer Name and Username */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Lawyer Name
                      </label>
                      <input
                        type="text"
                        name="lawyer_name"
                        value={formData.lawyer_name}
                        readOnly
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Username
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={formData.lawyer_name}
                        readOnly
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      />
                    </div>
                  </div>

                  {/* Date and Location */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B80] focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        readOnly
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      />
                    </div>
                  </div>

                  {/* Phone No. */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone No.
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      readOnly
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>

                  {/* Notice Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notice Description
                    </label>
                    <textarea
                      name="landDescription"
                      value={formData.landDescription}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B80] focus:border-transparent"
                      rows="4"
                      required
                      placeholder="Enter notice description"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <button
                  type="submit"
                  disabled={!isFormComplete() || loading}
                  className={`px-8 py-3 rounded-md ${
                    isFormComplete() && !loading
                      ? 'bg-[#004B80] text-white hover:bg-[#003b66] shadow-md'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  } transition`}
                >
                  {loading ? 'Submitting...' : 'Submit Notice'}
                </button>
                {!isFormComplete() && (
                  <p className="text-sm text-red-500 mt-2">Fill all required fields to proceed</p>
                )}
              </div>
            </form>
          </div>

          {/* Templates side by side */}
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-[#b8d7f4]">
            <h2 className="text-xl font-semibold text-[#004B80] mb-4">Select Template</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {templates.slice(0, 3).map((template, index) => (
                <div
                  key={index}
                  className={`cursor-pointer transition-all transform hover:scale-105 bg-white rounded-lg overflow-hidden shadow-md ${
                    selectedTemplate === index ? 'ring-2 ring-[#004B80] shadow-lg' : 'hover:shadow-lg border border-[#b8d7f4]'
                  }`}
                  onClick={() => handleTemplateSelect(index)}
                >
                  <div className="text-sm text-white bg-[#004B80] py-1 px-3">
                    Template {index + 1}
                  </div>
                  <div 
                    className="transform scale-75 origin-top overflow-hidden min-h-64 p-2"
                    data-template={index}
                  >
                    {template(formData)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Success Modal */}
        <SuccessModal
          isOpen={showSuccessModal}
          onClose={() => {
            setShowSuccessModal(false);
            if (successMessage.includes('successfully')) {
              window.location.href = '/mynotices';
            }
          }}
          message={successMessage}
        />
      </div>
    </div>
  );
};

export default NoticeForm;