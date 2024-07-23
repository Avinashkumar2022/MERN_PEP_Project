import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { Link, useNavigate } from 'react-router-dom';

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applied, setApplied] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await axios.get('/auth/opportunities');
        console.log(response.data);
        setOpportunities(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch opportunities');
        setLoading(false);
      }
    };
  
    fetchOpportunities();
  }, []);

  const handleApply = async (id) => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }

    try {
      await axios.post(`/auth/apply`, { id }, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setApplied(prev => ({ ...prev, [id]: true }));
    } catch (error) {
      setError('Failed to apply for this opportunity');
    }
  };

  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  };

  const headingStyle = {
    fontSize: '24px',
    marginBottom: '20px',
    textAlign: 'center',
  };

  const listStyle = {
    listStyleType: 'none',
    padding: '0',
  };

  const listItemStyle = {
    padding: '15px',
    borderBottom: '1px solid #ddd',
    marginBottom: '10px',
  };

  const buttonStyle = (isApplied) => ({
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: isApplied ? '#ccc' : '#007bff',
    color: '#fff',
    fontSize: '16px',
    cursor: isApplied ? 'not-allowed' : 'pointer',
    marginTop: '10px',
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Opportunities</h1>
      {localStorage.getItem('token') && <Link to="/add-opportunity" className="navLink">Add Opportunity</Link>}
      {loading ? <p>Loading...</p> : (
        error ? <p>{error}</p> : (
          <ul style={listStyle}>
            {Array.isArray(opportunities) && opportunities.map((opp) => (
              <li key={opp._id} style={listItemStyle}>
                <h2>{opp.profile_name}</h2>
                <p>{opp.company_name}</p>
                <p><strong>Stipend:</strong> {opp.stipend}</p>
                <p><strong>Location:</strong> {opp.location}</p>
                <p><strong>Duration:</strong> {opp.duration}</p>
                <p><strong>Start Date:</strong> {opp.start_date}</p>
                <button
                  onClick={() => handleApply(opp._id)}
                  style={buttonStyle(applied[opp._id])}
                  disabled={applied[opp._id]}
                >
                  {applied[opp._id] ? 'Applied' : 'Apply'}
                </button>
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
};  

export default Opportunities;
