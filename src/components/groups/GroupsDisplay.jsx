import React from 'react';
import { GroupCard } from './GroupCard';

export const GroupsDisplay = ({ groups }) => {
  if (!groups || Object.keys(groups).length === 0) {
    return (
      <div className="groups-display">
        <p>Nenhum grupo formado</p>
      </div>
    );
  }

  return (
    <div className="groups-display">
      <h2>Grupos da Copa</h2>
      <div className="groups-grid">
        {Object.entries(groups).map(([groupName, teams]) => (
          <GroupCard key={groupName} groupName={groupName} teams={teams} />
        ))}
      </div>
    </div>
  );
};