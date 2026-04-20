import React from 'react';

export function GroupsDisplay({ groups }) {
  if (!groups || Object.keys(groups).length === 0) {
    return <div className="groups-display">Carregando grupos...</div>;
  }

  return (
    <div className="groups-display">
      <h2>Grupos da Copa</h2>
      <div className="groups-grid">
        {Object.entries(groups).map(([groupName, teams]) => (
          <div key={groupName} className="group-card">
            <h3>Grupo {groupName}</h3>
            <ul className="teams-list">
              {teams.map(team => (
                <li key={team} className="team-item">
                  {team}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
