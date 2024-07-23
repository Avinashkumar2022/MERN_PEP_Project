import React, { useEffect, useState } from 'react';
import axios from '../axios';

const AppliedOpportunities = () => {
  const [appliedOpportunities, setAppliedOpportunities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppliedOpportunities = async () => {
      try {
        const response = await axios.get('/auth/applied-opportunities', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        setAppliedOpportunities(response.data);
      } catch (err) {
        setError('Failed to fetch applied opportunities');
      }
    };

    fetchAppliedOpportunities();
  }, []);

  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
  };

  const headingStyle = {
    fontSize: '24px',
    marginBottom: '20px',
  };

  const listStyle = {
    listStyleType: 'none',
    padding: '0',
  };

  const listItemStyle = {
    borderBottom: '1px solid #ddd',
    padding: '10px 0',
  };

  const itemTitleStyle = {
    fontSize: '20px',
    margin: '0',
  };

  const itemDetailStyle = {
    margin: '5px 0',
  };

  const errorStyle = {
    color: 'red',
    fontSize: '18px',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Applied Opportunities</h1>
      {error && <p style={errorStyle}>{error}</p>}
      {appliedOpportunities.length === 0 ? (
        <p>No applied opportunities</p>
      ) : (
        <ul style={listStyle}>
          {appliedOpportunities.map((opp) => (
            <li key={opp._id} style={listItemStyle}>
              <h2 style={itemTitleStyle}>{opp.profile_name}</h2>
              <p style={itemDetailStyle}>{opp.company_name}</p>
              <p style={itemDetailStyle}><strong>Stipend:</strong> {opp.stipend}</p>
              <p style={itemDetailStyle}><strong>Duration:</strong> {opp.duration}</p>
              <p style={itemDetailStyle}><strong>Start Date:</strong> {opp.start_date}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AppliedOpportunities;
