import React from 'react';

export const ProgressBar = ({ progress, text }) => {
  return (
    <div className="progress-info">
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        />
      </div>
      {text && <p className="progress-text">{text}</p>}
    </div>
  );
};