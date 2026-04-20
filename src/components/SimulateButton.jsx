import React from 'react';

export function SimulateButton({ 
  onSimulate, 
  onReset,
  isSimulating,
  simulationPhase,
  matchesPlayed,
  totalMatches
}) {
  return (
    <div className="simulate-controls">
      <div className="button-group">
        {simulationPhase === 'groups' ? (
          <button
            className="btn btn-simulate"
            onClick={onSimulate}
            disabled={isSimulating}
          >
            {isSimulating ? 'Simulando Fase de Grupos...' : 'Simular Fase de Grupos'}
          </button>
        ) : (
          <button
            className="btn btn-simulate"
            onClick={onSimulate}
            disabled={isSimulating}
          >
            {isSimulating ? 'Simulando Fase Knockout...' : 'Simular Fase Knockout'}
          </button>
        )}

        <button
          className="btn btn-reset"
          onClick={onReset}
          disabled={isSimulating}
        >
          Resetar
        </button>
      </div>

      {isSimulating && matchesPlayed > 0 && (
        <div className="progress-info">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: totalMatches > 0 ? `${(matchesPlayed / totalMatches) * 100}%` : '0%'
              }}
            />
          </div>
          <p className="progress-text">
            {simulationPhase === 'groups'
              ? `Partida ${matchesPlayed} de ${totalMatches}`
              : 'Simulando...'}
          </p>
        </div>
      )}
    </div>
  );
}
