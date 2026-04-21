import React from 'react';

export const StandingsRow = ({ team, position, isQualified }) => {
  return (
    <tr className={isQualified ? 'qualified' : ''}>
      <td className="position">{position}</td>
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
  );
};