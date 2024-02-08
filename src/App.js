import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './AdminDash';
import GeneralCSReqData from './pages/GeneralCSReqData';
import GraphicsReqData from './pages/GraphicsReqData';
import PhotoReqData from './pages/PhotoReqData';
import VideoReqData from './pages/VideoReqData';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminDashboard />}>
          <Route index element={<GeneralCSReqData />} />
          <Route path="graphics" element={<GraphicsReqData />} />
          <Route path="photo" element={<PhotoReqData />} />
          <Route path="video" element={<VideoReqData />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
