import React from 'react';
import './Loader.css'; // Add necessary styles for the loader

const Loader = () => {
  return (
    <div className="loader">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loader;
