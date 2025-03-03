import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Header/Header'
import Banner from './Banner/Banner';
import Webheader from './Webapp/Notices/Webheader';
import Homeheader from './Webapp/Notices/Homewebheader';
import Home from './Webapp/Notices/Home';
import About from './Webapp/About';
import LoginModal from './Webapp/LoginModal.js';
import OtpDialog from './Webapp/OtpDialog.js';
import LoginSuccess from './Webapp/LoginSuccess.js';
import Notice from './Webapp/Notices/Notics.js';
import WebappPricing from './Webapp/Pricing/Pricing.js';
import SearchNotices from './Webapp/SearchNotices.js';
import PostNotices from './PostNotices/PostNotices.js';
import Login from './Webapp/LoginandRegistration/Login.js';
import Register from './Webapp/LoginandRegistration/Register.js';
import AllNotices from './AllNotices/Page.jsx';
import PrivacyPolicy from './PrivacyPolicy/page.jsx';
import ContactPage from './Contact/page.jsx';
import Home2 from './Webapp/Home/Home.jsx';
import Adv from './Webapp/Adv/Adv.jsx';
import HelpDeskContactPage from './Contact/page2.jsx';
import LocationNotices from './LandingPage/locationscourosel/locationpage.jsx';
import CategoryNotices from './LandingPage/categorycourosel/categorypage.jsx';
import Profile from './Webapp/Adv/Profile.jsx';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Banner />} />
        <Route path='/header' element={<Header />} />
        <Route path='/webheader' element={<Webheader />} />
        <Route path='/homwebheader' element={<Homeheader />} />
        {/* <Route path='/home' element={<Home />} /> */}
        <Route path='/about' element={<About />} />
        <Route path='/login-modal' element={<LoginModal />} />
        <Route path='/OtpDialog' element={<OtpDialog />} />
        <Route path='/LoginSuccess' element={<LoginSuccess />} />
        <Route path="/notices/:id" element={<Notice />} />
        <Route path='/WebappPricing' element={<WebappPricing />} />
        <Route path='/search-notices' element={<SearchNotices/>} />
        <Route path='/post-notices' element={<PostNotices/>}/>
        <Route path='/Login' element={<Login/>} />
        <Route path='/Register' element={<Register/>} />
        <Route path='/all-notices' element={<AllNotices/>} />
        <Route path='/privacy-policy' element={<PrivacyPolicy/>} />
        {/* <Route path='/contact' element={<ContactPage/>} /> */}
        <Route path='/Home' element={<Home2/>} />
        <Route path='/Dashboard' element={<Adv/>} />
        <Route path='/contact' element={<HelpDeskContactPage/>} />
        <Route path="/locations/:location" element={<LocationNotices />} />
        <Route path="/categories/:category" element={<CategoryNotices/>} /> 
        <Route path='/Dashboard/profile' element={<Profile/>} />

      </Routes>
    </Router>

  );
}


export default App;
