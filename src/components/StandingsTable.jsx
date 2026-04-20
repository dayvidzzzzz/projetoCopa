import React from 'react';

export function StandingsTable({ standings, groupName = '' }) {
  if (!standings || Object.keys(standings).length === 0) {
    return (
      <div className="standings-table">
        <p>Nenhuma classificação disponível</p>
      </div>
    );
  }

  // Ordena os times por pontos
  const sortedTeams = Object.values(standings).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference) {
      return b.goalDifference - a.goalDifference;
    }
    return b.goalsFor - a.goalsFor;
  });

  return (
    <div className="standings-table">
      {groupName && <h4>Grupo {groupName}</h4>}
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
            <tr key={team.name} className={index < 2 ? 'qualified' : ''}>
              <td className="position">{index + 1}</td>
              <td className="team-name">{team.name}</td>
              <td className="stat">{team.played}</td>
              <td className="stat">{team.wins}</td>
              <td className="stat">{team.draws}</td>
              <td className="stat">{team.losses}</td>
              <td className="stat">{team.goalsFor}</td>
              <td className="stat">{team.goalsAgainst}</td>
              <td className="stat">{team.goalDifference}</td>
              <td className="stat points">{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="legend">
        <span className="qualified-badge">Qualificados</span>
      </div>
    </div>
  );
}
