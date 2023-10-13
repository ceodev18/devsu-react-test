import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/utils/Navbar'; // Asegúrate de importar tu Navbar
import SimpleTable from './components/table/SimpleTable';
import Form from './components/form/Form';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<SimpleTable/>} />
        <Route path="/form/create" element={<Form mode='create'  />} />
        <Route path="/form/edit/:id" element={<Form mode='edit' />} />
      </Routes>
    </Router>
  );
}

export default App;
