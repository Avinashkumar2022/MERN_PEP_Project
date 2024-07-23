import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Opportunities from './components/opportunities';
import Dashboard from './components/Dashboard';
import AddOpportunity from './components/AddOpportunity';
import AppliedOpportunities from './components/AppliedOpportunities';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-opportunity" element={<AddOpportunity />} />
        <Route path="/applied-opportunities" element={<AppliedOpportunities />} />
        
        <Route path="/" element={<Register />} /> {/* Default route */}
      </Routes>
    </Router>
  );
}

export default App;
