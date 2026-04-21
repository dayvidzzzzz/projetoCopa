import React from 'react';
import { Button } from './Button';

export const ErrorMessage = ({ error, onRetry }) => {
  return (
    <div className="error-container" style={{ textAlign: 'center', padding: '4rem' }}>
      <p style={{ color: 'var(--danger)', marginBottom: '1rem' }}>
        Erro: {error}
      </p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Tentar novamente
        </Button>
      )}
    </div>
  );
};