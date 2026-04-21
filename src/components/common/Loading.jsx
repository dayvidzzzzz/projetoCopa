import React from 'react';

export const Loading = ({ text = 'Carregando...' }) => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="loading-text">{text}</p>
    </div>
  );
};