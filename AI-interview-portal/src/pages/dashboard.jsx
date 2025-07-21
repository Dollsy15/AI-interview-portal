import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import '../styling/landing.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <Navbar />
      <Hero />
    </div>
  );
};

export default LandingPage;
