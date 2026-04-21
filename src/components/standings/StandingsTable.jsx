import React from 'react';
import { StandingsRow } from './StandingsRow';

export const StandingsTable = ({ standings, groupName = '' }) => {
  if (!standings || Object.keys(standings).length === 0) {
    return (
      <div className="standings-table">
        <p>Nenhuma classificação disponível</p>
      </div>
    );
  }

  const sortedTeams = Object.values(standings).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
    return Math.random() - 0.5;
  });

  return (
    <div className="standings-table">
      {groupName && <h4>Grupo {groupName}</h4>}
      
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th className="position">Pos</th>
              <th className="team-name">Time</th>
              <th className="stat">J</th>
              <th className="stat">V</th>
              <th className="stat">E</th>
              <th className="stat">D</th>
              <th className="stat">GP</th>
              <th className="stat">GC</th>
              <th className="stat">SG</th>
              <th className="stat">Pts</th>
            </tr>
          </thead>
          <tbody>
            {sortedTeams.map((team, index) => (
              <StandingsRow 
                key={team.name} 
                team={team} 
                position={index + 1}
                isQualified={index < 2}
              />
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="legend">
        <span className="qualified-badge">Qualificados</span>
      </div>
    </div>
  );
};