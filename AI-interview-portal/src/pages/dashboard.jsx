// pages/Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styling/dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleStartInterview = () => {
    navigate('/interview');
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome to AI Interview Portal 👋</h1>
      <p>Prepare for interviews with instant AI feedback.</p>
      <button className="start-btn" onClick={handleStartInterview}>
        Start Interview
      </button>
    </div>
  );
};

export default Dashboard;
