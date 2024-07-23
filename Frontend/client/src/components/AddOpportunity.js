import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddOpportunity = () => {
  const [profileName, setProfileName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [stipend, setStipend] = useState('');
  const [location, setLocation] = useState('');
  const [duration, setDuration] = useState('');
  const [startDate, setStartDate] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/opportunities', {
        profile_name: profileName,
        company_name: companyName,
        stipend,
        location,
        duration,
        start_date: startDate,
      });
      navigate('/opportunities');
    } catch (err) {
      setError('Failed to add opportunity');
    }
  };

  const containerStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ddd',
    borderRadius: '4px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '16px',
  };

  const errorStyle = {
    color: 'red',
    marginTop: '10px',
  };

  return (
    <div style={containerStyle}>
      <h1>Add Opportunity</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Profile Name"
          value={profileName}
          onChange={(e) => setProfileName(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Stipend"
          value={stipend}
          onChange={(e) => setStipend(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          style={inputStyle}
        />
        <input
          type="date"
          placeholder="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Add Opportunity</button>
        {error && <div style={errorStyle}>{error}</div>}
      </form>
    </div>
  );
};

export default AddOpportunity;
