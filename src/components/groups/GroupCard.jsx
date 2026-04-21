import React from 'react';

export const GroupCard = ({ groupName, teams }) => {
  return (
    <div className="group-card">
      <h3>Grupo {groupName}</h3>
      <ul className="teams-list">
        {teams.map((team, index) => (
          <li key={`${groupName}-${team}-${index}`} className="team-item">
            {team}
          </li>
        ))}
      </ul>
    </div>
  );
};
