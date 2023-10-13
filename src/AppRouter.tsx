import React from 'react';
import { Routes, Route } from 'react-router-dom';

import App from './App';
import Form from './components/form/Form';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  );
};

export default AppRouter;
