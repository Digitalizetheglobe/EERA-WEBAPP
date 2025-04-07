import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Land Notice Template
      landNotice: "PUBLIC NOTICE",
      noticeIntro: "This is to inform the general public that {{ownerName}} is the owner and in possession of the land bearing Survey No. {{surveyNumber}}, Hissa No. {{hissaNumber}}.",
      propertyDetails: "The said land measures {{landArea}} and is held under {{ownershipType}} ownership. The mutation entry number for this property is {{mutationEntryNumber}}.",
      boundariesDescription: "The property is bounded as follows: To the North by {{north}}, to the South by {{south}}, to the East by {{east}}, and to the West by {{west}}.",
      cultivationDetails: "The land is currently being cultivated by {{cultivatorName}}. The cultivation includes {{cropDetails}} and utilizes {{irrigationType}} irrigation system.",
      taxInformation: "The property's tax and revenue details are as follows: {{taxDetails}}",
      noticeDisclaimer: "Any person having any claim, right, title, or interest in the above-mentioned property by way of sale, gift, lease, inheritance, mortgage, charge, lien, or possession etc. should inform the undersigned in writing with documentary evidence within 14 days from the date of publication of this notice, failing which any such claim shall be considered as waived and/or abandoned.",
      propertySchedule: "SCHEDULE OF THE PROPERTY",
      
      // Form Labels
      noticeTitle: "Notice Title",
      surveyNumber: "Survey Number / Gut Number",
      hissaNumber: "Hissa Number",
      ownerName: "Owner's Name",
      ownershipType: "Type of Ownership",
      occupantClass: "Occupant Class",
      mutationEntryNumber: "Mutation Entry Number",
      landArea: "Land Area",
      cultivatorName: "Cultivator's Name",
      cropDetails: "Crop Details",
      irrigationType: "Irrigation Type",
      taxDetails: "Tax & Revenue Details",
      boundaries: "Boundaries (Chatur Seema)",
      landDescription: "Land Description",
      north: "North",
      south: "South",
      east: "East",
      west: "West",
      
      // Select Options
      selectOwnershipType: "Select Type of Ownership",
      individual: "Individual",
      joint: "Joint",
      government: "Government",
      trust: "Trust",
      
      selectOccupantClass: "Select Occupant Class",
      owner: "Owner",
      tenant: "Tenant",
      lease: "Lease",
      
      selectIrrigationType: "Select Irrigation Type",
      well: "Well",
      canal: "Canal",
      rainfed: "Rainfed",
      other: "Other",
      
      // Buttons and Labels
      saveNotice: "Save Notice",
      noticePreview: "Notice Preview",
      date: "Date",
      place: "Place",
      advocate: "Advocate",
      advocateDetails: "Registration No. XXXX"
    }
  },
  mr: {
    translation: {
      // Land Notice Template
      landNotice: "जाहीर नोटीस",
      noticeIntro: "सर्व लोकांस कळविण्यात येते की, {{ownerName}} यांच्या मालकीची व ताब्यातील सर्वे नं. {{surveyNumber}}, हिस्सा नं. {{hissaNumber}} असलेली जमीन.",
      propertyDetails: "सदर जमिनीचे क्षेत्रफळ {{landArea}} असून ती {{ownershipType}} मालकी स्वरूपाची आहे. या मालमत्तेचा म्युटेशन एंट्री क्रमांक {{mutationEntryNumber}} आहे.",
      boundariesDescription: "या जमिनीच्या चतुःसीमा खालीलप्रमाणे: उत्तरेस {{north}}, दक्षिणेस {{south}}, पूर्वेस {{east}}, पश्चिमेस {{west}}.",
      cultivationDetails: "सध्या ही जमीन {{cultivatorName}} यांच्याकडून कसली जात आहे. त्यामध्ये {{cropDetails}} पीके घेतली जातात आणि {{irrigationType}} सिंचन पद्धतीचा वापर केला जातो.",
      taxInformation: "मालमत्तेचे कर व महसूल तपशील खालीलप्रमाणे आहेत: {{taxDetails}}",
      noticeDisclaimer: "वरील मालमत्तेबाबत कोणत्याही व्यक्तीस विक्री, बक्षीस, भाडेपट्टा, वारसा, गहाण, बोजा, ताबा इत्यादी स्वरूपात कोणताही हक्क, अधिकार किंवा हितसंबंध असल्यास त्यांनी ही नोटीस प्रसिद्ध झाल्यापासून १४ दिवसांच्या आत कागदोपत्री पुराव्यासह लेखी स्वरूपात खालील सहीकर्त्यास कळवावे, अन्यथा तसा कोणताही हक्क नाही असे समजण्यात येईल.",
      propertySchedule: "मालमत्तेचे वर्णन",
      
      // Form Labels
      noticeTitle: "नोटीस शीर्षक",
      surveyNumber: "सर्वे नंबर / गट नंबर",
      hissaNumber: "हिस्सा नंबर",
      ownerName: "मालकाचे नाव",
      ownershipType: "मालकी प्रकार",
      occupantClass: "वहिवाटदार वर्ग",
      mutationEntryNumber: "फेरफार नोंद क्रमांक",
      landArea: "जमिनीचे क्षेत्रफळ",
      cultivatorName: "कसणाऱ्याचे नाव",
      cropDetails: "पीक तपशील",
      irrigationType: "सिंचन प्रकार",
      taxDetails: "कर व महसूल तपशील",
      boundaries: "चतुःसीमा",
      landDescription: "जमिनीचे वर्णन",
      north: "उत्तर",
      south: "दक्षिण",
      east: "पूर्व",
      west: "पश्चिम",
      
      // Select Options
      selectOwnershipType: "मालकी प्रकार निवडा",
      individual: "वैयक्तिक",
      joint: "संयुक्त",
      government: "सरकारी",
      trust: "ट्रस्ट",
      
      selectOccupantClass: "वहिवाटदार वर्ग निवडा",
      owner: "मालक",
      tenant: "भाडेकरू",
      lease: "लीज",
      
      selectIrrigationType: "सिंचन प्रकार निवडा",
      well: "विहीर",
      canal: "कालवा",
      rainfed: "पावसावर आधारित",
      other: "इतर",
      
      // Buttons and Labels
      saveNotice: "नोटीस जतन करा",
      noticePreview: "नोटीस पूर्वावलोकन",
      date: "दिनांक",
      place: "ठिकाण",
      advocate: "अॅडव्होकेट",
      advocateDetails: "नोंदणी क्र. XXXX"
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