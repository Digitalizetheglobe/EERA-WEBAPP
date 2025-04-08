import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import Login from './Login/Login';
import Register from './Register/Register';
import Noticeform from './Adv/Noticeform';
import Mynotices from './Adv/Mynotices';
import LandNoticeDetail from './Adv/LandNoticeDetail';
import LandNoticesPage from '../LandingPage/landnotices/landnoticespage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/noticeform" element={<Noticeform />} />
        <Route path="/mynotices" element={<Mynotices />} />
        <Route path="/land-notice/:id" element={<LandNoticeDetail />} />
        <Route path="/land-notices" element={<LandNoticesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
