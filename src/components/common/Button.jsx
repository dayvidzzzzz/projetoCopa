import React from 'react';

export const Button = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  disabled = false,
  className = '',
  type = 'button'
}) => {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  
  return (
    <button
      type={type}
      className={`${baseClass} ${variantClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};