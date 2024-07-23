import React, { useState, useEffect } from 'react';
import axios from '../axios'; 
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [details, setDetails] = useState({
    name: '',
    age: '',
    dob: '',
    image: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
        try {
            const response = await axios.get('/auth/dashboard', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
              });
              
            setDetails(response.data);
        } catch (error) {
            console.error("Error fetching details:", error);
            setError('Failed to fetch details');
        }
    };

    fetchDetails();
  }, []);

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/dashboard', details, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setSuccess('Details updated successfully');
    } catch (error) {
      setError('Failed to update details');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get('/auth/logout');
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error("Error logging out:", error);
      setError('Failed to logout');
    }
  };

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

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  };

  const inputStyle = {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
  };

  const successStyle = {
    color: 'green',
    fontSize: '18px',
  };

  const errorStyle = {
    color: 'red',
    fontSize: '18px',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Dashboard</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={details.name}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="text"
          name="age"
          placeholder="Age"
          value={details.age}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="date"
          name="dob"
          placeholder="Date of Birth"
          value={details.dob}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={details.image}
          onChange={handleChange}
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Update Details</button>
      </form>
      {success && <div style={successStyle}>{success}</div>}
      {error && <div style={errorStyle}>{error}</div>}
      <Link to="/applied-opportunities" style={{ textDecoration: 'none' }}>
        <button style={buttonStyle}>View Applied Opportunities</button>
      </Link>
      <button onClick={handleLogout} style={{ ...buttonStyle, backgroundColor: '#dc3545' }}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
