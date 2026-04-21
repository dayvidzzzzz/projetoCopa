import React from 'react';

export const GroupMatches = ({ matches, title = 'Partidas' }) => {
  if (!matches || matches.length === 0) {
    return (
      <div className="group-matches">
        <p>Nenhuma partida para exibir</p>
      </div>
    );
  }

  const matchesByGroup = matches.reduce((acc, match) => {
    if (!acc[match.group]) acc[match.group] = [];
    acc[match.group].push(match);
    return acc;
  }, {});

  return (
    <div className="group-matches">
      <h3>{title}</h3>
      {Object.entries(matchesByGroup).map(([group, groupMatches]) => (
        <div key={group} className="group-matches-section">
          <h4 className="group-matches-title">Grupo {group}</h4>
          <div className="matches-list">
            {groupMatches.map((match, index) => (
              <MatchCard key={`${group}-${index}`} match={match} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const MatchCard = ({ match }) => {
  const isCompleted = match.score1 !== null && match.score2 !== null;
  
  return (
    <div className={`match-card ${isCompleted ? 'completed' : 'pending'}`}>
      <div className="match-content">
        <div className="team team1">
          <span className="team-name">{match.team1}</span>
        </div>

        <div className="match-result">
          {isCompleted ? (
            <>
              <span className="score">{match.score1}</span>
              <span className="vs">x</span>
              <span className="score">{match.score2}</span>
            </>
          ) : (
            <span className="pending">vs</span>
          )}
        </div>

        <div className="team team2">
          <span className="team-name">{match.team2}</span>
        </div>
      </div>

      {match.extraTime && (
        <div className="extra-info">
          Prorrogação: {match.extraTime.score1}x{match.extraTime.score2}
        </div>
      )}

      {match.penalties && (
        <div className="extra-info">
          Pênaltis: {match.penalties.team1}x{match.penalties.team2}
        </div>
      )}

      {match.winner && (
        <div className="match-winner">
          Vencedor: {match.winner}
        </div>
      )}
    </div>
  );
};