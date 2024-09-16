// src/components/Loader.jsx
import React from 'react';
import { PacmanLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div>
      <PacmanLoader 
        color="#3b82f6" 
        size={50} 
        aria-label="Loading Spinner"
        data-testid="loader" 
    />
    </div>
  );
};

export default Loader;
