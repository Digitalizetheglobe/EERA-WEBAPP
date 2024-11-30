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
      </Routes>
    </Router>

  );
}

export default App;
