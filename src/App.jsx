
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout'; 
import HomePage from './pages/HomePage';
import AllAppsPage from './pages/AllAppsPage';
import AppDetailsPage from './pages/AppDetailsPage';
import MyInstallationPage from './pages/MyInstallationPage';
import Error404Page from './pages/Error404Page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Main Routes */}
          <Route index element={<HomePage />} />
          <Route path="apps" element={<AllAppsPage />} />
          <Route path="app/:id" element={<AppDetailsPage />} />
          <Route path="installation" element={<MyInstallationPage />} />
        </Route>
        
        <Route path="*" element={<Error404Page />} /> 

      </Routes>
    </BrowserRouter>
  );
}

export default App;