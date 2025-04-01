import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Form Labels
      noticeTitle: "Notice Title",
      surveyNumber: "Survey Number / Gut Number",
      hissaNumber: "Hissa Number (Sub-Division Number)",
      ownerName: "Owner's Name",
      ownershipType: "Type of Ownership",
      occupantClass: "Occupant Class",
      mutationEntryNumber: "Mutation Entry Number (Ferfar Number)",
      landArea: "Land Area",
      cultivatorName: "Cultivator's Name",
      cropDetails: "Crop Details",
      irrigationType: "Irrigation Type",
      taxDetails: "Tax & Revenue Details",
      boundaries: "Chatur Seema (Boundaries)",
      landDescription: "Land Description",
      
      // Select Options
      selectOwnershipType: "Select Ownership Type",
      selectOccupantClass: "Select Occupant Class",
      selectIrrigationType: "Select Irrigation Type",
      
      // Ownership Types
      individual: "Individual",
      joint: "Joint",
      government: "Government",
      trust: "Trust",
      
      // Occupant Classes
      owner: "Owner",
      tenant: "Tenant",
      lease: "Lease",
      
      // Irrigation Types
      well: "Well",
      canal: "Canal",
      rainfed: "Rainfed",
      other: "Other",
      
      // Directions
      north: "North",
      south: "South",
      east: "East",
      west: "West",
      
      // Buttons
      saveNotice: "Save Notice",
      noticePreview: "Notice Preview",
      landNoticeForm: "Land Notice Form",
      
      // Template Text
      landNotice: "LAND NOTICE",
      cropAndIrrigationDetails: "Crop and Irrigation Details",
      taxAndRevenueDetails: "Tax & Revenue Details",
      date: "Date",
      place: "Place",
      advocate: "Advocate"
    }
  },
  mr: {
    translation: {
      // Form Labels
      noticeTitle: "नोटीस शीर्षक",
      surveyNumber: "सर्वे क्रमांक / गुट क्रमांक",
      hissaNumber: "हिस्सा क्रमांक (उप-विभाग क्रमांक)",
      ownerName: "मालकाचे नाव",
      ownershipType: "मालकीचा प्रकार",
      occupantClass: "व्यापारी वर्ग",
      mutationEntryNumber: "म्युटेशन एंट्री क्रमांक (फरफर क्रमांक)",
      landArea: "जमीन क्षेत्र",
      cultivatorName: "शेतकरीचे नाव",
      cropDetails: "पिक तपशील",
      irrigationType: "सिंचन प्रकार",
      taxDetails: "कर आणि महसूल तपशील",
      boundaries: "चतुःसीमा",
      landDescription: "जमीन वर्णन",
      
      // Select Options
      selectOwnershipType: "मालकीचा प्रकार निवडा",
      selectOccupantClass: "व्यापारी वर्ग निवडा",
      selectIrrigationType: "सिंचन प्रकार निवडा",
      
      // Ownership Types
      individual: "वैयक्तिक",
      joint: "संयुक्त",
      government: "सरकार",
      trust: "ट्रस्ट",
      
      // Occupant Classes
      owner: "मालक",
      tenant: "भाडेकरू",
      lease: "लीज",
      
      // Irrigation Types
      well: "विहीर",
      canal: "कालवा",
      rainfed: "पावसाळी",
      other: "इतर",
      
      // Directions
      north: "उत्तर",
      south: "दक्षिण",
      east: "पूर्व",
      west: "पश्चिम",
      
      // Buttons
      saveNotice: "नोटीस जतन करा",
      noticePreview: "नोटीस पूर्वावलोकन",
      landNoticeForm: "जमीन नोटीस फॉर्म",
      
      // Template Text
      landNotice: "जमीन नोटीस",
      cropAndIrrigationDetails: "पिक आणि सिंचन तपशील",
      taxAndRevenueDetails: "कर आणि महसूल तपशील",
      date: "दिनांक",
      place: "स्थळ",
      advocate: "वकील"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 