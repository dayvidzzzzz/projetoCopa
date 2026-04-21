import React from 'react';

export const ChampionDisplay = ({ champion }) => {
  return (
    <div className="champion">
      <div className="champion-trophy">🏆</div>
      <h2>Campeão: {champion}</h2>
      <p className="champion-subtitle">Campeão da Copa do Mundo!</p>
    </div>
  );
};