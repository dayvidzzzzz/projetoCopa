import React from 'react';
import { SimulateButton } from './SimulateButton';
import { ProgressBar } from './ProgressBar';

export const SimulationControls = ({ 
  onSimulate, 
  onReset,
  isSimulating,
  progress,
  progressText
}) => {
  return (
    <div className="simulation-controls">
      <SimulateButton 
        onSimulate={onSimulate}
        onReset={onReset}
        isSimulating={isSimulating}
      />
      
      {isSimulating && (
        <ProgressBar progress={progress} text={progressText} />
      )}
    </div>
  );
};