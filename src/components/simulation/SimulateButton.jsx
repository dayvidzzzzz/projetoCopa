import React from 'react';
import { Button } from '../common/Button';

export const SimulateButton = ({ 
  onSimulate, 
  onReset,
  isSimulating,
  className = ''
}) => {
  return (
    <div className={`simulate-controls ${className}`}>
      <div className="button-group">
        <Button 
          variant="primary" 
          onClick={onSimulate} 
          disabled={isSimulating}
        >
          {isSimulating ? '🔄 Simulando Copa...' : '🏆 Simular Copa Completa'}
        </Button>

        <Button 
          variant="secondary" 
          onClick={onReset} 
          disabled={isSimulating}
        >
          Novo Sorteio
        </Button>
      </div>
    </div>
  );
};