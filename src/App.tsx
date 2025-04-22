import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ChapterContent from './components/ChapterContent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/chapters/introduction-to-investing" replace />} />
          <Route path="/chapters/:slug" element={<ChapterContent />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;