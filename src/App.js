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
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Banner />} />
        <Route path='/header' element={<Header />} />
        <Route path='/webheader' element={<Webheader />} />
        <Route path='/homwebheader' element={<Homeheader />} />
        <Route path='/home' element={<Home />} />
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
        {/* <Route path='/all-notices' element={<AllNotices/>} /> */}
        <Route path='/privacy-policy' element={<PrivacyPolicy/>} />
      </Routes>
    </Router>

  );
}


export default App;
